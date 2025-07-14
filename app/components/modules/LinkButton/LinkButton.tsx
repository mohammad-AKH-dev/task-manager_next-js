import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type LinkButtonPropsType = {
    href: string
}

function LinkButton(props:LinkButtonPropsType) {
  return (
    <Link
      href={props.href}
      className="flex items-center text-[14px] tracking-wider gap-x-3 dark:text-neutral-200 dark:bg-neutral-700 p-2 px-4 group rounded-sm bg-[#e5e5e5] capitalize font-bold"
    >
      <span className="">see all</span>
      <IconArrowRight className="transition-all group-hover:translate-x-2" />
    </Link>
  );
}

export default LinkButton;
