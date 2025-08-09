"use client";

import { themeContext } from "@/app/contexts/ThemeContext";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { getLocalStorageItem, url } from "@/app/utils/Utils";
import { todosType, todoType } from "@/app/types/todos";
import { attachmentsType } from "@/app/types/attachments";
import { teamMembersType } from "@/app/types/teamMebers";
import { toast } from "react-toastify";
import { tasksType, taskType } from "@/app/types/tasks";
import UsersMultipleDialog from "../createTask/UserPickerModal";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type CreateTaskPropsType = {
  members: teamMembersType;
  mainTask: taskType;
};

function UpdateTask({ members, mainTask }: CreateTaskPropsType) {
  const ThemeContext = useContext(themeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<null | Date>(new Date());
  const userId = getLocalStorageItem("userId");
  const [tasks, setTasks] = useState<tasksType>([]);
  const [todo, setTodo] = useState<string>("");
  const [attachment, setAttachment] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<teamMembersType | []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<todosType>([]);
  const [attachments, setAttachments] = useState<attachmentsType>([]);
  const [priority, setPriority] = useState<string>("Low");
  const router = useRouter()

  const getTasks = () => {
    fetch(`${url}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  useEffect(() => {
    getTasks();
    setTitle(mainTask.title);
    setDescription(mainTask.description);
    setTodos(mainTask.todos);
    setPriority(mainTask.priority);
    setDueDate(new Date(mainTask.deadLine));
    setSelectedTeam(mainTask.team);
    setAttachments(mainTask.attachments);
  }, []);

  const onSubmit = async () => {
    // checks if inputs are valid
    if (
      todos.length &&
      selectedTeam.length &&
      title.trim().length &&
      description.trim().length
    ) {
      setIsSubmited(true);

      if (todos.length === 5) {
        const newTask = {
          userId,
          title,
          description,
          priority,
          startDate: mainTask.startDate,
          deadLine:
            typeof dueDate === "string" ? dueDate : dueDate?.toDateString(),
          team: selectedTeam,
          todos: todos,
          attachments: attachments,
        };
        try {
          const res = await fetch(`${url}/tasks/${mainTask.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newTask),
          });
          if (res.ok) {
            toast.success("Task Updated successfully.");
            getTasks();
            setTitle("");
            setDescription("");
            setTodos([]);
            setAttachments([]);
            setSelectedTeam([]);
            setPriority("Low");
          }
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("You should create at least 5 todos.");
      }
    } else {
      toast.error(
        "plase write a title and description beside choose some members for task."
      );
    }
    setTimeout(() => {
      setIsSubmited(false);
    }, 3000);
  };

  const removeTask = (id: string) => {
    Swal.fire({
      title: "Delete",
      icon: "warning",
      text: "Are you sure you want to delete this task?",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${url}/tasks/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            toast.success('You have successfully deleted this task.')
            router.replace('/tasks')
          }
        } catch (error) {
            toast.error('Something went wrong. please try again.')
        }
      }
    });
  };

  const completeTodo = (Todo: todoType) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === Todo.id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  // create check lists todo
  const createTodo = (value: string) => {
    // if todo input is not empty
    if (value.trim().length) {
      // if todos array don't have more than 5 todos
      if (todos.length < 5) {
        // if incoming todo is not repeated before
        const checkIfRepeatedTodo = [...todos].some(
          (todo) => todo.value.toLowerCase() === value.toLowerCase()
        );
        if (checkIfRepeatedTodo) {
          toast.error("You added this todo before.");
        } else {
          const newTodo = {
            id: crypto.randomUUID(),
            value,
            isDone: false,
          };
          setTodos((prev) => [...prev, newTodo]);
          setTodo("");
        }
      } else {
        toast.error("You just can add 5 todos.");
      }
    } else {
      toast.error("todo input is empty. please write something!");
    }
  };

  // create attachment for task
  const createAttachment = (value: string) => {
    if (value.trim().length) {
      const checkIfRepeatedAttachment = [...attachments].some(
        (attachment) => attachment.value.toLowerCase() === value.toLowerCase()
      );
      if (checkIfRepeatedAttachment) {
        toast.error("You added this todo attachment before.");
      } else {
        const newAttachment = {
          id: crypto.randomUUID(),
          value,
        };
        setAttachments((prev) => [...prev, newAttachment]);
        setAttachment("");
      }
    } else {
      toast.error("attachment input is empty. please write something!");
    }
  };

  // remove special todo
  const removeTodo = (id: string) => {
    setTodos((prev) => [...prev].filter((todo) => todo.id !== id));
  };
  // remove special attachment
  const removeAttachment = (id: string) => {
    setAttachments((prev) =>
      [...prev].filter((attachment) => attachment.id !== id)
    );
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="update-task__section">
      <div className="update-task__section-header flex items-center justify-between">
        <h3 className="update-task-title text-[20px] font-bold capitalize">
          update task
        </h3>
        <IconTrash className="text-red-600 cursor-pointer" onClick={() => removeTask(mainTask.id)}/>
      </div>
      <form
        className="my-4 flex flex-col gap-y-8"
        onKeyDown={(event) => {
          // prevent submitting form with enter
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {/* task title */}
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            className="mt-2 py-2 block w-full dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
        </div>
        {/* task description */}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 py-2 block w-full dark:border-neutral-700 dark:border min-h-[64px] max-h-[120px] placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
          />
        </div>
        {/* priority && date-picker && user selection dialog */}
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
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
          </div>
          <UsersMultipleDialog
            selectedTeam={selectedTeam}
            action={setSelectedTeam}
            users={members}
            open={isOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </div>
        {/* todos checklist */}
        <div className="input-wrapper flex flex-col gap-y-3">
          <label
            htmlFor="todo"
            className="input-wrapper__title text-gray-500 font-bold text-[14px]"
          >
            Todo Checklist
          </label>
          {/* todos */}
          <div className="todos flex flex-col gap-y-3 text-[14px]">
            {todos.length
              ? todos.map((todo, index) => (
                  <div
                    className="todo flex items-center justify-between px-3 rounded-sm dark:bg-neutral-700 dark:border
                  dark:border-neutral-500 bg-[#e5e5e5] p-2 w-full"
                    onClick={() => completeTodo(todo)}
                  >
                    <div className="todo-wrapper flex items-center gap-x-2">
                      <span className="todo_index text-gray-400">
                        0{index + 1}
                      </span>
                      <h4 className="todo-title text-title dark:text-white">{todo.value}</h4>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Checkbox checked={todo.isDone} sx={{ marginTop: 0.3 }} />
                      <IconTrash
                        className="text-red-600 w-[20px] cursor-pointer"
                        onClick={() => removeTodo(todo.id)}
                      />
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="flex attachment items-center gap-x-6">
            <input
              type="text"
              id="todo"
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createTodo(todo);
                }
              }}
              placeholder="Enter Task"
              className="mt-2 py-2 attachment-input block w-[80%] md:w-[85%] dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
            />
            <button
              onClick={() => createTodo(todo)}
              type="button"
              className="flex attachment-btn cursor-pointer mt-2 dark:bg-neutral-700 dark:border-neutral-500 dark:border
           justify-center md:w-[15%] items-center gap-x-2 p-2 px-3 bg-[#e5e5e5] rounded-md"
            >
              <IconPlus className="w-[17px]" />
              Add
            </button>
          </div>
        </div>
        {/* attachments */}
        <div className="input-wrapper  flex flex-col gap-y-3">
          <label
            htmlFor="attachment"
            className="input-wrapper__title text-gray-500 font-bold text-[14px]"
          >
            Add Attachments
          </label>
          {/* attachments content */}
          <div className="attachments flex flex-col gap-y-3 text-[14px]">
            {attachments.length
              ? attachments.map((attachment, index) => (
                  <div className="attchments-content dark:bg-neutral-700 dark:border
                  dark:border-neutral-500 flex items-center justify-between px-3 rounded-sm bg-[#e5e5e5] p-2 w-full">
                    <div className="attachment-wrapper flex items-center gap-x-2">
                      <span className="attachment_index text-gray-400">
                        0{index + 1}
                      </span>
                      <h4 className="attachment-title text-title dark:text-white">
                        {attachment.value}
                      </h4>
                    </div>
                    <IconTrash
                      className="text-red-600 w-[20px]"
                      onClick={() => removeAttachment(attachment.id)}
                    />
                  </div>
                ))
              : null}
          </div>
          <div className="flex attachment items-center gap-x-6">
            <input
              type="text"
              id="attachment"
              value={attachment}
              onChange={(event) => setAttachment(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createAttachment(attachment);
                }
              }}
              placeholder="Add File Link"
              className="mt-2 py-2 attachment-input block w-[80%] md:w-[85%] dark:border dark:border-neutral-700 placeholder:text-gray-400 outline-none placeholder:text-[17px] 
             border-gray-300 rounded-md p-3 shadow-sm"
            />
            <button
              type="button"
              onClick={() => createAttachment(attachment)}
              className="flex mt-2 attachment-btn cursor-pointer dark:text-white dark:bg-neutral-700 dark:border-neutral-500 dark:border justify-center md:w-[15%] items-center gap-x-2 p-2 px-3 bg-[#e5e5e5] rounded-md"
            >
              <IconPlus className="w-[17px]" />
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmited}
          className="text-[#0284c7] dark:bg-neutral-700 dark:text-white dark:border
       dark:border-neutral-600 bg-sky-100 p-3 rounded-lg transition-all hover:bg-sky-300 hover:text-white cursor-pointer"
        >
          {isSubmited ? (
            <div className="loader translate-y-1">
              <CircularProgress size="20px" sx={{ color: "#fff" }} />
            </div>
          ) : (
            <span>Update Task</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateTask;
