"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import SwitchButton from "../SwitchButton/SwitchButton";
import { themeContext } from "@/app/contexts/ThemeContext";

function Navbar() {
  const ThemeContext = useContext(themeContext);

  useEffect(() => {
    if (ThemeContext?.value === 'dark') {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#06090f";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  }, [ThemeContext?.value]);
  return (
    <nav className="flex px-12 py-6 items-center justify-between mx-auto container">
      <Link href={"/"} className="text-title capitalize font-bold dark:text-red-600">
        task manager
      </Link>
      <SwitchButton />
    </nav>
  );
}

export default Navbar;
