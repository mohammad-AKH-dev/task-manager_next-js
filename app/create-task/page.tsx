import React from "react";
import CreateTask from "../components/templates/createTask/CreateTask";
import { SidebarDemo } from "../components/modules/Sidebar/Sidebar";
import { teamMembersType } from "../types/teamMebers";
import { url } from "../utils/Utils";
import { tasksType } from "../types/tasks";

async function page() {
  const resMembers = await fetch(`${url}/members`)
  const members: teamMembersType = await resMembers.json()

  return (
    <div className="taskmanager-content__wrapper flex gap-x-6 sm:gap-x-5 md:gap-x-8 relative">
      <SidebarDemo />
      <div className="taskmanager-content pr-8 lg:pr-0 w-[85%] sm:w-[88%] md:w-[70%] lg:w-[75%]">
        <section
          className="create-task__section p-4 px-8 pt-8 bg-white
     max-w-[850px] rounded-lg shadow-md dark:bg-neutral-900 dark:border dark:border-neutral-800 dark:text-white text-black"
        >
          <CreateTask members={members} />
        </section>
      </div>
    </div>
  );
}

export default page;
