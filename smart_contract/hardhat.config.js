// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };

// https://eth-goerli.g.alchemy.com/v2/IRN0TkrfMlMQYlKb3VcEReGvsPF89x1K

require("@nomiclabs/hardhat-waffle")
require("dotenv").config()

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.NETWORK_URL,
      accounts: [ process.env.PRIVATE_KEY ]
    }
  }
}