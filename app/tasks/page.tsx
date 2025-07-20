import React from "react";
import TasksContent from "../components/templates/tasks/TasksContent";
import { SidebarDemo } from "../components/modules/Sidebar/Sidebar";

function page() {
  return (
    <div className="taskmanager-content__wrapper flex gap-x-6 sm:gap-x-5 md:gap-x-8 relative">
      <SidebarDemo />
      <div className="taskmanager-content pr-8 lg:pr-0 w-[85%] sm:w-[88%] md:w-[70%] lg:w-[75%]">
        <section className="tasks-section p-4 pt-8">
          <TasksContent />
        </section>
      </div>
    </div>
  );
}

export default page;
