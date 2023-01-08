import {
  MediaRenderer,
  useContract,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContractRead,
} from "@thirdweb-dev/react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  // Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Spinner,
  Portal,
} from "@chakra-ui/react";
import { ChainId, ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import React, { useContext, useState, useRef } from "react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
import { ChainName } from "../../const/aLinks";
import styles from "../../styles/Theme.module.css";
import TwitterLogo from "../../public/icons/Img.png";
import Coin from "../../public/icons/coin.jpeg";

import Image from "next/image";

const activeChainId = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`);
const contracAddress = NFT_COLLECTION_ADDRESS;
const contractType = "ERC-721";
const networkName = ChainName();

export default function ListingPage() {
  const [copySuccess, setCopySuccess] = useState("");
  const TextRef = useRef(null);

  function copyToClipboard(e) {
    TextRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Berhasil di salin");
  }

  const router = useRouter();
  const { listingId } = router.query;
  const ref = React.useRef();

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace"
  );
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );

  if (listing?.secondsUntilEnd === 0) {
  }

  const [bidAmount, setBidAmount] = useState("");
  
  const [changeColor, setchangeColor] = useState(1);

  if (loadingListing) {
    return (
      <div className={styles.loading}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  if (!listing) {
    return <div className={styles.loading}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork &&
          switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
        return;
      }

      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[activeChainId].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      alert(
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
    } catch (err) {
      console.error(err.message || "something went wrong");
      alert(err.message || "something went wrong");
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork &&
          switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      alert("NFT bought successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  

  return (
    <>
      <img
        className="iimg iimg11"
        src="https://ik.imagekit.io/alienfrens/app-assets/background-market.jpg"
        alt=""
      />

      <Container maxW={"5xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"auto"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <MediaRenderer
                src={listing.asset.image}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                className="fetImg"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  margin: "auto",
                }}
              />
            </Box>
            <div className="links links1">
              <h2>Links</h2>
              <Image src={TwitterLogo} alt="" height={30} width={30} />
            </div>
          </Flex>
          <Stack
            flex={1}
            spacing={{ base: 5, md: 10 }}
            style={{ marginBottom: "35px" }}
          >
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                className="tg"
                // _after={{
                //   content: "''",
                //   width: 'full',
                //   height: '30%',
                //   position: 'absolute',
                //   bottom: 1,
                //   left: 0,
                //   bg: 'blue.200',
                //   zIndex: -1,
                // }}
              >
                {/* {listing.asset.name} */}
                The Golden Fren Luxury Wallet
              </Text>
              <br />
              <Text as={"span"} className="caa">
                {/* Owned by <b>{listing.sellerAddress?.slice(0, 7)}</b> */}
                CLOTHING AND APPAREL
              </Text>
            </Heading>
            <Box
              bg="white.400"
              color="white"
              textAlign="left"
              padding="10px"
              className={styles.portalW}
            >
              <Text color={"gray.500"} style={{ fontSize: 15 }}>
                <b>{listing.asset.description}</b>
              </Text>
              <br />
              <Portal containerRef={ref}></Portal>
              <Box ref={ref} className="detail-box">
                Wallet Detail:
                <Text fontSize={"sm"} style={{ marginTop: "20px" }}>
                  <b> ID token: {listing.asset.id}</b>
                  <br />
                  <br />
                  <b> Type: {contractType}</b>
                  <br />
                  <br />
                  <b> Chain: {networkName}</b>
                </Text>
                {document.queryCommandSupported("copy") && (
                  <div>
                    <Text>
                      <br />
                      <b>Contract:</b>{" "}
                      <Button
                        onClick={copyToClipboard}
                        variant={"link"}
                        colorScheme={"blue"}
                        title={"Salin"}
                      >
                        {" "}
                        {contracAddress
                          .slice(0, 3)
                          .concat("...")
                          .concat(contracAddress.slice(-4))}
                      </Button>
                    </Text>
                    {copySuccess}
                  </div>
                )}
                <form style={{ position: "fixed", bottom: "-9999px" }}>
                  <input
                    style={{ height: "0px" }}
                    ref={TextRef}
                    value="0xd928c0977ae3dbc6561e4731d388e4335c24ed5a"
                  />
                </form>
              </Box>
            </Box>

            {/* <div className="links">
            <span>
              <Image src={Coin} height={40} width={40} className="c-coin" />
            </span>
            <h2>
              <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {listing.buyoutCurrencyValuePerToken.symbol}
            </h2>
            <Button
			  width={'248px'}
              rounded={'full'}
              size={'md'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'blue'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.600' }}
              onClick={buyNft}
			  style={{fontWeight: 700, color: 'white'}}>
              Buy
            </Button>
          </div> */}

            

            {/* <Text color={'gray.500'} style={{fontSize: 25}}>
            <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {listing.buyoutCurrencyValuePerToken.symbol}
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row', }}
			style={{margin: '20px auto'}}>
            <Button
			  width={'248px'}
              rounded={'full'}
              size={'md'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'blue'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.600' }}
              onClick={buyNft}
			  style={{fontWeight: 700, color: 'white'}}>
              Buy
            </Button>
          </Stack> */}
          </Stack>
        </Stack>
      </Container>
      <div className="">
              <div className="block bg-coal-light bg-coal-light1 bg-opacity-50 rounded-2xl border-2 border-coal-light overflow-hidden ffl">
                <div className="py-6 px-6">
                  <div className="flex flex-wrap items-start -m-3">
                    <div className="flex items-start w-full lg:w-1/2">
                      <div className="flex flex-col justify-between w-1/2 p-3">
                        <div className="text-sm text-gray-300">
                          Ticket price
                        </div>
                        <div className="inline-flex items-center mt-1">
                          <Image
                            // src="https://ik.imagekit.io/alienfrens/tr:w-64,h-64,q-100/coin/fren-coin_11BlmRl48.png"
                            src={Coin}
                            width={32}

                            height={32}
                            className="mr-3"
                          />
                          <span className="inline-flex text-3xl font-semibold font-hand">
                            1.00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex flex-wrap items-center -m-3">
                        <div className="w-full xs:w-28 p-3">
                          <input
                         
                            type="number" id="quantity" name="quantity" 
                            // defaultvalue="1"
                            defaultValue={1}
                            className="text-sm flex w-full px-5 bg-coal-dark cola text-sm md:text-base text-coal-100 placeholder-coal-200 transition ease-in-out border-2 border-coal-400 rounded-xl shadow-sm focus:border-gray-400 focus:ring-3 focus:ring-gray-400 focus:outline-none focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed bg-none h-12 "
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <button className="w-full af-button  af-button--xenos">
                            Buy Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block py-5 px-5 md:px-6 bg-coal-dark border-t-2 border-coal-light">
                  <div className="flex flex-col md:flex-row justify-between md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                    <div className="inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 w-6 h-6 text-gray-300 fill-current icon sprite-icons"
                      >
                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-clock"></use>
                      </svg>
                      <span className="text-gray-300 tt">Ticket sale ends at</span>
                    </div>
                    <span className="tt1">January 8, 2023 12:00 AM (UTC)</span>
                  </div>
                </div>
              </div>
            </div>

      <div className="py-6 px-6 ssl">
        <div className="flex flex-col md:flex-row -m-3 ssl1">
          <div className="w-full md:w-1/4 p-3">
            <div className="text-sm text-gray-300">
              Tickets supply
            </div>
            <div className="mt-3 text-sm font-bold">
              unlimited 
            </div>
          </div>
          <div className="w-full md:w-1/4 p-3">
            <div className="text-sm text-gray-300">
              Raffle winners
            </div>
            <div className="mt-3 text-sm font-bold">
              20
            </div>
          </div>
          <div className="w-full md:w-1/2 p-3">
            <div className="text-sm text-gray-300">
              Raffle draw
            </div>
            <div className="mt-3 text-sm font-bold">
              after sale end  
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-coal-light rounded-2xl bg-coal-dark ttl">
        <div className="border-b-2 border-coal-light">
          <ul className="flex flex-col sm:flex-row flex-wrap -mb-2px font-hand text-lg md:text-xl text-gray-300 text-center">
            <li className="flex-1 border-t-2 sm:border-0 border-coal-light">
              <button  onClick={() => setchangeColor(1)} className={changeColor != 1? "block py-4 px-6 rounded-t-lg  transition snipcss0-4-4-5" : "block py-4 px-6 rounded-t-lg border-b-2 transition snipcss0-4-4-5 text-xenos-500 border-xenos-500"}>
                Raffle winners 
                <span className="inline-block ml-1 text-base">
                  (0)
                </span>
              </button>
            </li>
            <li className="flex-1 border-t-2 sm:border-0 border-coal-light">
              <button onClick={() => setchangeColor(2)} className={changeColor !=2? "block py-4 px-6 rounded-t-lg border-b-2 transition border-transparent hover:text-white hover:border-gray-500 snipcss0-4-7-8" : "block py-4 px-6 rounded-t-lg border-b-2 transition text-xenos-500 border-xenos-500"}>
                All entries 
                <span className="inline-block ml-1 text-base">
                  (1429)
                </span>
              </button>
            </li>
            <li className="flex-1 border-t-2 sm:border-0 border-coal-light">
              <button onClick={() => setchangeColor(3)} className={changeColor !=3? "block py-4 px-6 rounded-t-lg border-b-2 transition border-transparent hover:text-white hover:border-gray-500 snipcss0-4-10-11" : "block py-4 px-6 rounded-t-lg border-b-2 transition  text-xenos-500 border-xenos-500"} >
                Your entries 
                <span className="inline-block ml-1 text-base">
                  (0)
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="py-4">
          <div className="py-2 px-5 md:px-6 relative">
            <div className="py-6 text-center">
              <p className="text-gray-300">
                At this moment there are no winners.  
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
