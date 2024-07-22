import detectEthereumProvider from '@metamask/detect-provider';
import { toast } from 'react-toastify';

const getWalletDownloadLink = () => (
  <div>
    Download{' '}
    <a
      target={'_blank'}
      href={`https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en`}
      rel="noreferrer"
    >
      {' '}
      this
    </a>{' '}
    wallet to continue.
  </div>
);

const getProvider = async () => {
  const metamaskProvider = await detectEthereumProvider({});
  let provider = await metamaskProvider;
  let hasMetamask = '';
  // This part of code is specific  for coinbase wallet as coinbase stores providers in window.ethereum.providers or else it simply comes in window.ethereum
  if (window.ethereum?.providers?.length) {
    window.ethereum?.providers.filter(async (p: any) => {
      if (p.isMetaMask === true && !p.isBitKeep && !p.isTrustWallet) {
        provider = p;
        hasMetamask = 'yes';
      }
    });
    if (!hasMetamask) {
      hasMetamask = 'no';
    }
  }
  if (hasMetamask == 'no') {
    toast.info(getWalletDownloadLink(), { autoClose: false });
    return;
  }

  // if no provider is returned, then show download link info
  if (!provider) {
    toast.info(getWalletDownloadLink(), { autoClose: false });
    return;
  }
  // if provider is given but it is not metamask, then show info message
  if (provider && !provider.isMetaMask) {
    toast.info('Metamask is not detected. Please reload if metamask is installed, else install metamask.', {
      autoClose: false,
    });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isConnected = await provider.isConnected();
  if (!isConnected) {
    toast.info('Metamask is not responding. Please reload to connect metamask.', { autoClose: false });
    return;
  }
  return provider;
};

export default getProvider;
