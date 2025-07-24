"use client";

import React from "react";
import MemberBox from "../../modules/Team/MemberBox";
import { teamMembersType } from "@/app/types/teamMebers";

type TeamContentPropsType = {
  team: teamMembersType;
};

function TeamContent({ team }: TeamContentPropsType) {
  return (
    <>
      {/* team members header */}
      <div className="team-members-section__title-wrapper flex flex-wrap gap-y-3 sm:flex-nowrap gap-x-3 sm:gap-x-0  justify-between items-center">
        <h3 className="team-members-title text-[20px] font-bold capitalize">
          Team Members
        </h3>
      </div>
      {/* members */}
      <div className="team-members grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pt-6">
        {team.map((member) => (
          <MemberBox key={member.id} member={member} />
        ))}
      </div>
    </>
  );
}

export default TeamContent;
