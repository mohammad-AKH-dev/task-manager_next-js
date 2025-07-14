"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { themeContext } from "@/app/contexts/ThemeContext";

type taskType = {
  id: string;
  name: string;
  status: "completed" | "pending" | "in progress";
  priority: "High" | "Medium" | "Low";
  created_at: string;
  author_id: string;
};

const rows: taskType[] = [
  {
    id: "1",
    name: "develop Product Review System",
    status: "completed",
    priority: "High",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
  {
    id: "2",
    name: "develop Product Review System",
    status: "in progress",
    priority: "High",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
  {
    id: "3",
    name: "develop Product Review System",
    status: "pending",
    priority: "Low",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
  {
    id: "4",
    name: "develop Product Review System",
    status: "pending",
    priority: "Medium",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
  {
    id: "5",
    name: "develop Product Review System",
    status: "pending",
    priority: "High",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
  {
    id: "6",
    name: "develop Product Review System",
    status: "pending",
    priority: "High",
    created_at: "17th Mar 2025",
    author_id: "idpjdfjdpfjdop",
  },
];

export default function RecentTasks() {
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
          {rows.map((row, index) => (
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
                {row.name}
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
                {row.status === "pending" && (
                  <span className="bg-[#e9d5ff] rounded-sm px-4 text-[#9333ea] p-2">
                    {row.status}
                  </span>
                )}
                {row.status === "in progress" && (
                  <span className="bg-[#bae6fd] rounded-sm px-4 text-[#0284c7] p-2">
                    {row.status}
                  </span>
                )}
                {row.status === "completed" && (
                  <span className="bg-[#bbf7d0] rounded-sm px-4 text-[#16a34a] p-2">
                    {row.status}
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
                {row.priority === "Low" && (
                  <span className="text-[#16a34a] bg-[#bbf7d0] px-4 p-2 rounded-sm">
                    {row.priority}
                  </span>
                )}
                {row.priority === "Medium" && (
                  <span className="text-[#d97706] bg-[#fde68a] px-4 p-2 rounded-sm">
                    {row.priority}
                  </span>
                )}
                {row.priority === "High" && (
                  <span className="text-[#dc2626] bg-[#fecaca] px-4 p-2 rounded-sm">
                    {row.priority}
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
                {row.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
