import { getDefaultConfig } from '@rainbow-me/rainbowkit';


import { sepolia, goerli, karura } from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains: [sepolia, goerli, karura],
  ssr: true
});