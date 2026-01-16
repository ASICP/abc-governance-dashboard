require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        sepolia: {
            url: "https://rpc.sepolia.org", // Placeholder
            accounts: [] // Placeholder
        },
        base: {
            url: "https://mainnet.base.org", // Placeholder
            accounts: [] // Placeholder
        }
    }
};
