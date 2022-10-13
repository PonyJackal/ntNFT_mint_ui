import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import Image from "next/image";

import Button from "../components/Button";

type AccountProps = {
  triedToEagerConnect: boolean;
  displayHeader: boolean;
};

const Account = ({ triedToEagerConnect, displayHeader }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  const web3ButtonHandler = () => {
    setConnecting(true);

    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  };

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (!displayHeader && typeof account !== "string") {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <>
        {isWeb3Available ? (
          <div className="pt-6">
            <Button
              disabled={connecting}
              isPrimary={false}
              clickHandler={web3ButtonHandler}
            >
              {isMetaMaskInstalled
                ? "Connect to MetaMask"
                : "Connect to Wallet"}
            </Button>
          </div>
        ) : (
          <div className="pt-6">
            <Button isPrimary={false} clickHandler={startOnboarding}>
              <Image
                className="align-middle"
                alt="An Image of a Lightning"
                src={"/flash.svg"}
                width={22}
                height={22}
              />
              <span className="ml-2.5">Install Metamask</span>
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
