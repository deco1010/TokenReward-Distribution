import React, { useState } from 'react';

import ETHtoONE from './ETHtoONE';
import ONEtoETH from './ONEtoETH';

function TransferTokens({ sendTokensToOne, sendTokensToEth }) {
  const [ethaddress, setEthAddress] = useState('');
  const [oneaddress, setOneAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [onewalletLoading, setOnewalletLoading] = useState(false);

  const getEthWalletAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setEthAddress(accounts[0]);
  }

  const getOneWalletAddress = () => {
    try{
      setOnewalletLoading(true);
      setTimeout(() => {
        window.onewallet
          .getAccount()
          .then(({ address }) => setOneAddress(address));
          
        setOnewalletLoading(false);
      }, 3000)
    }
    catch(e){
      console.error(e);
      setOnewalletLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 m-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Transfer Tokens</h2>

              <ETHtoONE
                ethaddress={ethaddress}
                getEthWalletAddress={getEthWalletAddress}
                oneaddress={oneaddress}
                getOneWalletAddress={getOneWalletAddress}
                onewalletLoading={onewalletLoading}
                amount={amount}
                setAmount={setAmount}
                sendTokensToOne={sendTokensToOne} />

              <ONEtoETH
                ethaddress={ethaddress}
                getEthWalletAddress={getEthWalletAddress}
                oneaddress={oneaddress}
                getOneWalletAddress={getOneWalletAddress}
                onewalletLoading={onewalletLoading}
                amount={amount}
                setAmount={setAmount}
                sendTokensToEth={sendTokensToEth} />
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default TransferTokens;
