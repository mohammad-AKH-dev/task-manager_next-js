import React from "react";
import CreateTask from "../components/templates/createTask/CreateTask";

function page() {
  return (
    <section className="create-task__section p-4 px-8 pt-8 bg-white
     max-w-[850px] rounded-lg shadow-md dark:bg-neutral-900 dark:border dark:border-neutral-800 dark:text-white text-black">
      <CreateTask />
    </section>
  );
}

export default page;
