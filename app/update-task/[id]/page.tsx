import React from "react";
import { SidebarDemo } from "@/app/components/modules/Sidebar/Sidebar";
import { url } from "@/app/utils/Utils";
import { teamMembersType } from "@/app/types/teamMebers";
import UpdateTask from "@/app/components/templates/updateTask/UpdateTask";
import { taskType } from "@/app/types/tasks";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
   const cookieStore = await cookies()
    const user = cookieStore.get('user')
    if(!user) {
      redirect('/login')
    }

  const {id} = await params
  const mainTaskRes = await fetch(`${url}/tasks/${id}`)
  const mainTask: taskType = await mainTaskRes.json()
  const resMembers = await fetch(`${url}/members`);
  const members: teamMembersType = await resMembers.json();

  return (
    <div className="taskmanager-content__wrapper flex gap-x-6 sm:gap-x-5 md:gap-x-8 relative">
      <SidebarDemo />
      <div className="taskmanager-content pr-8 lg:pr-0 w-[85%] sm:w-[88%] md:w-[70%] lg:w-[75%]">
        <section
          className="update-task__section p-4 px-8 pt-8 bg-white
     max-w-[850px] rounded-lg shadow-md dark:bg-neutral-900 dark:border dark:border-neutral-800 dark:text-white text-black"
        >
          <UpdateTask members={members} mainTask={mainTask} />
        </section>
      </div>
    </div>
  );
}

export default page;
