"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { themeContext } from "@/app/contexts/ThemeContext";
import { tasksType } from "@/app/types/tasks";
import EmptyTaskState from "../Tasks/EmptyTaskState";

type RecentTasksPropsType = {
  tasks: tasksType
}

export default function RecentTasks({tasks}: RecentTasksPropsType) {
  const ThemeContext = React.useContext(themeContext);

  return (
    <TableContainer sx={{ boxShadow: "none", outline: "none" }}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="bg-white dark:bg-neutral-800 border-none"
      >
        <TableHead className="border-none">
          <TableRow className="">
            <TableCell
              className="dark:text-neutral-200"
              sx={{
                borderBottom: `${
                  ThemeContext?.value === "dark" && "1px solid #333"
                }`,
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                fontWeight: 'bold'
              }}
            >
              Name
            </TableCell>
            <TableCell
              className="dark:text-neutral-200"
              sx={{
                borderBottom: `1px solid ${
                  ThemeContext?.value === "dark" && "#333"
                }`,
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                fontWeight: 'bold'
              }}
              align="right"
            >
              Status
            </TableCell>
            <TableCell
              className="dark:text-neutral-200"
              sx={{
                borderBottom: `1px solid ${
                  ThemeContext?.value === "dark" && "#333"
                }`,
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                fontWeight: 'bold'
              }}
              align="right"
            >
              Priority
            </TableCell>
            <TableCell
              className="dark:text-neutral-200"
              sx={{
                borderBottom: `1px solid ${
                  ThemeContext?.value === "dark" && "#333"
                }`,
                color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                fontWeight: 'bold'
              }}
              align="right"
            >
              Created_at
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length ? tasks.slice(0,6).map((task, index) => (
            <TableRow
              key={index}
              className="border-b-neutral-200 border-b dark:border-b-neutral-500"
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                  borderBottom: `1px solid ${
                    ThemeContext?.value === "dark" && "#333"
                  }`,
                  color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                  fontWeight: 'bold'
                },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  borderBottom: `1px solid ${
                    ThemeContext?.value === "dark" && "#333"
                  }`,
                  color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                  fontWeight: 'bold'
                }}
              >
                {task.title}
              </TableCell>
              <TableCell
                className="capitalize text-red-600"
                sx={{
                  borderBottom: `1px solid ${
                    ThemeContext?.value === "dark" && "#333"
                  }`,
                  color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                }}
                align="right"
              >
                {task.todos.length === 5  && (
                  <span className="bg-[#e9d5ff] rounded-sm px-4 text-[#9333ea] p-2">
                    Pending
                  </span>
                )}
                {task.todos.length > 0 && task.todos.length < 5 && (
                  <span className="bg-[#bae6fd] rounded-sm px-4 text-[#0284c7] p-2">
                     In Progress
                  </span>
                )}
                {task.todos.length === 0 && (
                  <span className="bg-[#bbf7d0] rounded-sm px-4 text-[#16a34a] p-2">
                    Completed
                  </span>
                )}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `1px solid ${
                    ThemeContext?.value === "dark" && "#333"
                  }`,
                  color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                }}
                align="right"
              >
                {task.priority === "Low" && (
                  <span className="text-[#16a34a] bg-[#bbf7d0] px-4 p-2 rounded-sm">
                    {task.priority}
                  </span>
                )}
                {task.priority === "Meduim"&& (
                  <span className="text-[#d97706] bg-[#fde68a] px-4 p-2 rounded-sm">
                    {task.priority}
                  </span>
                )}
                {task.priority === "High" && (
                  <span className="text-[#dc2626] bg-[#fecaca] px-4 p-2 rounded-sm">
                    {task.priority}
                  </span>
                )}
                
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: `1px solid ${
                    ThemeContext?.value === "dark" && "#333"
                  }`,
                  color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,
                  fontWeight: 'bold'
                }}
                align="right"
              >
                {task.startDate ? task.startDate : 'undefind'}
              </TableCell>
            </TableRow>
          )):
          <div className="max-h-[400px] translate-x-[75px] md:translate-x-[100px] lg:translate-x-[140px] -translate-y-10 lg:translate-y-2">
             <EmptyTaskState/>
          </div> }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
