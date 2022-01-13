const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("To:", waveContract.address);
  console.log("From:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let wave = await waveContract.wave();
  await wave.wait();

  waveCount = await waveContract.getTotalWaves();

  wave = await waveContract.connect(randomPerson).wave();
  await wave.wait();

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
