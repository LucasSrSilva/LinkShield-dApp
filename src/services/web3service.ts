import Web3 from "web3";
import ABI from './ABI.json'
import { Link } from "@/app/[linkId]/page";

declare global {
    interface Window {
        ethereum?: any;
    }
}
const CONTRACT_ADDRESS = '0x2aB405c8F7a54f2C684cFA6e467517662891a9B1'
export async function connectContract() {
    if(!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
    }
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
}
export async function addLink({ url, linkId, feeInWei }: { url: string; linkId: string; feeInWei: string | number }) {
    const contract = await connectContract();
    await contract.methods.addLink(url, linkId, feeInWei).send();
}
export async function getLink(linkId: string): Promise<Link> {
    const contract = await connectContract();
    return await contract.methods.getLink(linkId).call();
}
export async function payLink(linkId: string, valueInWei: string): Promise<Link> {
    const contract = await connectContract();
    return await contract.methods.buyAccess(linkId).call({
        value: valueInWei
    });
}