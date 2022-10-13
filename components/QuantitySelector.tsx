import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const QuantitySelector = ({ quantity, clickHandler }) => {
  return (
    <>
      <div className="px-6 py-4 mb-8 sm:mr-8 sm:mb-0 flex items-center justify-center gap-6 bg-woodsmoke-300 rounded-xl border border-white/[.08]">
        <button
          onClick={() => (quantity > 1 ? clickHandler(-1) : 1)}
          className="w-8 h-8 rounded-full bg-woodsmoke-100 border border-white/[.08] p-1"
        >
          <FontAwesomeIcon icon={faMinus} width={20} height={20} />
        </button>
        <div>{quantity}</div>
        <button
          onClick={() => clickHandler(+1)}
          className="w-8 h-8 rounded-full bg-woodsmoke-100 border border-white/[.08] p-1"
        >
          <FontAwesomeIcon icon={faPlus} width={20} height={20} />
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
