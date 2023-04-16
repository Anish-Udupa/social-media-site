import Web3 from "Web3";
import transaction from "./Transaction.js";

// const provider = "https://eth-goerli.g.alchemy.com/v2/IRN0TkrfMlMQYlKb3VcEReGvsPF89x1K"
// const contractABI = transaction.abi;
// const contractAddress = "";      // Get this after deploying to blockchain

const node_endpoint = 'https://mainnet.infura.io/YOUR_INFURA_API_KEY'

// OMG Token Contract
const contractAddress = '0xd03696B53924972b9903eB17Ac5033928Be7D3Bc'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

const walletAddress = ""
const walletPrivateKey = ""

const getContract = () => {
    const web3Provider = new Web3(node_endpoint);

    // import wallet in the provider
    web3Provider.eth.accounts.wallet.add(WALLET_KEY);

    const contract = new web3Provider.eth.Contract(contractABI, contractAddress);
    return Web3Provider, contract;
}

// Function to store post on the blockchain
export const sendTransactionToBlockchain = async () => {
    try {
        const [ Web3Provider, contract ] = getContract();
        
        recipientAddress = ""
        amount = '1000000'

        // 1 create smart contract transaction
        const trx = contract.methods.transfer(recipientAddress, amount);

        // 2 calculate gas fee
        const gas = await trx.estimateGas();
        
        // 3 calculate gas price
        const gasPrice = await web3Provider.eth.getGasPrice();
        
        // 4 encode transaction data
        const data = trx.encodeABI();
        
        // 5 get transaction number for wallet
        const nonce = await provider.eth.getTransactionCount(walletAddress);

        // 6 build transaction object with all the data
        const trxData = {
            // trx is sent from the wallet
            from: WALLET_ADDRESS,
            // trx destination is the ERC20 token contract
            to: ORIGIN_TOKEN_CONTRACT_ADDRESS,
            /** data contains the amount an recepient address params for transfer contract method */
            data,
            gas,
            gasPrice,
            nonce,
        };
    
        console.log('Transaction ready to be sent');

        /** 7 send transaction, it'll be automatically signed
         because the provider has already the wallet **/
        const receipt = await provider.eth.sendTransaction(trxData);
        console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    
        return receipt.transactionHash;
    } 
    catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
}