import React from "react";

type PageProps = {
  params: {
    name: string;
  };
};

export default function page({ params: { name } }: PageProps) {
  return <div>{name}</div>;
}
