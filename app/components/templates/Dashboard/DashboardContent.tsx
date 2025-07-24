"use client";

import React, { useContext, useEffect, useState } from "react";
import DonutChart from "../../modules/Dashboard/DonutChart";
import { BarChart } from "@mui/x-charts";
import { themeContext } from "@/app/contexts/ThemeContext";
import TaskInfoBox from "../../modules/Dashboard/TaskInfoBox";
import RecentTasks from "../../modules/Dashboard/RecentUsers";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import LinkButton from "../../modules/LinkButton/LinkButton";
import { useSidebar } from "../../ui/Sidebar";
import { getCookie, getLocalStorageItem } from "@/app/utils/Utils";
import { tasksType } from "@/app/types/tasks";

type DashboardContentPropsType = {
  tasks: tasksType;
};

function DashboardContent({ tasks }: DashboardContentPropsType) {
  const [today, setToday] = useState(new Date("").toUTCString());
  const [greeting, setGreeting] = useState("");
  const user = JSON.parse(getCookie("user")!);
  const userId = getLocalStorageItem("userId");
  const [mainTasks, setMainTasks] = useState<tasksType>([]);
  const ThemeContext = useContext(themeContext);

  useEffect(() => {
    setMainTasks(() => tasks.filter((task) => task.userId === userId));
  }, []);

  // sets today's date per sec in interval
  useEffect(() => {
    const myInterVal = setInterval(() => {
      const newDate = new Date().toUTCString();
      setToday(newDate);
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }, 60);

    return () => clearInterval(myInterVal);
  }, []);

  return (
    <div className="dashboard-content">
      {/* dashboard header */}
      <div className="dashboard-header p-4 w-full bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-200 rounded-xl">
        <h2 className="dashboard-title text-[23px] dark:text-neutral-200 font-bold">
          {greeting}! {user?.username}
        </h2>
        <span className="dashboard-today__date text-gray-400 text-[15px] pt-2 block capitalize">
          {today}
        </span>
        <div className="tasks-infos grid grid-cols-1 sm:grid-cols-2 gap-y-6  lg:grid-cols-4 w-full mt-5">
          <TaskInfoBox
            title="total tasks"
            count={mainTasks.length}
            color="bg-blue-600"
          />
          <TaskInfoBox
            title="pending tasks"
            count={
              [...mainTasks].filter((task) => task.todos.length === 5).length
            }
            color="bg-purple-600"
          />
          <TaskInfoBox
            title="in progress"
            color="bg-sky-300"
            count={
              [...mainTasks].filter(
                (task) => task.todos.length > 0 && task.todos.length < 5
              ).length
            }
          />
          <TaskInfoBox
            title="completed tasks"
            color="bg-green-400"
            count={
              [...mainTasks].filter((task) => task.todos.length === 0).length
            }
          />
        </div>
      </div>
      {/* dashboard charts */}
      <div className="dashboard-charts grid grid-cols-1 gap-y-6 lg:grid-cols-2 gap-x-8 mt-12 relative  items-center">
        <div className="rounded-xl relative bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-200">
          <h4 className="donut-chart__title capitalize absolute top-4 font-bold dark:text-neutral-200 text-black left-4">
            task distribution
          </h4>
          <DonutChart />
        </div>
        <div className="bg-white h-full rounded-xl dark:bg-neutral-800 relative dark:border-neutral-700 border border-neutral-200">
          <h4 className="donut-chart__title capitalize absolute top-4 font-bold dark:text-neutral-200 text-black left-4">
            task priority Levels{" "}
          </h4>
          <BarChart
            className="translate-y-12 lg:translate-y-16 min-h-[400px] lg:min-h-0"
            xAxis={[
              {
                data: ["Low", "Medium", "High"], // لیبل‌های زیر ستون‌ها
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [2, 4, 6], // یک مقدار برای هر ستون
              },
            ]}
            sx={{
              "& .MuiChartsAxis-line": {
                stroke: `${
                  ThemeContext?.value === "dark" ? "#e5e5e5" : "#030712"
                }`,
              },
              "& .MuiChartsAxis-tick": {
                stroke: `${
                  ThemeContext?.value === "dark" ? "#e5e5e5" : "#030712"
                }`,
              },
            }}
            height={300}
          />
        </div>
      </div>
      {/* dashboard table */}
      <div className="dashboard-table mt-12 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-200 p-4 rounded-xl">
        <div className="dashboard-table__title-wrapper flex flex-wrap sm:flex-nowrap items-center justify-between my-3">
          <h4 className="dashboard-table__title capitalize font-bold dark:text-neutral-200 text-black">
            Recent Tasks
          </h4>
          <LinkButton href="/tasks" />
        </div>
        <RecentTasks tasks={mainTasks}/>
      </div>
    </div>
  );
}

export default DashboardContent;
