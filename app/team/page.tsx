import React from "react";
import TeamContent from "../components/templates/Team/TeamContent";
import { SidebarDemo } from "../components/modules/Sidebar/Sidebar";
import { url } from "../utils/Utils";
import { teamMembersType } from "../types/teamMebers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");
  if (!user) {
    redirect("/login");
  }

  const res = await fetch(`${url}/members`);
  const team: teamMembersType = await res.json();

  return (
    <div className="taskmanager-content__wrapper flex gap-x-6 sm:gap-x-5 md:gap-x-8 relative">
      <SidebarDemo />
      <div className="taskmanager-content pr-8 lg:pr-0 w-[85%] sm:w-[88%] md:w-[70%] lg:w-[75%]">
        <section className="team-members-section p-4 pt-8">
          <TeamContent team={team} />
        </section>
      </div>
    </div>
  );
}

export default page;
