import React from "react";
import Account from "./Account";
import useEagerConnect from "../hooks/useEagerConnect";

const Header = () => {
  const triedToEagerConnect = useEagerConnect();

  return (
    <>
      <header className="relative z-10 px-26 py-16 sm:py-46 sm:px-74">
        <nav className="flex items-center justify-start">
          <Account
            displayHeader={false}
            triedToEagerConnect={triedToEagerConnect}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
