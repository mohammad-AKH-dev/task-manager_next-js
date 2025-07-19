import { Checkbox } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

function UserBox() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked,setChecked] = useState<boolean>(false)

  return (
    <div className="user-box flex items-center justify-between mb-2 border-b-neutral-300 border-b pb-4 min-w-[350px] sm:min-w-[530px]" onClick={() => setChecked((prev: boolean) => !prev)}>
      <div className="user-infos flex gap-x-4">
        <Image
          className="max-w-[50px] rounded-full"
          width={1000}
          height={1000}
          src={"/images/user-1.jfif"}
          alt="user"
        />
        <div className="user-desc">
          <h5 className="user-title font-bold text-[16px]">John Paul</h5>
          <span className="user-email text-[13px] text-gray-500">john@timetoprogramm.com</span>
        </div>
      </div>
      <Checkbox checked={checked} {...label} />
    </div>
  );
}

export default UserBox;
