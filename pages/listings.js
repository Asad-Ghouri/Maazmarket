import React, { useState } from "react";
import {
  useContract,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Theme.module.css";
import Image from "next/image";
import { MediaRenderer } from "@thirdweb-dev/react";
// import { besideNavbar } from "../components/besideNavbar";
// import { besideNavbar } from "../components/besideNavbar"
// import besideNavbar from "../components/besideNavbar";
import RefreshbImg from "../public/icons/Refreshicon.png";

// import Foo from "../components/DropDown";

import { Select } from "@chakra-ui/react";

export default function Listings() {
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const { data: listings, isLoading } = useActiveListings(marketplace);

  // Load contract metadata
  const { data: contractMetadata, isLoading: loadingMetadata } =
    useContractMetadata(marketplace);

  const [filter, setFilter] = useState(0); // 0 = direct, auction = 1
  const [inputValue, setInputValue] = useState("");
  const [changeColor, setchangeColor] = useState(1);
  const [radiochangeColor, setradiochangeColor] = useState(true);
  const [closeBtn, setcloseBtn] = useState(true);

  const [closeBtn1, setcloseBtn1] = useState(true);

  return (
    <>
      {/* <div className="bg-coal-dark border-2 border-coal-light rounded-xl bsbs">
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
  </div> */}

      <div className="max-h-full px-3 space-y-5 overflow-y-auto bsbs">
        <div className="hidden lg:block">
          <div className="bg-coal-dark border-2 border-coal-light rounded-xl">
            <ul className="bg-coal-light bg-opacity-25 rounded-xl divide-y divide-coal-light">
              <li role="button" className="p-1">
                <a
                  onClick={() => setchangeColor(1)}
                  className={
                    changeColor != 1
                      ? "flex items-center hover:bg-opacity-25 hover:bg-coal-light justify-between py-2 px-3 rounded-md cursor-pointer transition bg-coal-light bg-opacity-75 "
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer text-xenos-500 bg-opacity-25 bg-coal-light"
                  }
                >
                  <span className="font-hand text-xl">All Listings</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
              <li className="p-1">
                <a
                  onClick={() => setchangeColor(2)}
                  className={
                    changeColor != 2
                      ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                  }
                >
                  <span className="font-hand text-xl">NFTs</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                    // style={{ display: "none" }}
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
              <li className="p-1">
                <a
                  onClick={() => setchangeColor(3)}
                  className={
                    changeColor != 3
                      ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                  }
                >
                  <span className="font-hand text-xl">Whitelists</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                    // style={{ display: "none" }}
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
              <li className="p-1">
                <a
                  onClick={() => setchangeColor(4)}
                  className={
                    changeColor != 4
                      ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                  }
                >
                  <span className="font-hand text-xl">
                    Clothing and Apparel
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                    style={{ display: "none" }}
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
              <li className="p-1">
                <a
                  onClick={() => setchangeColor(5)}
                  className={
                    changeColor != 5
                      ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                  }
                >
                  <span className="font-hand text-xl">Custom Items</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                    // style={{ display: "none" }}
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
              <li className="p-1">
                <a
                  onClick={() => setchangeColor(6)}
                  className={
                    changeColor != 6
                      ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                      : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                  }
                >
                  <span className="font-hand text-xl">Experiences</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                    style={{ display: "none" }}
                  >
                    <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl pt-pb">
            <div className="flex items-center justify-between py-3 px-4 border-b border-coal-light">
              <span className="text-sm">Listing type</span>
            </div>
            <div>
              <ul className>
                <li className="px-1">
                  <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                    <span>All types</span>
                    <input
                      // onClick={() => setradiochangeColor(false)}
                      // type="radio"
                      type="checkbox"
                      // onChange={this.handleCheck} defaultChecked={this.state.checked}
                      className="bg-coal-light fill-coal-dark transition duration-100 srg ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light sr"
                    />
                  </label>
                </li>
                <li className="px-1">
                  <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                    <span>Buy now</span>
                    <input
                      defaultValue="buy_now"
                      // type="radio"
                      type="checkbox"
                      className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                    />
                  </label>
                </li>
                <li className="px-1">
                  <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer bg-coal-light bg-opacity-75 text-white">
                    <span>Raffle</span>
                    <input
                      defaultValue="raffle"
                      // type="radio"
                      type="checkbox"
                      className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                    />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl">
            <div>
              <ul className="divide-y divide-coal-light">
                <li className="px-1">
                  <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-gray-400">
                    <span>Show out of stock</span>
                    <span
                      role="checkbox"
                      aria-checked="true"
                      tabIndex={0}
                      className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 p-1 bg-coal-light rounded-full border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50"
                    >
                      {/* <input type="hidden" /> */}
                      <span className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"></span>

                      <span
                        onClick={() => setcloseBtn1(!closeBtn1)}
                        className={
                          closeBtn1 == true
                            ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                            : "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs bg-xenos-500"
                        }
                      ></span>
                      <span
                        onClick={() => setcloseBtn1(!closeBtn1)}
                        className={
                          closeBtn1 == true
                            ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                            : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full  shadow flex items-center justify-center text-xenos-500 text-xs"
                        }
                      ></span>
                    </span>
                  </label>
                </li>
                <li className="px-1">
                  <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-white">
                    <span>Show ended sales</span>
                    <span
                      tabIndex={0}
                      className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 p-1 bg-coal-light rounded-full"
                    >
                      <input type="hidden" defaultValue="true" />
                      <span
                        aria-checked="true"
                        className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                      ></span>
                      <span
                        onClick={() => setcloseBtn(!closeBtn)}
                        className={
                          closeBtn == true
                            ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                            : "inline-block rounded-full bg-xenos-500 h-3 w-3 flex items-center justify-center text-xenos-500 text-gray-400 text-xs"
                        }
                      ></span>
                      <span
                        onClick={() => setcloseBtn(!closeBtn)}
                        className={
                          closeBtn == true
                            ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                            : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full shadow flex items-center justify-center text-xenos-500 text-xs"
                        }
                      ></span>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="nftleft">
        <Container centerContent className="nfns">
          {/* <div className="sri"> */}
          <fieldset className="field-container">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="field"
            />
            <div className="icons-container">
              <div className="icon-search" />
              <div className="icon-close">
                <div className="x-up" />
                <div className="x-down" />
              </div>
            </div>
          </fieldset>
          {/* <Image src={RefreshbImg} /> */}
          {/* </div> */}

          <div className={styles.collectionContainer}>
            <div className={styles.detailPageContainer}>
              {!loadingMetadata ? (
                <>
                  <img
                    className="iimg"
                    src="https://ik.imagekit.io/alienfrens/app-assets/background-market.jpg"
                    alt=""
                  />
                  <h3 className="frs">Ape Club Marketplace</h3>
                  {/* <h1>{contractMetadata?.name}</h1>
              <p>{contractMetadata?.description}</p> */}

                  <div className="ydd">
                    <Select placeholder="Enable drop mode" className="yellowdd">
                      <option value="Price Low to High">UFO stays Drop</option>
                      <option value="Price High to Low">
                        Trick or Treat Bag
                      </option>
                      <option value="Stock Low to High">
                        Frens Radio Whitelist
                      </option>
                      <option value="Stock High to Low">
                        Anniversary Restock - UFO
                      </option>
                      <option value="Sale Ends Soon">
                        Anniversary Restock - Shirt
                      </option>
                      <option value="Price Low to High">
                        Anniversary Restock - Pillows
                      </option>
                      <option value="Price High to Low">
                        Anniversary Restock - Ledger
                      </option>
                      <option value="Stock Low to High">
                        Anniversary Restock - Hat
                      </option>
                      <option value="Stock High to Low">
                        Anniversary Restock - French Cookies
                      </option>
                      <option value="Sale Ends Soon">
                        Anniversary Restock - Blockchain for Babies
                      </option>

                      <option value="Sale Ends Soon">
                        Anniversary Restock - Alien Frens Evoluation
                      </option>
                      <option value="Price Low to High">
                        Anniversary Restock - Alien Frens
                      </option>
                      <option value="Price High to Low">
                        Anniversary Restock - Air Freshener
                      </option>
                      <option value="Stock Low to High">
                        Anniversary Restock - Hat
                      </option>
                      <option value="Stock High to Low">
                        Anniversary Restock - French Cookies
                      </option>
                      <option value="Sale Ends Soon">
                        Anniversary Restock - Blockchain for Babies
                      </option>
                    </Select>
                  </div>
                </>
              ) : (
                <div className={styles.loading}>
                  <Spinner size="md" />
                </div>
              )}
              <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
            </div>

            <Select placeholder="Recently listed">
              <option value="Price Low to High">Price low to high</option>
              <option value="Price High to Low">Price high to low</option>
              <option value="Stock Low to High">Price low to high</option>
              <option value="Stock High to Low">Price high to low</option>
              <option value="Sale Ends Soon">Sale Ends Soon</option>
            </Select>

            <div className="reload">
              <Image src={RefreshbImg} width={25} height={25} />
            </div>

            {!isLoading ? (
              <div className={styles.nftBoxGrid}>
                {listings
                  ?.filter((listing) => listing.type === filter)
                  ?.map((listing) =>
                    inputValue == null || inputValue == "" ? (
                      <Link
                        className={styles.nftBox}
                        key={listing.id.toString()}
                        href={`/listing/${listing.id}`}
                      >
                        <Card maxW="sm" overflow="hidden">
                          {/* <ThirdwebNftMedia
                        metadata={{ ...listing.asset.image }}
                        className={styles.nftMedia}
                      /> */}
                          <MediaRenderer
                            src={listing.asset.image}
                            style={{
                              objectFit: "cover",
                            }}
                            className={
                              "h-[244px] rounded-lg transition duration-300 ease-in-out hover:scale-105"
                            }
                          />

                          <CardBody style={{ padding: "15px" }}>
                            <h4>{listing.asset.name}</h4>
                            <h4>Render Count: {inputValue}</h4>
                          </CardBody>
                          <Divider />
                          <CardFooter style={{ padding: "10px" }}>
                            <p>
                              {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                              {listing.buyoutCurrencyValuePerToken.symbol}
                            </p>
                          </CardFooter>
                        </Card>
                      </Link>
                    ) : inputValue == listing.asset.name ? (
                      <Link
                        className={
                          styles.nftBox +
                          (inputValue == listing.asset.name ? "active" : "")
                        }
                        key={listing.id.toString()}
                        href={`/listing/${listing.id}`}
                      >
                        <Card maxW="sm" overflow="hidden">
                          {/* <ThirdwebNftMedia
                                          metadata={{ ...listing.asset.image }}
                                          className={styles.nftMedia}
                                        /> */}
                          <MediaRenderer
                            src={listing.asset.image}
                            style={{
                              objectFit: "cover",
                            }}
                            className={
                              "h-[244px] rounded-lg transition duration-300 ease-in-out hover:scale-105"
                            }
                          />

                          <CardBody style={{ padding: "15px" }}>
                            <h4>{listing.asset.name}</h4>
                            {/* <h4>Render Count: {inputValue}</h4> */}
                          </CardBody>
                          <Divider />
                          <CardFooter style={{ padding: "10px" }}>
                            <p>
                              {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                              {listing.buyoutCurrencyValuePerToken.symbol}
                            </p>
                          </CardFooter>
                        </Card>
                      </Link>
                    ) : (
                      <>
                        {/* <Card className={(inputValue == listing.asset.name ? 'active' : '')}>


                        </Card> */}
                        <h4 style={{ display: "none" }}></h4>
                      </>
                    )
                  )}
              </div>
            ) : (
              <>
                <div className={styles.loading}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
