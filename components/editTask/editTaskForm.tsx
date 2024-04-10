import React, { FormEvent, useState } from "react";
import classes from "./editTaskForm.module.css";
import { useRouter } from "next/router";

interface EditTaskFormProps {
  id: string;
  title: string;
  description: string;
  date: string;
  done: boolean;
}

export default function EditTaskForm({
  id,
  title,
  description,
  date,
  done,
}: EditTaskFormProps) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newDate, setNewDate] = useState<string>(date);

  const router = useRouter();

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTitle,
            newDescription,
            newDate,
            newDone: done,
          }),
        }
      );
      if (!res.ok) {
        alert("Failed to edit the task");
        return;
      }
      // router.reload();
      router.replace("/");
    } catch (error) {}
  }

  return (
    <form className={classes.editTask}>
      <input
        type="text"
        placeholder="Task title"
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        value={newTitle}
      />
      <input
        type="text"
        placeholder="Task description"
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
        value={newDescription}
      />
      <input
        type="date"
        onChange={(e) => {
          setNewDate(e.target.value);
        }}
        value={newDate}
      />
      <button type="submit" onClick={submitHandler}>
        Update Task
      </button>
    </form>
  );
}
