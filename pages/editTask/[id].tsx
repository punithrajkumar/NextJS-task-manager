import EditTaskForm from "@/components/editTask/editTaskForm";
import { NextPageContext } from "next";
import React from "react";
interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  done: boolean;
}

interface EditTaskProps {
  data: {
    message: string;
    task: Task;
  };
}

const EditTask: React.FC<EditTaskProps> = ({ data }) => {
  const { task } = data;
  const { _id, title, description, date, done } = task;
  return (
    <EditTaskForm
      id={_id}
      title={title}
      description={description}
      date={date}
      done={done}
    />
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  const { id } = query;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`
    );
    if (!response.ok) {
      alert("Failed to fetch the data");
      return;
    }
    const data = await response.json();
    if (data) {
      return {
        props: {
          data,
        },
      };
    }
  } catch (error) {}
  return {};
}

export default EditTask;
