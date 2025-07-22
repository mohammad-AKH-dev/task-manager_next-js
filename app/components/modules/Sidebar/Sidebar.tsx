"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconDeviceIpadPlus,
  IconProgressCheck,
  IconUsers,
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/Sidebar";
import cn from "@/app/lib/utils";
import Image from "next/image";
import useLogOut from "@/app/hooks/useLogOut";

export function SidebarDemo() {
  const logout = useLogOut()
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-[17px]" />,
    },
    {
      label: "Manage Tasks",
      href: "/tasks",
      icon: <IconProgressCheck className="h-5 w-5 shrink-0 text-[17px]" />,
    },
    {
      label: "Create Task",
      href: "/create-task",
      icon: <IconDeviceIpadPlus className="h-5 w-5 shrink-0 text-[17px]" />,
    },
    {
      label: "Team Members",
      href: "/team",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-[17px]" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-[17px]" />,
      action: logout,
    },
  ];
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div
      className={cn(
        " flex md:w-[20%] desk-sidebar lg:max-w-[20%] md:pl-5 xl:pl-9 flex-1 sticky top-0 left-0 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "min-h-svh" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2 gap-y-6">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <div className="relative z-20 flex flex-col space-x-2 py-1 text-sm font-normal text-black">
      <div className="relative ml-[26px] max-w-[70px] max-h-[70px]">
        <Image
          width={1000}
          height={1000}
          src={"/images/user-1.jfif"}
          alt="user-profile"
          className="rounded-full w-full "
        />
        <input
          type="file"
          id="upload"
          className=" absolute hidden top-0 left-0 right-0 w-full h-full"
        />
      </div>
      <div
        className={`user-infos flex mt-3 flex-col gap-y-1 text-neutral-700 dark:text-neutral-200`}
      >
        <h3 className="user-title font-bold text-[17px] ml-10">Mike</h3>
        <span className="user-gmail">mike@gmail.com</span>
      </div>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </div>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array-demo-2" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={"second-array-demo-2" + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
