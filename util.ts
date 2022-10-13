import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

export const END_GAME_WL_MINT_START_AT =
  process.env.NEXT_PUBLIC_END_GAME_WL_MINT_START_AT;
export const END_GAME_WL_MINT_EXPIRE_PERIOD =
  process.env.NEXT_PUBLIC_END_GAME_WL_MINT_EXPIRE_PERIOD;
export const END_GAME_PUBLIC_MINT_EXPIRE_PERIOD =
  process.env.NEXT_PUBLIC_END_GAME_PUBLIC_MINT_EXPIRE_PERIOD;

export const wlMintEpxreDate = new Date(END_GAME_WL_MINT_START_AT);
wlMintEpxreDate.setHours(
  wlMintEpxreDate.getHours() + parseInt(END_GAME_WL_MINT_EXPIRE_PERIOD)
);

const isTESTing = process.env.NEXT_PUBLIC_TESTING_CONTRACT === "true";

export const isConnectedCorrectNetwork = (chianId) =>
  isTESTing ? chianId === 5 : chianId === 1;

export const getCorrectNetwork = () =>
  isTESTing ? "Goerli testnet" : "Mainnet";
