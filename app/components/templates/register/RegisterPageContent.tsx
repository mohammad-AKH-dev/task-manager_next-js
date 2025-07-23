"use client";

import { IconEye, IconEyeOff, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCookie, uploadImageHandler, url } from "@/app/utils/Utils";
import { toast } from "react-toastify";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { usersTpye } from "@/app/types/users";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export interface registerFormInputs {
  username: string;
  email: string;
  password: string;
  adminToken?: string | undefined;
}

function RegisterPageContent() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [users, setUsers] = useState<usersTpye>([]);
  const router = useRouter()
  const [userImage, setUserImage] = useState("/images/user-member.avif");
  const [isDisabled, setIsDisabled] = useState(false);
  const emailRegex = /^[\w+.-]+@[\w-]+\.[a-zA-Z]{2,}$/g;
  const registerFormSchema = yup.object({
    username: yup
      .string()
      .required("please enter username.")
      .max(16, "username cannot have more than 16 characters."),
    email: yup
      .string()
      .matches(emailRegex, "please enter a valid email.")
      .required("please enter email."),
    password: yup
      .string()
      .required("please enter password.")
      .min(8, "password must be more than 8 characters")
      .max(16, "password must be less than 16 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerFormInputs>({
    resolver: yupResolver(registerFormSchema),
  });

  const getUsers = () => {
    fetch(`${url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getUsers()
  }, []);

  const registerHandler: SubmitHandler<registerFormInputs> = async (data) => {
    if (data) {
      setIsDisabled(true);

      // checks if email registered before

      const isRegisteredEmail = [...users].some((user) =>
        user.data.email.match(data.email)
      );

      if (isRegisteredEmail) {
        toast.error("You have already registered with this email.");
        setTimeout(() => {
          setIsDisabled(false);
        }, 3000);
      } else {
        const body = {
          data,
          userId: crypto.randomUUID(),
          urlPath: userImage,
        };

        try {
          const res = await fetch(`${url}/users`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const payload = await res.json();
          setCookie("user", payload.data, 2);
          useLocalStorage("userId", payload.userId);
          useLocalStorage("urlPath", payload.urlPath);
          getUsers()
          toast.success("You have successfully registered.");
          reset();
          router.push('/')
        } catch (error) {
          toast.error("There was a problem, please try again.");
        } finally {
          setTimeout(() => {
            setIsDisabled(false);
          }, 3000);
        }
      }
    }
  };

  return (
    <div className="register-page__content-wrapper flex">
      <form
        action="#"
        className="register-page__form  w-[100%] p-8 sticky px-12 translate-y-14 md:translate-y-12"
        onSubmit={handleSubmit(registerHandler)}
      >
        <legend className="register-page__form-title max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-title text-[24px] font-bold  dark:text-white">
          Create an Account
        </legend>
        <span className="register-page__form-title block max-w-[400px] md:max-w-full mx-auto md:mx-0 text-start text-[14px] text-gray-500">
          Join us today by entering your details below.
        </span>
        {/* image-uploader */}
        <div className="image-uploader__wrapper flex items-center justify-center max-w-[600px] translate-y-4 my-8 lg:mt-4">
          <img
            src={userImage}
            alt="user-picture"
            className="max-w-[100px] object-cover min-w-[100px] max-h-[100px] min-h-[100px] rounded-full"
          />
          <label htmlFor="user" className="cursor-pointer relative block">
            <div className="upload-icon p-1 px-2 absolute top-4 -left-8 rounded-full flex items-center justify-center bg-blue-600 w-fit">
              <IconUpload className="text-white w-[17px]" />
              <input
                type="file"
                className="hidden"
                id="user"
                onChange={(event) => uploadImageHandler(event, setUserImage)}
              />
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
              {...register("username")}
              placeholder="John"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
            {errors.username && (
              <span className="text-[10px] translate-x-1 -translate-y-1 text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="input-wrapper flex flex-col gap-y-2">
            <label htmlFor="email" className="text-start text-[14px]">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
            {errors.email && (
              <span className="text-[10px] translate-x-1 -translate-y-1 text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="input-wrapper relative flex flex-col gap-y-2">
            <label htmlFor="email" className="text-start text-[14px]">
              Password
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Min 8 Characters"
              maxLength={65}
              {...register("password")}
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
            {errors.password && (
              <span className="text-[10px] translate-x-1 -translate-y-1 text-red-600">
                {errors.password.message}
              </span>
            )}
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
              {...register("adminToken")}
              placeholder="6 Digit Code"
              className="mt-2 py-2  dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[14px] 
                   border-gray-300 rounded-md p-3 shadow-sm"
            />
            {errors.adminToken && (
              <span className="text-[10px] translate-x-1 -translate-y-1 text-red-600">
                {errors.adminToken.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="mt-6 cursor-pointer bg-blue-600 text-white block w-full max-w-[400px] mx-auto md:mx-0 md:max-w-[600px] rounded-sm p-2 "
        >
          {isDisabled ? (
            <div className="loader translate-y-1">
              <CircularProgress size="20px" sx={{ color: "#fff" }} />
            </div>
          ) : (
            <span>Register</span>
          )}
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
          className=" hidden md:block max-h-[654px] min-h-full max-w-[400px] lg:max-w-[500px] h-svh"
          alt="login-page"
        />
      </div>
    </div>
  );
}

export default RegisterPageContent;
