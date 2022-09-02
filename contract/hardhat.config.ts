import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const ALCHEMY_API_KEY_URL: string = process.env.ALCHEMY_API_KEY_URL!;
const METAMASK_PRIVATE_KEY: string = process.env.METAMASK_PRIVATE_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:  ALCHEMY_API_KEY_URL,
      accounts: [METAMASK_PRIVATE_KEY]
    }
  }
};

export default config;
