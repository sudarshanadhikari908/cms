import { ethers } from 'ethers';

class MetaMask {
  static isConnected = () => {
    try {
      new ethers.providers.Web3Provider(window.ethereum);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default MetaMask;
