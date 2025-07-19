import React from "react";

export type MemberStatusBoxPropsType = {
  name: string;
  count: number;
};

function MemberStatusBox({ name, count }: MemberStatusBoxPropsType) {
  return (
    <div
      className={`member-assigned-status max-h-[50px] text-[11px] ${
        name === "Pending" && "text-[#8b5cf6]"
      } 
      ${
        name === "Completed" && "text-[#3b82f6]"
      }
      ${
        name === "In Progress" && "text-[#10b981]"
      }
      
      p-1 rounded-md px-2 font-bold bg-[#e5e5e5]`}
    >
      <span className="assigned-tasks__status-count whitespace-nowrap text-ellipsis">{count}</span>
      <h5 className="assigned-tasks__status-name whitespace-nowrap ">{name}</h5>
    </div>
  );
}

export default MemberStatusBox;
