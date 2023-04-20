export const shortenAddress = (address: string, length = 4): string => {
  return `${address.slice(0, length + 2)}…${address.slice(
    address.length - length,
  )}`;
};

enum ChainId {
  MAINNET = 1,
}

export const CHAIN_ID_NAMES: { [key: number]: string } = {
  1: 'Mainnet',
};

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
};

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function truncateString(string: string, length = 50) {
  return string.length > length ? string.slice(0, length - 1) + '...' : string;
}
