import Web3 from "Web3";
import dotenv from "dotenv";
import transaction from "./Transaction.js";

// Load env variables to path
dotenv.config();


const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETH_NODE_URL = process.env.ETH_NODE_URL;
const SENDER_WALLET_PRIVATE_KEY = process.env.SENDER_WALLET_PRIVATE_KEY
const CONTRACT_ABI = transaction.abi;

// Retrieving contract and the provider
const getContract = () => {
    const web3Provider = new Web3(ETH_NODE_URL);
    const account = web3Provider.eth.accounts.privateKeyToAccount(SENDER_WALLET_PRIVATE_KEY);
    

    // import wallet in the provider
    web3Provider.eth.accounts.wallet.add(account);

    const contract = new web3Provider.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    return [web3Provider, contract];
}


// Retrieving all the transactions from the contract
export const getAllTransactions = async () => {
    const [ web3Provider, contract ] = getContract();
    const res = await contract.methods.getAllTransaction().call();
    // console.log(res);
    return res;
}


// Saving the data in the blockchain contract
export const savePostInBlockchain = async (username, desc, pic) => {
    const [ web3Provider, contract ] = getContract();
    
    try {
        const ret = await contract.methods.addToBlockchain(username, desc, pic).send({
            from: (web3Provider.eth.accounts.privateKeyToAccount(SENDER_WALLET_PRIVATE_KEY)).address,
            gas: 200000,
        });
        console.log("Added post to blockchain");
    }
    catch(error) {
        console.log(`Error while saving post: ${username} ${desc} ${pic}`);
        console.log(error);
    }
}