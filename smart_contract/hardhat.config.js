require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/P0L2B78eUnNReqNpjF1WG9Kjewm9ffOr",
      accounts: [
        "7fe80f4a0a82bc3e96078624e20d85c23691ea4b73164dd2b89db1b2aecb3d9e",
      ],
    },
  },
};
