import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { mainnet, Chain } from 'viem/chains'
 
export const getPublicClient = async (chain : Chain) => {
  return createPublicClient({
    chain: chain,
    transport: http(),
  })
}
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})
 
// eg: Metamask
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
})