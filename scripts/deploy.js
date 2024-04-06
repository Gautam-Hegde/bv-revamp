const { ethers } = require("hardhat"); 

async function main() { 
  const contract = await ethers.getContractFactory("Bleach"); 
  const deployedContract = await contract.deploy(); 
  await deployedContract.deployed(); 
  console.log("Address:", deployedContract.address); 
} 

main() 
  .then(() => process.exit(0)) 
  .catch((error) => { 
    console.error(error); 
    process.exit(1); 
  });