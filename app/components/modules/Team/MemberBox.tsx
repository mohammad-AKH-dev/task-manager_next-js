import Image from "next/image";
import React from "react";
import MemberStatusBox, { MemberStatusBoxPropsType } from "./MemberStatusBox";

type MemberBoxPropsType = {
  statuses: MemberStatusBoxPropsType[];
};

function MemberBox({ statuses }: MemberBoxPropsType) {
  return (
    <div className='p-6 bg-white text-[14px] text-gray-500 rounded-lg dark:border-neutral-700 dark:bg-neutral-800 shadow-lg"'>
      <div className="member-infos__wrapper flex gap-x-4 items-center">
        <Image
          width={1000}
          height={1000}
          className="max-w-[50px] rounded-full"
          src={"/images/user-1.jfif"}
          alt="user"
        />
        <div className="member-infos overflow-hidden text-ellipsis whitespace-nowrap">
          <h5 className="member-name text-[15px] text-black font-bold dark:text-white">
            Dustin
          </h5>
          <span className="member-email max-w-[140px] text-[12px] font-bold">
            dustin@timetoprogram.com
          </span>
        </div>
      </div>
      <div className="member-assigned__statuses grid overflow-hidden text-ellipsis grid-cols-2 gap-y-4 lg:grid-cols-3 gap-x-4 mt-8">
        {statuses.map((status) => (
          <MemberStatusBox count={status.count} name={status.name} />
        ))}
      </div>
    </div>
  );
}

export default MemberBox;
