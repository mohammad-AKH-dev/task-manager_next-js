import React from "react";

type taskInfoPropsType = {
  title: string;
  count: number;
  color: string;
};

function TaskInfoBox(props: taskInfoPropsType) {
  return (
    <div className={`${props.title} flex gap-x-3 items-center`}>
      <div className={`w-[12px] h-[30px] ${props.color} rounded-2xl`}></div>
      <div className="tasks-info capitalize flex items-center gap-x-1">
        <span className="tasks-count font-bold">{props.count}</span>
        <span className="tasks text-gray-500 text-[13px] translate-y-[1px] font-bold">
          {props.title}
        </span>
      </div>
    </div>
  );
}

export default TaskInfoBox;
