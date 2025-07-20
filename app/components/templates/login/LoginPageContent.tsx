"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function LoginPageContent() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  return (
    <div className="login-page__content-wrapper flex">
      <form
        action="#"
        className="login-page__form  w-[100%] p-8 sticky px-12 translate-y-14 md:translate-y-24"
      >
        <legend className="login-page__form-title max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-title text-[24px] font-bold capitalize dark:text-white">
          welcome back
        </legend>
        <span className="login-page__form-title block max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-[14px] text-gray-500">
          Please enter your details to log in
        </span>
        {/* login form  inputs */}
        <div className="login-inputs__wrapper max-w-[400px] mx-auto md:mx-0 md:max-w-[600px] flex flex-col gap-y-6 mt-5">
            
          <div className="input-wrapper flex flex-col gap-y-2">
            <label htmlFor="email" className="text-start text-[14px]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
               border-gray-300 rounded-md p-3 shadow-sm"
            />
          </div>
          <div className="input-wrapper relative flex flex-col gap-y-2">
            <label htmlFor="email" className="text-start text-[14px]">
              Password
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Min 8 Characters"
              maxLength={65}
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
               border-gray-300 rounded-md p-3 shadow-sm"
            />
            <div className="absolute right-3 text-gray-500 cursor-pointer top-11">
              {isShowPassword ? (
                <IconEyeOff onClick={() => setIsShowPassword(false)} />
              ) : (
                <IconEye onClick={() => setIsShowPassword(true)} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 cursor-pointer bg-blue-600 text-white block w-full max-w-[400px] mx-auto md:mx-0 md:max-w-[600px] rounded-sm p-2 "
        >
          Login
        </button>
        <span className="register-link mt-4 max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start block text-[14px]">
          Don't have an account?{" "}
          <Link className="text-blue-500" href={"/register"}>
            SignUp
          </Link>
        </span>
      </form>
      <div className="login-page__image-wrapper">
        <Image
          width={1000}
          height={1000}
          src={"/images/login-img.png"}
          className=" hidden md:block max-w-[400px] max-h-[654px] lg:max-w-[500px] h-svh"
          alt="login-page"
        />
      </div>
    </div>
  );
}

export default LoginPageContent;
