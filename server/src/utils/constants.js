import dotenv from "dotenv"
dotenv.config()

import transaction from "./Transaction.js"

export const contractABI = transaction.abi;
export const contractAddress = "";      // Get this after deploying to blockchain

export const eth_node_url = "https://eth-goerli.g.alchemy.com/v2/IRN0TkrfMlMQYlKb3VcEReGvsPF89x1K"

export const signer = "";