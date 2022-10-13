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

  console.log(tokenBalance);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [accountDetails, setAccountDetails] = useState({
    ogQuantity: 0,
    gameKeyQuantity: 0,
    wlQuantity: 0,
  });

  const isConnected = typeof account === "string" && !!library;

  useEffect(() => {
    fetchAccountDetails(account);
  }, [account]);

  const fetchAccountDetails = async (address: string) => {
    const result = await fetch("/api/getQuantity", {
      method: "POST",
      body: JSON.stringify({
        address,
      }),
    });
    const res = await result.json();

    if (res) {
      const quantities = res.data.result;
      setAccountDetails({
        ...accountDetails,
        ...quantities,
      });
    }
  };

  const generateMerkleProofs = async (type, address: string, amount) => {
    const result = await fetch("/api/generateMerkleProof", {
      method: "POST",
      body: JSON.stringify({
        type,
        address,
        amount,
      }),
    });
    const res = await result.json();

    if (res) {
      const merkleProof = res.data.result;

      return merkleProof;
    }
    return [];
  };

  const handleMint = async () => {
    if (!account) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const tx = await ntNFTContract.mint(quantity);

      await tx.wait();
      setConfirmed(true);
    } catch (e) {
      console.log("Mint error", e.message); // Save this to state
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  function setPriceQty(val) {
    const _qty = quantity + val;
    console.log("_qty", _qty)
    setQuantity(_qty);
  }

  const returnError = (msg) => {
    if (msg.includes("NTNFT: to address is not an admin"))
      return "You are not an administrator";
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
                  disabled={loading}
                  clickHandler={handleMint}
                >
                  {loading ? "Minting..." : `MINT`}
                </Button>
              </div>
            </section>
          ) : (
            <Success address={NTNFT_ADDRESS} />
          )}
        </div>

        <div className="text-center mt-14">
          {errorMessage ? (
            <p className="mb-8 text-gp-red text-hero-desc-lg">
              {returnError(errorMessage)}
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
