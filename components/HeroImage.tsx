import React from "react";

interface HeroProps {
  imageSrc: string;
}

const HeroImage = ({ imageSrc }: HeroProps) => {
  return (
    <div className="relative z-0 mt-16">
      <img className="w-9/12 ml-auto mr-auto" src={imageSrc} />
    </div>
  );
};

export default HeroImage;
