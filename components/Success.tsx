const Success = ({ address }) => {
  return (
    <div className="pt-12">
      <h2 className="pb-12 text-mint-green text-primary-button-lg">
        Congrats!
      </h2>
      <div className="z-10 flex flex-col sm:flex-row gap-6 items-center justify-center w-full mb-5 sm:mb-0 pt-12">
        <a
          href={`https://testnets.opensea.io/assets/goerli/goerli/${address}`}
          target="_blank"
          rel="noreferrer"
          className="g-camarone-green border-laurel-green font-bold text-primary-button-sm sm:text-primary-button-lg border-white/[.08] text-secondary-button flex items-center justify-center w-full xs:w-auto min-w-200 py-3.5 px-26 sm:py-18 border rounded-xl text-white "
        >
          View on OpenSea
        </a>
        <a
          href="https://twitter.com/intent/tweet"
          className="bg-woodsmoke-300 border-white/[.08] text-secondary-button flex items-center justify-center w-full xs:w-auto min-w-200 py-3.5 px-26 sm:py-18 border rounded-xl text-white "
          data-text=""
          data-via=""
          data-hashtags=""
          data-show-count="false"
        >
          Tweet
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </div>
    </div>
  );
};

export default Success;
