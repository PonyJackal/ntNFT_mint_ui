import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import useNTNFTContract, {
  useNTNFTBalance,
  useNTNFTTotalMinted,
} from "../hooks/useNTNFTContract";
import HeroImage from "../components/HeroImage";
import Header from "../components/Header";
import Button from "../components/Button";
import Success from "../components/Success";
import QuantitySelector from "../components/QuantitySelector";
import {
  wlMintEpxreDate,
  isConnectedCorrectNetwork,
  getCorrectNetwork,
} from "../util";

const NTNFT_ADDRESS = process.env.NEXT_PUBLIC_NTNFT_ADDRESS;

const Home = () => {
  const { account, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const ntNFTContract = useNTNFTContract();
  const {data: tokenBalance} = useNTNFTBalance(account);

  const [minting, setMinting] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [mintErrorMessage, setMintErrorMessage] = useState("");
  const [transferErrorMessage, setTransferErrorMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toAddress, setToAddress] = useState("");
  const [tokenIdToTransfer, setTokenIdToTransfer] = useState();

  const isConnected = typeof account === "string" && !!library;

  const handleMint = async () => {
    if (!account) {
      return;
    }

    try {
      setMinting(true);
      setMintErrorMessage("");
      setTransferErrorMessage("");

      const tx = await ntNFTContract.mint(quantity);

      await tx.wait();
      setConfirmed(true);
    } catch (e) {
      console.log("Mint error", e.message); // Save this to state
      setMintErrorMessage(e.message);
    } finally {
      setMinting(false);
    }
  };

  const handleAddressChange = (e) => {
    setToAddress(e.target.value);
  }

  const handleTokenIdChange = (e) => {
    setTokenIdToTransfer(e.target.value);
  }

  const handleTransfer = async () => {
    if (!account) {
      return;
    }

    try {
      setTransferring(true);
      setTransferErrorMessage("");
      setMintErrorMessage("");

      const tx = await ntNFTContract.transferFrom(account, toAddress, tokenIdToTransfer);

      await tx.wait();
      setConfirmed(true);
    } catch (e) {
      console.log("Transfer error", e.message); // Save this to state
      setTransferErrorMessage(e.message);
    } finally {
      setTransferring(false);
    }
  };

  function setPriceQty(val) {
    const _qty = quantity + val;
    setQuantity(_qty);
  }

  const returnMintError = (msg) => {
    if (msg.includes("NTNFT: to address is not an admin"))
      return "You are not an administrator";
    if (msg.includes("resolver or addr is not configured for ENS name"))
      return "Invalid address";
    if (msg.includes("invalid BigNumber string"))
      return "Invalid token Id";
    return "Something went wrong.";
  };
  const returnTransferError = (msg) => {
    if (msg.includes("NTNFT: to address is not an admin"))
      return "You are transferring a token to non-administrator";
    if (msg.includes("resolver or addr is not configured for ENS name"))
      return "Invalid address";
    if (msg.includes("invalid BigNumber string"))
      return "Invalid token Id";
    return "Something went wrong.";
  };

  return (
    <div className="overflow-y-scroll text-white bg-black font-orbitron h-screen">
      <Head>
        <title>NTNFT</title>
      </Head>

      <Header />

      <main>
        <div className="text-center">
          <h1 className="z-10 mb-24 mt-24 sm:mb-14 md:mb-8 text-hero-title-md sm:text-hero-title-md md:text-hero-title-lg">
            Only administrators can mint tokens
          </h1>
        </div>

        {isConnected && (
          <div className="text-center">
              <p className="z-10 mb-4 mt-14 text-hero-title-sm sm:text-hero-title-sm md:text-hero-title-md">
                Your token balance: {tokenBalance}
              </p>
          </div>
        )}

        <div className="mt-24 flex justify-center">
          {!isConnected ? (
            <Account
              triedToEagerConnect={triedToEagerConnect}
              displayHeader={true}
            />
          ) : !isConnectedCorrectNetwork(chainId) ? (
            <p className="text-gp-red  text-hero-desc-lg">
              Please switch to the {getCorrectNetwork()}
            </p>
          ) : !confirmed ? (
            <section>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <QuantitySelector
                  quantity={quantity}
                  clickHandler={(val) => setPriceQty(val)}
                />
                <Button
                  isPrimary={true}
                  disabled={minting}
                  clickHandler={handleMint}
                >
                  {minting ? "Minting..." : `Mint`}
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center mt-8">
                <input
                  type="text"
                  className="bg-woodsmoke-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-0 mb-4 sm:mb-0 sm:mr-4"
                  placeholder="To Address"
                  value={toAddress}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  className="bg-woodsmoke-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-0 mb-4 sm:mb-0 sm:mr-4"
                  placeholder="Token Id"
                  value={tokenIdToTransfer}
                  onChange={handleTokenIdChange}
                />
                <Button
                  isPrimary={true}
                  disabled={transferring}
                  clickHandler={handleTransfer}
                >
                  {transferring ? "Transferring..." : `Transfer`}
                </Button>
              </div>

            </section>
          ) : (
            <Success address={NTNFT_ADDRESS} />
          )}
        </div>

        <div className="text-center mt-14">
          {mintErrorMessage ? (
            <p className="mb-8 text-gp-red text-hero-desc-lg">
              {returnMintError(mintErrorMessage)}
            </p>
          ) : null}
        </div>
        <div className="text-center mt-14">
          {transferErrorMessage ? (
            <p className="mb-8 text-gp-red text-hero-desc-lg">
              {returnTransferError(transferErrorMessage)}
            </p>
          ) : null}
        </div>
      </main>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
