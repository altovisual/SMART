import { useState, useEffect } from 'react';

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [chainId, setChainId] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install it to continue.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setAccount(accounts[0]);
      setChainId(chainId);
      
      console.log('✅ Wallet connected:', accounts[0]);
      console.log('🔗 Chain ID:', chainId);
      
      // Save to localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);

      return accounts[0];
    } catch (err) {
      console.error('❌ Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    console.log('🔌 Wallet disconnected');
  };

  // Get balance
  const getBalance = async (address) => {
    if (!isMetaMaskInstalled()) return null;

    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address || account, 'latest'],
      });

      // Convert from Wei to ETH
      const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
      return ethBalance.toFixed(4);
    } catch (err) {
      console.error('❌ Error getting balance:', err);
      return null;
    }
  };

  // Switch network
  const switchNetwork = async (chainId) => {
    if (!isMetaMaskInstalled()) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      return true;
    } catch (err) {
      console.error('❌ Error switching network:', err);
      return false;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        console.log('🔄 Account changed:', accounts[0]);
      }
    };

    const handleChainChanged = (chainId) => {
      setChainId(chainId);
      console.log('🔄 Chain changed:', chainId);
      // Reload page on chain change (recommended by MetaMask)
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Auto-connect on mount if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true' && isMetaMaskInstalled()) {
      connectWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    account,
    isConnecting,
    error,
    chainId,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connectWallet,
    disconnectWallet,
    getBalance,
    switchNetwork,
  };
};

// Network configurations
export const NETWORKS = {
  ETHEREUM: {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
  },
  POLYGON: {
    chainId: '0x89',
    name: 'Polygon Mainnet',
  },
  BSC: {
    chainId: '0x38',
    name: 'Binance Smart Chain',
  },
  SEPOLIA: {
    chainId: '0xaa36a7',
    name: 'Sepolia Testnet',
  },
};

// Format address for display
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
