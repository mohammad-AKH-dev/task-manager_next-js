'use client'

import React, { useState } from "react";
import MemberBox from "../../modules/Team/MemberBox";
import { MemberStatusBoxPropsType } from "../../modules/Team/MemberStatusBox";

function TeamContent() {
    const [statuses,setStatuses] = useState<MemberStatusBoxPropsType[]>([
        {name: 'Pending', count: 0},
        {name: 'In Progress', count: 3},
        {name: 'Completed', count: 2},
    ])
  return (
    <>
    {/* team members header */}
    <div className="team-members-section__title-wrapper flex flex-wrap gap-y-3 sm:flex-nowrap gap-x-3 sm:gap-x-0  justify-between items-center">
      <h3 className="team-members-title text-[20px] font-bold capitalize">Team Members</h3>
    </div>
    {/* members */}
    <div className="team-members grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pt-6">
      <MemberBox statuses={statuses}/>
      <MemberBox statuses={statuses}/>
      <MemberBox statuses={statuses}/>
    </div>
    </>
  );
}

export default TeamContent;
