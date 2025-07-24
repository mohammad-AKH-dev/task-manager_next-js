import { IconClipboardList } from "@tabler/icons-react";
import Link from "next/link";

export default function EmptyTaskState() {
  return (
    <div className="flex flex-col mt-12 h-[700px] items-center justify-center text-center py-20 px-4 bg-gray-50 rounded-lg shadow-inner">
      <IconClipboardList size={64} stroke={1.5} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No Tasks Found</h2>
      <p className="text-gray-500 mb-6">
        You haven't created any tasks yet. Click the button below to get started.
      </p>
      <Link href={'/create-task'} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        + Create New Task
      </Link>
    </div>
  );
}
