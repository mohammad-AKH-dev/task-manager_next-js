import Image from "next/image";
import React from "react";
import MemberStatusBox from "./MemberStatusBox";
import { teamMemberType } from "@/app/types/teamMebers";

type MemberBoxPropsType = {
  member: teamMemberType;
};

function MemberBox({member}: MemberBoxPropsType) {
  return (
    <div className='p-6 bg-white text-[14px] text-gray-500 rounded-lg dark:border-neutral-700 dark:bg-neutral-800 shadow-lg"'>
      <div className="member-infos__wrapper flex gap-x-4 items-center">
        <Image
          width={1000}
          height={1000}
          className="max-w-[50px] rounded-full"
          src={member.profile}
          alt="user"
        />
        <div className="member-infos overflow-hidden text-ellipsis whitespace-nowrap">
          <h5 className="member-name text-[15px] overflow-hidden whitespace-nowrap text-ellipsis text-black font-bold dark:text-white">
            {member.name}
          </h5>
          <span className="member-email max-w-[140px] text-[12px] font-bold">
            {member.email}
          </span>
        </div>
      </div>
      <div className="member-assigned__statuses grid overflow-hidden text-ellipsis grid-cols-2 gap-y-4 lg:grid-cols-3 gap-x-4 mt-8">
       <MemberStatusBox count={member.states.pending} name="Pending"/>
       <MemberStatusBox count={member.states.inProgress} name="InProgress"/>
       <MemberStatusBox count={member.states.complited} name="Completed"/>
      </div>
    </div>
  );
}

export default MemberBox;
