import useSWR from "swr";
import { ethers } from "ethers";
import NTNFT_ABI from "../contracts/NTNFT.json";
import type { NTNFT } from "../contracts/types";
import useContract from "./useContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NTNFT_ADDRESS;

export default function useNTNFTContract(tokenAddress = CONTRACT_ADDRESS) {
  return useContract<NTNFT>(tokenAddress, NTNFT_ABI);
}

export function useNTNFTTotalSupply(suspense = false) {
  const contract = useNTNFTContract();

  const shouldFetch = !!contract;

  const result = useSWR(
    shouldFetch ? ["totalSupply"] : null,
    async () => {
      const totalSupply = await contract.TOTAL_SUPPLY();

      return totalSupply.toNumber();
    },
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}

export function useNTNFTTotalMinted(suspense = false) {
  const contract = useNTNFTContract();

  const shouldFetch = !!contract;

  const result = useSWR(
    shouldFetch ? ["totalMinted"] : null,
    async () => {
      const totalMinted = await contract.totalMinted();

      return totalMinted.toNumber();
    },
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}

export function useNTNFTBalance(address: string, suspense = false) {
  const contract = useNTNFTContract();

  const shouldFetch = !!contract;

  const result = useSWR(
    shouldFetch ? [`${address} - balance`] : null,
    async () => {
      const balance = await contract.balanceOf(address);

      return balance.toNumber();
    },
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
