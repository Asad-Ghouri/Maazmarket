import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from 'next/link'
// import BackIcon from "../public/icons/BackIcon.png"
import Image from 'next/image'

// import { useContract } from '@thirdweb-dev/react'

const nftDropContractAddress = "0x9140C6d812491b1a0f0B32E5013AF2078b26ca13";
// const tokenContractAddress = "0xb1cF059e6847e4270920a02e969CA2E016AeA22B";
const stakingContractAddress = "0x0ab50D0888bca94dBA7F59A4fd981943984E1823";
const marketplaceContractAddress = "0x6aa2Fa46A54990749D92b1aF5b9A85B225DcC196";
const token_address = "0x8C1Fc0162555ac29864A0E6f695582e63ABCd39e";






const Stake: NextPage = () => {
  // Wallet Connection Hooks
  // const privateKey = "a9989eac22d991004ab35dee67aa78e68070accf4fcdea46a6aefa69adff8f8e";
  // const signer = ethers.Wallet.createRandom();
  // const sdk = ThirdwebSDK.fromSigner(signer, "mainnet");
  // const sdk = useSDK();
  // const sdk = ThirdwebSDK.fromPrivateKey("SecretPrivateKey", "mainnet");
  // const sdk = new ThirdwebSDK("polygon");
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const { contract: marketcontract } = useContract("0x6aa2Fa46A54990749D92b1aF5b9A85B225DcC196", "marketplace");

  // Contract Hooks
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  // const { contract: tokenContract } = useContract(
  //   tokenContractAddress,
  //   "token"
  // );

  const { contract, isLoading } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  // Load Balance of Token
  // const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  ///////////////////////////////////////////////////////////////////////////
  // Custom contract functions
  ///////////////////////////////////////////////////////////////////////////
  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  // const [currentbal, setcurrentbal] = useState<string>();


     async function getprice(id : string){
      const listings = await marketcontract.getActiveListings();
      console.log("value is :" +listings[id].buyoutPrice)
      return listings[id].buyoutPrice;
     }



  useEffect(() => {
    var autoas = document.getElementById("autom");
    if (autoas) {
      autoas.click();
      console.log("function is calling")
    }
    else {
      console.log("function is not calling")
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  // Write Functions
  ///////////////////////////////////////////////////////////////////////////
  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    // If not approved, request approval
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    const stake = await contract?.call("stake", id);
  }

  async function listitem(id: string) {

    const gp = getprice(id);
    console.log("getvprice is " + gp);
    if(gp){

      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        marketplaceContractAddress
      );
      // If not approved, request approval
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(marketplaceContractAddress, true);
      }
      // const stake = await contract?.call("stake", id);
      const listing = {
        // address of the NFT contract the asset you want to list is on
        assetContractAddress: nftDropContractAddress,
        // token ID of the asset you want to list
        tokenId: 2,
        // when should the listing open up for offers
        startTimestamp: new Date(),
        // how long the listing will be open for
        listingDurationInSeconds: 886400,
        // how many of the asset you want to list
        quantity: 1,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: token_address,
        // how much the asset will be sold for
        buyoutPricePerToken: "100",
      }
      const tx = await marketcontract.direct.createListing(listing);
      const receipt = tx.receipt; // the transaction receipt
      const listingId = tx.id; // the id of the newly created listing
    }
    else{
      console.log("gp is null")
    }
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Link href="/">
        <div className="d-flex">
          {/* <img src={`/icons/BackIcon.png`} alt="" /> */}
          {/* <Image src={BackIcon} className="asad" width={50} height={50} /> */}

          {/* <i className="fa fa-arrow-left" aria-hidden="true"></i> */}
          {/* <i className="fa fa-arrow-left"></i> */}

          <h3>Go To Dashboard</h3>
        </div>
      </Link>
      <div className={styles.container}>
        <h1 className={styles.st}>Stake Your NFTs</h1>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        {!address ? (
          <button className={styles.mainButton} id="autom" onClick={connectWithMetamask}>
            Connect Wallet
          </button>
        ) : (
          <>
            <h2>Your Tokens</h2>

            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Contract Address</h3>
                <p className={styles.tokenValue}>
                  <b>
                    0x----------
                  </b>
                  {/* <b>{currentbal}</b> */}
                  {/* <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol} */}
                </p>
              </div>
            </div>


            <hr className={`${styles.divider} ${styles.spacerTop}`} />


            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <h2>Your Unstaked NFTs</h2>

            <div className={styles.nftBoxGrid1}>
            <div className={styles.nftBoxGrid}>
              {ownedNfts?.map((nft) => (
                
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>
                  <button
                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                    onClick={() => listitem(nft.metadata.id)}
                  >
                    List
                  </button>
                </div>
              ))}
            </div>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default Stake;