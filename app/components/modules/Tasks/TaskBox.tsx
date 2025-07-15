import { Avatar, AvatarGroup, LinearProgress } from "@mui/material";
import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

function TaskBox() {
  return (
    <div className="task-box p-6 bg-white text-[14px] text-gray-500 rounded-xl dark:border-neutral-700 dark:bg-neutral-800 shadow-md">
      <div className="priority&status-infos text-[14px] flex flex-wrap lg:flex-nowrap gap-y-3 items-center gap-x-3">
        <span className="bg-[#e9d5ff] rounded-md px-4 text-[#9333ea] p-1 min-w-[100px] text-center block max-w-[150px]">
          In Progress
        </span>
        <span className="text-[#dc2626] bg-[#fecaca] px-4 p-1 rounded-md min-w-[100px] text-center block max-w-[150px]">
          High
        </span>
      </div>
      <h4 className="task-title text-[17px] font-bold mt-3 text-black dark:text-[#e5e5e5]">Design Homepage</h4>
      <div className="line-clamp-2 mt-2 leading-5 max-h-[50px] text-ellipsis">
        <p className="task-desc text-ellipsis ">
          create a clean and modern homepage layout using Tailwind Css. Ensure
          The design is responsive and completed.
        </p>
      </div>
      {/* task progress */}
      <div className="task-progress mt-4">
        <span className="tasks-done">
          Task Done: <span className="font-bold text-black dark:text-[#e5e5e5]">2 / 5</span>
        </span>
        <LinearProgress
          className="mt-2"
          variant="determinate"
          sx={{ height: 7, borderRadius: 5 }}
          color="primary"
          value={50}
        />
      </div>
      {/* task deadline */}
      <div className="task-deadline flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-4 lg:gap-x-0 items-center justify-between mt-4 lg:mt-2">
        <div className="flex flex-col">
          <span className="task-start-deadline__title capitalize">start date</span>
          <span className="start-date text-black dark:text-[#e5e5e5] font-bold">16th Mar 2025</span>
        </div>
        <div className="flex flex-col">
          <span className="task-end-deadline__title capitalize">due date</span>
          <span className="end-date text-black dark:text-[#e5e5e5] font-bold">31st Mar 2025</span>
        </div>
      </div>
      {/* assings && attachments */}
      <div className="attachments flex items-center gap-x-4 lg:gap-x-0 flex-wrap lg:flex-nowrap gap-y-4 justify-between mt-4">
        <div className="avatars">
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/images/user-1.jfif" />
            <Avatar alt="Travis Howard" src="/images/user-1.jfif" />
            <Avatar alt="Cindy Baker" src="/images/user-1.jfif" />
          </AvatarGroup>
        </div>
        <div className="flex items-center gap-x-2 bg-sky-100 p-1 px-3 rounded-lg">
            <IconPaperclip className="w-[17px] text-blue-800"/>
            <span className="text-black">2</span>
        </div>
      </div>
    </div>
  );
}

export default TaskBox;
