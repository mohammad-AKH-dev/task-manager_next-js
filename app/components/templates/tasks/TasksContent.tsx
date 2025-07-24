"use client";

import React, { useEffect, useMemo, useState } from "react";
import TabsComponent from "./TabsComponent";
import TaskBox from "../../modules/Tasks/TaskBox";
import { tasksType } from "@/app/types/tasks";
import EmptyTaskState from "../../modules/Tasks/EmptyTaskState";
import { getLocalStorageItem } from "@/app/utils/Utils";

type TasksContentPropsType = {
  tasks: tasksType;
};

function taskFilterReducer(tasks: tasksType, selectedStatus: string) {
  switch (selectedStatus) {
    case "all":
      return [...tasks];

    case "pending":
      return [...tasks].filter(
        (task) => task.todos.filter((todo) => todo.isDone === true).length === 0
      );

    case "in progress":
      return [...tasks].filter((task) => {
        // length of done tasks
        const doneCount = task.todos.filter((todo) => todo.isDone).length;
        return doneCount > 0 && doneCount < task.todos.length;
      });

    case "completed":
      return [...tasks].filter(
        (task) =>
          task.todos.length > 0 && task.todos.every((todo) => todo.isDone)
      );

    default:
      return [...tasks];
  }
}

function TasksContent({ tasks }: TasksContentPropsType) {
  const [selectedTasks, setSelectedTasks] = useState("all");
  const userId = getLocalStorageItem('userId')
  const filteredTasks = useMemo(
  () => taskFilterReducer([...tasks].filter(task => task.userId === userId), selectedTasks),
  [tasks, selectedTasks]
);
  const allTabs = ["all", "pending", "in progress", "completed"];

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
          filteredTasks.length
            ? "grid grid-cols-1 lg:grid-cols-2 gap-y-6 xl:grid-cols-3 gap-x-6 mt-8"
            : null
        }`}
      >
        {" "}
        {filteredTasks.length ? (
          filteredTasks.map((task) => <TaskBox key={task.id} {...task} />)
        ) : (
          <EmptyTaskState />
        )}
      </div>
    </>
  );
}

export default TasksContent;
