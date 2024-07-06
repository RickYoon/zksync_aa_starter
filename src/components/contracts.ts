import { erc20ABI } from "wagmi";

export const daiContractConfig = {
  address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // zkSync Era Sepolia Testnet DAI token address
  abi: erc20ABI,
} as const;
