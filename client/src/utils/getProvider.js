import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getProvider = () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                if (provider) {
                    await provider.send("eth_requestAccounts");
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    const contract = new ethers.Contract(
                        contractAddress,
                        Upload.abi,
                        signer
                    );
                    resolve({ provider, signer, address, contract });
                }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
