import { teamMembersType, teamMemberType } from "@/app/types/teamMebers";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type UserBoxPropsType = {
  id: string;
  name: string;
  email: string;
  profile: string;
  assignedTo: [];
  states: {
    pending: number;
    inProgress: number;
    complited: number;
  };
  action: React.Dispatch<React.SetStateAction<teamMembersType | []>>;
  selectedTeam: teamMembersType | [];
};

function UserBox(props: UserBoxPropsType) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState<boolean>(false);
  const { id, name, email, profile, assignedTo, states, action, selectedTeam } =
    props;

  const removeSelectedMember = () => {
    console.log("name =>", name);
    action((prev) => [...prev].filter((member) => member.id !== id));
  };

  const addNewSelectedMember = () => {
    const newSelectedMember = {
      id,
      name,
      email,
      profile,
      assignedTo,
      states,
    };
    action((prev) => [...prev, newSelectedMember]);
  };

  return selectedTeam.some((member) => member.id === id) ? (
    <div
      className="user-box flex items-center justify-between mb-2 gap-x-[2rem] border-b-neutral-300 border-b pb-4 min-w-[350px] sm:min-w-[530px]"
      onClick={() => {
        removeSelectedMember();
      }}
    >
      <div className="user-infos min-w-[300px] cursor-pointer flex gap-x-4">
        <Image
          className="max-w-[50px] rounded-full"
          width={1000}
          height={1000}
          src={profile}
          alt="user"
        />
        <div className="user-desc">
          <h5 className="user-title font-bold text-[16px]">{name}</h5>
          <span className="user-email text-[13px] text-gray-500">{email}</span>
        </div>
      </div>
      <Checkbox checked={true} {...label} />
    </div>
  ) : (
    <div
      className="user-box flex items-center justify-between mb-2 gap-x-[2rem] border-b-neutral-300 border-b pb-4 min-w-[350px] sm:min-w-[530px]"
      onClick={() => {
        addNewSelectedMember()
      }}
    >
      <div className="user-infos min-w-[300px] cursor-pointer flex gap-x-4">
        <Image
          className="max-w-[50px] rounded-full"
          width={1000}
          height={1000}
          src={profile}
          alt="user"
        />
        <div className="user-desc">
          <h5 className="user-title font-bold text-[16px]">{name}</h5>
          <span className="user-email text-[13px] text-gray-500">{email}</span>
        </div>
      </div>
      <Checkbox
        checked={false}
        onClick={() => console.log("im false")}
        {...label}
      />
    </div>
  );
}

export default UserBox;
