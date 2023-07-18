import { config } from "@onflow/fcl"
import flowJSON from "./flow.json"
import { PUBLIC_FLOW_ACCESS_NODE, PUBLIC_FLOW_DISCOVERY_WALLET, PUBLIC_FLOW_NETWORK } from "$env/static/public"
export const ssr = false;

export const setupFCL = async () => {
    return config({
        "flow.network": PUBLIC_FLOW_NETWORK,
        "accessNode.api": PUBLIC_FLOW_ACCESS_NODE,
        "discovery.wallet": PUBLIC_FLOW_DISCOVERY_WALLET,
        "app.detail.title": "NFT Loan Auction, borrow against your NFT as collateral, make offers on other loans if you fancy a chance at their collateral!",
        "app.detail.icon": "https://unavatar.io/twitter/justjoolz",
        // "0xMetadataViews": "0x631e88ae7f1d7c20", // Mainnet: "0x1d7e57aa55817448"
        // "0xNFTCatalog": "0x324c34e1c517e4db", // Mainnet: "0x49a7cda3a1eecc29"
        // "0xNFTRetrieval": "0x324c34e1c517e4db", // Mainnet: "0x49a7cda3a1eecc29"
        // "0xBasket": network === "testnet" ? "0xca909b58fecc185a" : "0xNotYetDeployed"
    }).load({ flowJSON: flowJSON })
}
