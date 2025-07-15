"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import SwitchButton from "../SwitchButton/SwitchButton";
import { themeContext } from "@/app/contexts/ThemeContext";

function Navbar() {
  const ThemeContext = useContext(themeContext);

  useEffect(() => {
    const ul = document.querySelector(
      ".css-1yf54bd-MuiChartsLegend-root"
    ) as HTMLUListElement;
    const barChart = document.querySelector(
      ".css-oyjscr-MuiChartsSurface-root"
    ) as SVGAElement;

    if (ThemeContext?.value === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#161414";
      if (ul && barChart) {
        ul.style.color = "#e5e5e5";
        barChart.style.stroke = "#e5e5e5";
      }
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#e5e5e5";
      if (ul && barChart) {
        ul.style.color = "#030712";
        barChart.style.stroke = "#030712";
      }
    }
  }, [ThemeContext?.value]);
  return (
    <nav className="flex px-12 py-6 sticky top-0 z-100 bg-[#e5e5e5] dark:bg-neutral-900 items-center justify-between mx-auto ">
      <Link
        href={"/"}
        className="text-title capitalize font-bold dark:text-neutral-200"
      >
        task manager
      </Link>
      <SwitchButton />
    </nav>
  );
}

export default Navbar;
