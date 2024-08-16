import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import styles from './MetaMaskConnect.module.css';

import api from '../lib/api.js';

const MetaMaskConnect = ({ onConnect }) => {
  const [address, setAddress] = useState('');
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    const fetchNonce = async () => {
      try {
        console.log('fetch nonce')
        const response = await api.get('http://localhost:3000/api/auth/nonce');
        setNonce(response.data.nonce);
      } catch (error) {
        console.error('Error fetching nonce:', error);
      }
    };

    fetchNonce();
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const signature = await signer.signMessage(nonce);

        const response = await api.post(
          'http://localhost:3000/api/auth/login',
          { address: userAddress, signature, nonce }
        )

        console.log('before onConnect')
        onConnect(response.data.token);
        setAddress(userAddress);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not detected or nonce not available');
    }
  };

  return (
    <div>
      <button className={styles.connectWallet}  onClick={connectMetaMask}>Connect MetaMask</button>
      {address && <p>Connected as: {address}</p>}
    </div>
  );
};

export default MetaMaskConnect;
