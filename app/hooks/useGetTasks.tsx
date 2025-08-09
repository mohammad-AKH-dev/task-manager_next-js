import React from "react";
import { url } from "../utils/Utils";
import { tasksType } from "../types/tasks";

async function useGetTasks() {
  const res = await fetch(`${url}/tasks`);
  const tasks: tasksType = await res.json();

  return tasks;
}

export default useGetTasks;
