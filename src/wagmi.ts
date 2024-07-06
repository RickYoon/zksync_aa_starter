import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  zkSync,
  zkSyncSepoliaTestnet,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'zkSync Test',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    zkSync,
    zkSyncSepoliaTestnet
  ],
  ssr: true,
});