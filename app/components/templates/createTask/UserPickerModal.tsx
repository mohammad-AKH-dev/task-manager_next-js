import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { IconUsers } from "@tabler/icons-react";
import UserBox from "../../modules/UserBox/UserBox";
import { teamMembersType } from "@/app/types/teamMebers";
import { Avatar, AvatarGroup } from "@mui/material";

type UsersMultipleDialogPropsType = {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: () => void;
  users: teamMembersType;
  action: React.Dispatch<React.SetStateAction<teamMembersType | []>>;
  selectedTeam: teamMembersType | [];
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UsersMultipleDialog({
  open,
  handleClose,
  handleClickOpen,
  users,
  action,
  selectedTeam,
}: UsersMultipleDialogPropsType) {
  return (
    <React.Fragment>
      <div
        className="border py-[15px]  my-1 capitalize rounded-sm relative flex border-neutral-300 dark:border-neutral-700
       gap-x-2 cursor-pointer items-center justify-center  max-h-[57px] px-6"
        onClick={handleClickOpen}
      >
        {selectedTeam.length ? (
          <AvatarGroup max={4} sx={{flexWrap: 'wrap'}}>
            {selectedTeam.map((member) => (
              <Avatar src={member.profile} />
            ))}
          </AvatarGroup>
        ) : (
          <>
            <IconUsers className="w-[18px]" />
            add members
          </>
        )}
        <span className="text-[12px] text-gray-500 dark:text-white absolute left-2.5 -top-[11px]">
          Assign To
        </span>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select Users
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {users.map((user) => (
            <UserBox
              selectedTeam={selectedTeam}
              action={action}
              key={user.id}
              {...user}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button className="bg-red-600" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
