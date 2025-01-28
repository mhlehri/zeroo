import type React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type PropType = {
  selected: boolean;
  img: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, img, onClick } = props;

  return (
    <Button
      onClick={onClick}
      variant="link"
      className={`${
        selected ? "" : "opacity-70 hover:opacity-100"
      } size-20 overflow-hidden rounded-lg flex-shrink-0 bg-transparent p-0`}
    >
      <Image
        src={img}
        className="object-cover w-full h-full"
        width={80}
        height={80}
        alt="Thumb"
      />
    </Button>
  );
};
