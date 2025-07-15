"use client";

import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsComponent from "./TabsComponent";
import TaskBox from "../../modules/Tasks/TaskBox";

function TasksContent() {
  const [selectedTasks, setSelectedTasks] = useState("all");
  const allTabs = ["all", "pending", "in progress", "completed"];
  useEffect(() => {
      console.log(selectedTasks)
  },[selectedTasks])

  return (
    <>
    {/* tasks header */}
      <div className="tasks-section__title-wrapper flex flex-wrap gap-y-3 sm:flex-nowrap gap-x-3 sm:gap-x-0  justify-between items-center">
        <h3 className="tasks-title text-[20px] font-bold capitalize">
          my tasks
        </h3>
        <div className="tabs">
          <TabsComponent tabs={allTabs} setMainTab={setSelectedTasks} mainTab={selectedTasks}/>
        </div>
      </div>
      {/* tasks */}
      <div className="tasks-wrapper grid grid-cols-1 lg:grid-cols-2 gap-y-6 xl:grid-cols-3 gap-x-6 mt-8">
           <TaskBox/>
           <TaskBox/>
           <TaskBox/>
      </div>
    </>
  );
}

export default TasksContent;
