import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const ALCHEMY_API_KEY = publicRuntimeConfig.alchemyKey;
export const ETHERSCAN_API_KEY = publicRuntimeConfig.etherscanKey;

export const NETWORK = 'mainnet';

export const DEFAULT_ARGS = {
  ERC20: {
    //USDT
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    func: 'balanceOf',
    args: ['0xf89d7b9c864f589bbf53a82105107622b35eaa40'],
  },
  ERC721: {
    //BAYC
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    func: 'balanceOf',
    args: ['0x54BE3a794282C030b15E43aE2bB182E14c409C5e'],
  },
};
