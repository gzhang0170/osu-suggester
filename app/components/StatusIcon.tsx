"use client";

import { FaHeart, FaCheck } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import type { IconBaseProps } from "react-icons/lib";

const HeartIcon = FaHeart as unknown as React.FC<IconBaseProps>;
const CheckIcon = FaCheck as unknown as React.FC<IconBaseProps>;
const ChevronIcon =
  HiOutlineChevronDoubleUp as unknown as React.FC<IconBaseProps>;

export type Status = "LOVED" | "RANKED" | "QUALIFIED" | "APPROVED";

type StatusIconProps = {
  status: string;
  sizeClass?: string;
};

export default function StatusIcon({
  status,
  sizeClass = "text-2xl",
}: StatusIconProps) {
  const classes = `${sizeClass} inline-block`;
  switch (status) {
    case "LOVED":
      return <HeartIcon className={`${classes} text-pink-500`} title="Loved" />;
    case "RANKED":
      return (
        <ChevronIcon className={`${classes} text-cyan-300`} title="Ranked" />
      );
    case "QUALIFIED":
    case "APPROVED":
      return (
        <CheckIcon className={`${classes} text-green-500`} title={status} />
      );
    default:
      return null;
  }
}
