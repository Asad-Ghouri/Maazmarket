import React, { useState } from "react";
import {
  useContract,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  Link, Card, CardHeader, CardBody, CardFooter, Divider, Container, Spinner
} from '@chakra-ui/react'
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Theme.module.css";
import Image from "next/image";
import { MediaRenderer } from "@thirdweb-dev/react";
// import { besideNavbar } from "../components/besideNavbar";
// import { besideNavbar } from "../components/besideNavbar"
// import besideNavbar from "../components/besideNavbar";

export default function Listings() {
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const { data: listings, isLoading } = useActiveListings(marketplace);

  // Load contract metadata
  const { data: contractMetadata, isLoading: loadingMetadata } =
    useContractMetadata(marketplace);

  const [filter, setFilter] = useState(0); // 0 = direct, auction = 1

  return (
    <>
     <div className="bg-coal-dark border-2 border-coal-light rounded-xl bsbs">
    <ul className="bg-coal-light bg-opacity-25 rounded-xl divide-y divide-coal-light">
      <li className="p-1">
        <Link to="" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition bg-coal-light bg-opacity-75 text-xenos">
          <span className="font-hand text-xl">
            All Listings
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-6-8">
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-8-9">
            </use>
          </svg>
        </Link>
      </li>
      <li className="p-1">
        <Link href="" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light">
          <span className="font-hand text-xl">
            NFTs
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-11-13" style={{display: 'none'}}>
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-13-14">
            </use>
          </svg>
        </Link>
      </li>
      <li className="p-1">
        <Link href="" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light">
          <span className="font-hand text-xl">
            Whitelists
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-16-18" style={{display: 'none'}}>
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-18-19">
            </use>
          </svg>
        </Link>
      </li>
      <li className="p-1">
        <a href="/market?category=eK1ydlN305490nv8" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light">
          <span className="font-hand text-xl">
            Clothing and Apparel
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-21-23" style={{display: 'none'}}>
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-23-24">
            </use>
          </svg>
        </a>
      </li>
      <li className="p-1">
        <Link href="" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light">
          <span className="font-hand text-xl">
            Custom Items
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-26-28" style={{display: 'none'}}>
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-28-29">
            </use>
          </svg>
        </Link>
      </li>
      <li className="p-1">
        <Link to="" className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light">
          <span className="font-hand text-xl">
            Experiences
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons snipcss0-6-31-33" style={{display: 'none'}}>
            <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right" className="snipcss0-7-33-34">
            </use>
          </svg>
        </Link>
      </li>
    </ul>
  </div>

  <div className="nftleft">
      <Container centerContent>
        <div className={styles.collectionContainer}>
          <div className={styles.detailPageContainer}>
            {!loadingMetadata ? (
              <>
                <img className="iimg" src="https://ik.imagekit.io/alienfrens/app-assets/background-market.jpg" alt="" />
                {/* <h1>{contractMetadata?.name}</h1>
              <p>{contractMetadata?.description}</p> */}
              </>
            ) : (
              <div className={styles.loading}>
                <Spinner size='md' />
              </div>
            )}
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
          </div>

          {!isLoading ? (
            <div className={styles.nftBoxGrid}>
              {listings
                ?.filter((listing) => listing.type === filter)
                ?.map((listing) => (
                  <Link
                    className={styles.nftBox}
                    key={listing.id.toString()}
                    href={`/listing/${listing.id}`}
                  >
                    <Card maxW='sm' overflow='hidden'>
                      {/* <ThirdwebNftMedia
                        metadata={{ ...listing.asset.image }}
                        className={styles.nftMedia}
                      /> */}
                      <MediaRenderer
                        src={ listing.asset.image}
                        style={{
                          objectFit: "cover",
                        }}
                        className={
                          "h-[244px] rounded-lg transition duration-300 ease-in-out hover:scale-105"
                        }
                      />

                      <CardBody style={{ padding: '15px' }}>
                        <h4>{listing.asset.name}</h4>
                      </CardBody>
                      <Divider />
                      <CardFooter style={{ padding: '10px' }}>
                        <p>
                          {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                          {listing.buyoutCurrencyValuePerToken.symbol}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          ) : (
            <><div className={styles.loading}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' />
            </div>
            </>
          )}
        </div>
      </Container>

  </div>

    </>
  );
}
