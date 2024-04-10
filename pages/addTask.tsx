import AddTaskForm from "@/components/addTask/addTaskForm";
import React from "react";
import Head from "next/head";

export default function addTask() {
  return (
    <>
      <Head>
        <title>Add Task</title>
      </Head>
      <AddTaskForm />
    </>
  );
}
