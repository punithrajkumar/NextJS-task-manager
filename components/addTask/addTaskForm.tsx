import React, { FormEvent, useState } from "react";
import classes from "./addTaskForm.module.css";
import { useRouter } from "next/router";

export default function AddTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const router = useRouter();

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Enter valid value");
      return;
    }
    try {
      const response = await fetch("/api/tasks/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, date, done: false }),
      });
      if (!response.ok) {
        alert("Failed to create a task");
        return;
      }
      router.push("/");
    } catch (error) {}
  }

  return (
    <form className={classes.addTask}>
      <input
        type="text"
        placeholder="Task title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        required
      />
      <input
        type="text"
        placeholder="Task description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
        required
      />
      <input
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
        required
      />
      <button type="submit" onClick={submitHandler}>
        Add Task
      </button>
    </form>
  );
}
