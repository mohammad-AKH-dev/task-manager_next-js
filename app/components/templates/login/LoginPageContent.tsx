"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usersTpye } from "@/app/types/users";
import { setCookie, url } from "@/app/utils/Utils";
import { toast } from "react-toastify";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

interface loginFormInputs {
  email: string;
  password: string;
}

function LoginPageContent() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<usersTpye>([]);
  const emailRegex = /^[\w+.-]+@[\w-]+\.[a-zA-Z]{2,}$/g;
  const loginFormSchema = yup.object({
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
  } = useForm<loginFormInputs>({
    resolver: yupResolver(loginFormSchema),
  });
  const loginHandler: SubmitHandler<loginFormInputs> = async (data) => {
    setIsDisabled(true)

    try {
      if (data) {
        const res = await fetch(`${url}/users?email=${data.email}`);
        const users: usersTpye = await res.json();
        // checks if email is valid
        const isEmailValid = [...users].some((user) =>
          user.data.email.match(data.email)
        );
  
        if (!isEmailValid) {
          toast.error(
            "No user with this email was found, please register first."
          );
        } else {
          // checks if password is true
          const mainUser = [...users].find(user => user.data.email.match(data.email))
          if (mainUser?.data.password !== data.password) {
            toast.error("Password is incorrect.");
          } else {
            toast.success("You have successfully logged in.");
            reset();
            setCookie("user", mainUser.data, 2);
            useLocalStorage("userId", mainUser.userId);
            useLocalStorage("urlPath", mainUser.urlPath);
            router.push("/");
          }
        }
      }
      
    } catch (error) {
      toast.error('something went wrong, please try again.')
    }
    finally {
      setTimeout(() => {
        setIsDisabled(false)
      },3000)
    }
  };

  const getUsers = () => {
    fetch(`${url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="login-page__content-wrapper flex">
      <form
        onSubmit={handleSubmit(loginHandler)}
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
              {...register("email")}
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
            <span>Login</span>
          )}
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
          className=" hidden md:block max-w-[400px] max-h-[654px] min-h-full lg:max-w-[500px] h-svh"
          alt="login-page"
        />
      </div>
    </div>
  );
}

export default LoginPageContent;
