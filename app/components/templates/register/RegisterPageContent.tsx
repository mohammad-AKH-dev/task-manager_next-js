"use client";

import { IconEye, IconEyeOff, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function RegisterPageContent() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="register-page__content-wrapper flex">
      <form
        action="#"
        className="register-page__form  w-[100%] p-8 sticky px-12 translate-y-14 md:translate-y-12"
      >
        <legend className="register-page__form-title max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-title text-[24px] font-bold  dark:text-white">
          Create an Account
        </legend>
        <span className="register-page__form-title block max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-[14px] text-gray-500">
          Join us today by entering your details below.
        </span>
        {/* image-uploader */}
        <div className="image-uploader__wrapper flex items-center justify-center max-w-[600px] translate-y-4 my-8 lg:mt-4">
           <Image width={1000} height={1000} src={'/images/user-member.avif'} alt="user-picture" className="max-w-[100px] rounded-full"/>
           <label htmlFor="user" className="cursor-pointer relative block">
              <div className="upload-icon p-1 px-2 absolute top-4 -left-8 rounded-full flex items-center justify-center bg-blue-600 w-fit">
                <IconUpload className="text-white w-[17px]"/>
                <input type="file" className="hidden" id="user" />
              </div>
           </label>
        </div>
        {/* register form  inputs */}
        <div className="register-inputs__wrapper max-w-[400px] mx-auto md:mx-0 md:max-w-[600px] grid grid-cols-2 gap-6">
             <div className="input-wrapper flex flex-col gap-y-2">
            <label htmlFor="username" className="text-start text-[14px]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
          </div>
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
           <div className="input-wrapper flex flex-col gap-y-2">
            <label htmlFor="token" className="text-start text-[14px]">
              Admin Invite Token
            </label>
            <input
              type="text"
              placeholder="6 Digit Code"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 cursor-pointer bg-blue-600 text-white block w-full max-w-[400px] mx-auto md:mx-0 md:max-w-[600px] rounded-sm p-2 "
        >
          Login
        </button>
        <span className="login-link mt-4 max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start block text-[14px]">
          Don't have an account?{" "}
          <Link className="text-blue-500" href={"/login"}>
            SignUp
          </Link>
        </span>
      </form>
      <div className="register-page__image-wrapper">
        <Image
          width={1000}
          height={1000}
          src={"/images/login-img.png"}
          className=" hidden md:block max-h-[654px] max-w-[400px] lg:max-w-[500px] h-svh"
          alt="login-page"
        />
      </div>
    </div>
  );
}

export default RegisterPageContent;
