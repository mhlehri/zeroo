import { Button } from "@/components/ui/button";
import Image from "next/image";
import type React from "react";

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
      } roundeddd-lg size-20 shrink-0 overflow-hidden bg-transparent p-0`}
    >
      <Image
        src={img}
        className="h-full w-full bg-gray-200 object-cover"
        width={150}
        height={150}
        alt="Thumb"
      />
    </Button>
  );
};
