const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting ABC Protocol deployment...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString(), "\n");

  // For testnet, use mock USDC/USDT addresses
  // Replace these with real addresses on mainnet
  const MOCK_USDC = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"; // Sepolia USDC (example)
  const MOCK_USDT = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"; // Sepolia USDT (example)

  // Step 1: Deploy ABCToken
  console.log("📝 Deploying ABCToken...");
  const ABCToken = await hre.ethers.getContractFactory("ABCToken");
  const abcToken = await ABCToken.deploy(deployer.address);
  await abcToken.waitForDeployment();
  const abcTokenAddress = await abcToken.getAddress();
  console.log("✅ ABCToken deployed to:", abcTokenAddress);
  console.log("   Total Supply:", hre.ethers.formatEther(await abcToken.totalSupply()), "ABC\n");

  // Step 2: Deploy ABCTreasury
  console.log("📝 Deploying ABCTreasury...");
  const ABCTreasury = await hre.ethers.getContractFactory("ABCTreasury");
  const treasury = await ABCTreasury.deploy(
    abcTokenAddress,
    MOCK_USDC,
    MOCK_USDT,
    deployer.address
  );
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("✅ ABCTreasury deployed to:", treasuryAddress, "\n");

  // Step 3: Deploy BountyProposal
  console.log("📝 Deploying BountyProposal...");
  const BountyProposal = await hre.ethers.getContractFactory("BountyProposal");
  const bountyProposal = await BountyProposal.deploy(
    abcTokenAddress,
    deployer.address
  );
  await bountyProposal.waitForDeployment();
  const bountyProposalAddress = await bountyProposal.getAddress();
  console.log("✅ BountyProposal deployed to:", bountyProposalAddress, "\n");

  // Step 4: Deploy VerificationPool
  console.log("📝 Deploying VerificationPool...");
  const VerificationPool = await hre.ethers.getContractFactory("VerificationPool");
  const verificationPool = await VerificationPool.deploy(
    abcTokenAddress,
    treasuryAddress,
    bountyProposalAddress,
    deployer.address
  );
  await verificationPool.waitForDeployment();
  const verificationPoolAddress = await verificationPool.getAddress();
  console.log("✅ VerificationPool deployed to:", verificationPoolAddress, "\n");

  // Step 5: Configure contract relationships
  console.log("🔗 Configuring contract relationships...");

  // Set treasury contract in BountyProposal
  await bountyProposal.setTreasuryContract(treasuryAddress);
  console.log("✅ Set treasury contract in BountyProposal");

  // Set authorized contracts in Treasury
  await treasury.setBountyProposalContract(bountyProposalAddress);
  console.log("✅ Set bounty proposal contract in Treasury");

  await treasury.setVerificationPoolContract(verificationPoolAddress);
  console.log("✅ Set verification pool contract in Treasury\n");

  // Step 6: Optional - Transfer initial ABC to treasury for testing
  console.log("💰 Transferring ABC to treasury for testing...");
  const initialTreasuryAmount = hre.ethers.parseEther("30000000"); // 30M ABC
  await abcToken.transfer(treasuryAddress, initialTreasuryAmount);
  console.log("✅ Transferred", hre.ethers.formatEther(initialTreasuryAmount), "ABC to treasury\n");

  // Step 7: Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      ABCToken: abcTokenAddress,
      ABCTreasury: treasuryAddress,
      BountyProposal: bountyProposalAddress,
      VerificationPool: verificationPoolAddress,
    },
    mockAddresses: {
      USDC: MOCK_USDC,
      USDT: MOCK_USDT,
    },
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const filename = `${hre.network.name}-${Date.now()}.json`;
  const filepath = path.join(deploymentsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

  console.log("💾 Deployment info saved to:", filepath);

  // Also save to latest.json for easy access
  const latestPath = path.join(deploymentsDir, `${hre.network.name}-latest.json`);
  fs.writeFileSync(latestPath, JSON.stringify(deploymentInfo, null, 2));

  // Step 8: Export contract addresses for dashboard
  const dashboardEnv = `
# ABC Protocol Contract Addresses - ${hre.network.name}
# Generated: ${new Date().toISOString()}

REACT_APP_ABC_TOKEN_ADDRESS=${abcTokenAddress}
REACT_APP_ABC_TREASURY_ADDRESS=${treasuryAddress}
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=${bountyProposalAddress}
REACT_APP_VERIFICATION_POOL_ADDRESS=${verificationPoolAddress}
`;

  const envPath = path.join(__dirname, "../../.env.contracts");
  fs.writeFileSync(envPath, dashboardEnv);

  console.log("📄 Contract addresses exported to .env.contracts\n");

  // Step 9: Summary
  console.log("=" .repeat(70));
  console.log("🎉 ABC Protocol Deployment Complete!");
  console.log("=" .repeat(70));
  console.log("\n📋 Contract Summary:\n");
  console.log("  ABCToken:          ", abcTokenAddress);
  console.log("  ABCTreasury:       ", treasuryAddress);
  console.log("  BountyProposal:    ", bountyProposalAddress);
  console.log("  VerificationPool:  ", verificationPoolAddress);
  console.log("\n🔗 Next Steps:\n");
  console.log("  1. Verify contracts on Etherscan:");
  console.log("     npx hardhat verify --network", hre.network.name, abcTokenAddress, deployer.address);
  console.log("  2. Copy contract addresses to dashboard .env file");
  console.log("  3. Test contracts with Hardhat tests");
  console.log("  4. Update Dune Analytics with contract addresses\n");
  console.log("=" .repeat(70));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
