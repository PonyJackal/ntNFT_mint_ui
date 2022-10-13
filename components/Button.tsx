import React from "react";

interface ButtonProps {
  isPrimary: boolean;
  children: React.ReactNode;
  clickHandler: React.MouseEventHandler;
  disabled?: boolean;
}

const Button = ({
  isPrimary,
  children,
  clickHandler,
  disabled,
}: ButtonProps) => {
  return (
    <>
      <button
        className={`
          flex items-center justify-center w-full xs:w-auto min-w-200 py-3.5 px-26 sm:py-18 border rounded-xl text-black 
          ${
            isPrimary
              ? "bg-white border-black font-bold text-primary-button-sm sm:text-primary-button-lg"
              : "bg-white border-black text-secondary-button"
          }
        `}
        onClick={clickHandler}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
