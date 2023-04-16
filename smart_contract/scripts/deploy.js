const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log(`Transaction deployed to ${transaction.address}`);
}


const callMain = async () => {
  try {
    await main();
    process.exit(0);
  }
  catch(err) {
    console.error(err);
    process.exit(1);
  }
}

callMain();
