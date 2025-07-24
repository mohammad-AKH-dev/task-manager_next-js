import { Avatar, AvatarGroup, LinearProgress } from "@mui/material";
import React from "react";
import { IconPaperclip } from "@tabler/icons-react";
import { taskType } from "@/app/types/tasks";
import Link from "next/link";
import { todo } from "node:test";

type TaskBoxPropsType = taskType;

function TaskBox(props: TaskBoxPropsType) {
  const {
    id,
    deadLine,
    priority,
    title,
    description,
    todos,
    team,
    attachments,
    startDate,
  } = props;

  return (
    <Link href={`/update-task/${id}`} className="task-box p-6 bg-white text-[14px] cursor-pointer text-gray-500 rounded-xl dark:border-neutral-700 dark:bg-neutral-800 shadow-md">
      <div className="priority&status-infos text-[14px] flex flex-wrap lg:flex-nowrap gap-y-3 items-center gap-x-3">
        {/* task state */}
        {[...todos].filter(todo => todo.isDone === true).length === 5 && (
          <span className="bg-green-100 rounded-md px-4 xl:text-[12px] text-[#4caf50] p-1 min-w-[100px] text-center block max-w-[150px]">
            Completed
          </span>
        )}
        {[...todos].filter(todo => todo.isDone === true).length > 0 && [...todos].filter(todo => todo.isDone === true).length < 5 && (
          <span className="bg-cyan-100 rounded-md px-4 xl:text-[12px] text-[#00bcd4] p-1 min-w-[100px] text-center block max-w-[150px]">
            In Progress
          </span>
        )}
        {[...todos].filter(todo => todo.isDone === true).length === 0 && (
          <span className="bg-purple-100 rounded-md px-4 xl:text-[12px] text-[#9c27b0] p-1 min-w-[100px] text-center block max-w-[150px]">
            Pending
          </span>
        )}
        {/* task priority */}
        {priority === "Low" && (
          <span className="text-[#16a34a] bg-[#bbf7d0] xl:text-[12px] px-4 p-1 rounded-md min-w-[100px] text-center block max-w-[150px]">
            {priority} Priority
          </span>
        )}
        {priority === "Meduim" && (
          <span className="text-[#d97706] bg-[#fde68a] xl:text-[12px] px-4 p-1 rounded-md min-w-[100px] text-center block max-w-[150px]">
            {priority} Priority
          </span>
        )}
        {priority === "High" && (
          <span className="text-[#dc2626] bg-[#fecaca] xl:text-[12px] px-4 p-1 rounded-md min-w-[100px] text-center block max-w-[150px]">
            {priority} Priority
          </span>
        )}
      </div>
      <h4 className="task-title text-[17px] font-bold mt-3 text-black dark:text-[#e5e5e5]">
        {title}
      </h4>
      <div className="line-clamp-2 mt-2 leading-5 max-h-[50px] text-ellipsis">
        <p className="task-desc text-ellipsis ">{description}</p>
      </div>
      {/* task progress */}
      <div className="task-progress mt-4">
        <span className="tasks-done">
          Task Done:{" "}
          <span className="font-bold text-black dark:text-[#e5e5e5]">
            {todos.filter(todo => todo.isDone === true).length} / {todos.length}
          </span>
        </span>
        <LinearProgress
          className="mt-2"
          variant="determinate"
          sx={{ height: 7, borderRadius: 5 }}
          color="primary"
          value={(todos.filter(todo => todo.isDone === true).length) * 20}
        />
      </div>
      {/* task deadline */}
      <div className="task-deadline flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-4 lg:gap-x-0 items-center justify-between mt-4 lg:mt-2">
        <div className="flex flex-col">
          <span className="task-start-deadline__title capitalize">
            start date
          </span>
          <span className="start-date text-black dark:text-[#e5e5e5] font-bold">
            {startDate ? startDate : "undefind"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="task-end-deadline__title capitalize">due date</span>
          <span className="end-date text-black dark:text-[#e5e5e5] font-bold">
            {deadLine.toString()}
          </span>
        </div>
      </div>
      {/* assings && attachments */}
      <div className="attachments flex items-center gap-x-4 lg:gap-x-0 flex-wrap lg:flex-nowrap gap-y-4 justify-between mt-4">
        <div className="avatars">
          <AvatarGroup max={3}>
            {team.map((member) => (
              <Avatar alt={member.name} src={member.profile} />
            ))}
          </AvatarGroup>
        </div>
        <div className="flex items-center gap-x-2 bg-sky-100 p-1 px-3 rounded-lg">
          <IconPaperclip className="w-[17px] text-blue-800" />
          <span className="text-black">{attachments.length}</span>
        </div>
      </div>
    </Link>
  );
}

export default TaskBox;
