"use client";

import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabsComponent from "./TabsComponent";
import TaskBox from "../../modules/Tasks/TaskBox";
import { tasksType } from "@/app/types/tasks";
import EmptyTaskState from "../../modules/Tasks/EmptyTaskState";
import { getLocalStorageItem } from "@/app/utils/Utils";

type TasksContentPropsType = {
  tasks: tasksType;
};

function TasksContent({ tasks }: TasksContentPropsType) {
  const [selectedTasks, setSelectedTasks] = useState("all");
  const allTabs = ["all", "pending", "in progress", "completed"];
  const userId = getLocalStorageItem('userId')
  const [mainTasks, setMainTasks] = useState<tasksType>([]);

  useEffect(() => {
    setMainTasks(() => tasks.filter(task => task.userId === userId))
  },[])

  useEffect(() => {
    console.log(selectedTasks);
  }, [selectedTasks]);

  return (
    <>
      {/* tasks header */}
      <div className="tasks-section__title-wrapper flex flex-wrap gap-y-3 sm:flex-nowrap gap-x-3 sm:gap-x-0  justify-between items-center">
        <h3 className="tasks-title text-[20px] font-bold capitalize">
          my tasks
        </h3>
        <div className="tabs">
          <TabsComponent
            tabs={allTabs}
            setMainTab={setSelectedTasks}
            mainTab={selectedTasks}
          />
        </div>
      </div>
      {/* tasks */}
      <div
        className={`tasks-wrapper ${
          mainTasks.length &&
          "grid grid-cols-1 lg:grid-cols-2 gap-y-6 xl:grid-cols-3 gap-x-6 mt-8"
        }`}
      > {
        mainTasks.length &&
          selectedTasks === "all" &&
          mainTasks.map((task) => <TaskBox {...task} />)}

        {mainTasks.length &&
          selectedTasks === "pending" &&
          mainTasks
            .filter((task) => task.todos.length === 5)
            .map((task) => <TaskBox {...task} />)}

        {mainTasks.length &&
          selectedTasks === "in progress" &&
          mainTasks
            .filter((task) => task.todos.length > 0 && task.todos.length < 5)
            .map((task) => <TaskBox {...task} />)}

        {mainTasks.length &&
          selectedTasks === "completed" &&
          mainTasks
            .filter((task) => task.todos.length === 0)
            .map((task) => <TaskBox {...task} />)}

        {!mainTasks.length && <EmptyTaskState />}
      </div>
    </>
  );
}

export default TasksContent;
