import { attachmentType } from "./attachments";
import { teamMemberType } from "./teamMebers";
import { todoType } from "./todos";

type taskType = {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: string;
  deadLine: string;
  team: teamMemberType[] | [];
  todos: todoType[] | [];
  attachments: attachmentType[] | [];
};

export type tasksType = taskType[]