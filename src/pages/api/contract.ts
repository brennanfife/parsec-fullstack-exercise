import axios from 'axios';
import { Contract, providers, utils } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ALCHEMY_API_KEY, ETHERSCAN_API_KEY, NETWORK } from '@/constants';

const REQUIRED_PARAMS = ['address', 'func'];

async function validateContract(
  provider: providers.JsonRpcProvider,
  address: string,
) {
  const checkedAddress = utils.getAddress(address);
  const code = await provider.getCode(checkedAddress);
  if (code === '0x') {
    throw new Error('Error finding contract address');
  }
  const { data } = await axios.get(
    `https://api.etherscan.io/api?module=contract&action=getabi&address=${checkedAddress}&apikey=${ETHERSCAN_API_KEY}`,
  );

  if (data.status !== '1') {
    throw new Error('Invalid contract');
  }

  return JSON.parse(data.result);
}

async function executeFunction(
  contract: Contract,
  func: string,
  args: string[],
) {
  const { inputs } = contract.interface.getFunction(func);

  if (inputs.length === 0 && args.length > 0) {
    throw new Error('This function does not require arguments');
  }

  if (inputs.length > 0 && args.length === 0) {
    throw new Error('Arguments required for this function');
  }

  if (inputs.length !== args.length) {
    throw new Error('Invalid number of arguments');
  }

  const params = args?.map((arg) => arg.trim());

  try {
    let result;
    if (params?.length === 0) {
      result = await contract[func]();
    } else if (params) {
      result = await contract[func](...params);
    }

    return result.toString();
  } catch (error) {
    throw new Error('Invalid arguments');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }
  try {
    const provider = new providers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY);
    const { address, func, args } = req.query;

    if (!REQUIRED_PARAMS.every((param) => req.query[param])) {
      return res
        .status(400)
        .send({ message: 'Missing required address and/or function' });
    }

    const ABI = await validateContract(provider, address as string);
    const contract = new Contract(address as string, ABI, provider);

    if (!Object.keys(contract.functions).includes(func as string)) {
      return res.status(422).send({ message: 'Invalid function' });
    }

    const result = await executeFunction(
      contract,
      func as string,
      args ? (typeof args === 'string' ? args.split(',') : args) : [],
    );

    res.status(200).json({ value: result });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
}
