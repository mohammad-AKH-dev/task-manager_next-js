"use client";

import { themeContext } from "@/app/contexts/ThemeContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import UsersMultipleDialog from "./UserPickerModal";
import { IconPaperclip, IconPlus } from "@tabler/icons-react";

type Inputs = {
  title: string;
  description: string;
  priority: "Low" | "Meduim" | "High";
};

function CreateTask() {
  const ThemeContext = useContext(themeContext);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState<"Low" | "Meduim" | "High">("Low");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      priority: priority,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="create-task__section">
      <h3 className="create-task-title text-[20px] font-bold capitalize">
        create task
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col gap-y-8"
      >
        <div className="input-wrapper flex flex-col gap-y-1">
          <label
            htmlFor="title"
            className="block font-bold text-sm  text-gray-500"
          >
            Task Title
          </label>
          <input
            id="title"
            placeholder="Create App Ui"
            {...register("title")}
            type="text"
            className="mt-2 py-2 block w-full dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="input-wrapper flex flex-col gap-y-1">
          <label
            htmlFor="description"
            className="block font-bold text-sm  text-gray-500"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description")}
            className="mt-2 py-2 block w-full dark:border-neutral-700 dark:border min-h-[64px] max-h-[120px] placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="inputs-wrapper grid grid-cols-3 gap-y-3 gap-x-6  xl:gap-x-3">
          <FormControl sx={{ m: 1 }}>
            <InputLabel
              id="demo-simple-select-helper-label"
              sx={{
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                position: `${ThemeContext?.value === "dark" && "relative"}`,
                zIndex: `${ThemeContext?.value === "dark" && "99"}`,
              }}
              className="text-black"
            >
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              className="dark:mt-[-1.4rem] border-red-500"
              id="demo-simple-select-helper"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              label="Low"
              sx={{
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                outline: "none",
                border: `${
                  ThemeContext?.value === "dark" && "1px solid #d1d5dc"
                }`,
              }}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Meduim"}>Meduim</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          <div className="date-picker__wrapper relative">
            <label className="date-picker text-[11px] text-gray-500 absolute z-[10] left-3 top-0 dark:text-neutral-200">
              Due Time
            </label>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              className="p-4 w-full date-picker-input mt-2 border-gray-300 dark:border-neutral-700 border rounded-sm"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <UsersMultipleDialog
            open={isOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </div>
        <div className="input-wrapper flex flex-col gap-y-3">
          <label
            htmlFor="todo"
            className="input-wrapper__title text-gray-500 font-bold text-[14px]"
          >
            Todo Checklist
          </label>
          <div className="flex attachment items-center gap-x-6">

          <input
            type="text"
            id="todo"
            placeholder="Enter Task"
            className="mt-2 py-2 attachment-input block w-[80%] md:w-[85%] dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
          <button type="button" className="flex attachment-btn cursor-pointer mt-2 dark:bg-neutral-700 dark:border-neutral-500 dark:border
           justify-center md:w-[15%] items-center gap-x-2 p-2 px-3 bg-[#e5e5e5] rounded-md">
            <IconPlus className="w-[17px]"/>
            Add
          </button>
          </div>

        </div>
        <div className="input-wrapper  flex flex-col gap-y-3">
          <label
            htmlFor="attachment"
            className="input-wrapper__title text-gray-500 font-bold text-[14px]"
          >
            Add Attachments
          </label>
          <div className="flex attachment items-center gap-x-6">

          <input
            type="text"
            id="attachment"
            placeholder='Add File Link'
            className="mt-2 py-2 attachment-input block w-[80%] md:w-[85%] dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
          <button type="button" className="flex mt-2 attachment-btn cursor-pointer dark:text-white dark:bg-neutral-700 dark:border-neutral-500 dark:border justify-center md:w-[15%] items-center gap-x-2 p-2 px-3 bg-[#e5e5e5] rounded-md">
            <IconPlus className="w-[17px]"/>
            Add
          </button>
          </div>

        </div>

       <button type="submit" className="text-[#0284c7] dark:bg-neutral-700 dark:text-white dark:border
       dark:border-neutral-600 bg-sky-100 p-3 rounded-lg transition-all hover:bg-sky-300 hover:text-white cursor-pointer">Submit</button>
      </form>
    </div>
  );
}

export default CreateTask;
