import { ethers } from 'ethers';

import pokemonAPI from './pokemonAPI.js';

export async function getNonce() {
    try {
        console.log('fetch nonce')
        const response = await pokemonAPI.get('/auth/nonce');
        if (response.data && response.data.nonce) {
            return response.data;
        }
        
        throw new Error("Smth went wrong")

    } catch (error) {
        console.error('Error fetching nonce:', error);
        return null
    }
}

export async function connectMetaMask(nonce) {
    if (window.ethereum && nonce) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const signature = await signer.signMessage(nonce);

        const response = await pokemonAPI.post(
          '/auth/login',
          { address: userAddress, signature, nonce }
        )

        return {
            token: response.data.token,
            userAddress
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);

        return {}
      }
    } else {
        if (!window.ethereum) {
            console.error('MetaMask not detected');
        }

        if (!nonce) {
            console.error('Nonce not available');
        }

      return {}
    }
  };