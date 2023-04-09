const hre = require("hardhat");

async function main() {
    const Upload = await hre.ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    await upload.deployed();
    console.log("Contract deployed to:", upload.address);
}

(async () => {
    try {
        await main();
    } catch (error) {
        console.log(error);
    }
})();
