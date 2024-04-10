import React from "react";
import classes from "./completedTask.module.css";
import { getIndianStandardTime } from "@/date/convertDate";
import DeleteButton from "../deleteButton/deleteButton";
interface CompletedTasksProps {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
  submittedDate: Date;
}

interface CompletedTasksPageProps {
  completedTasks: CompletedTasksProps[];
}
export default function CompletedTask({
  completedTasks,
}: CompletedTasksPageProps) {
  console.log("completed tasks", completedTasks);

  if (completedTasks.length === 0) {
    return <div>No completed tasks!</div>;
  } else {
    return (
      <>
        {completedTasks.map((task) => (
          <div key={task._id} className={classes.completedTask}>
            <div className={classes.completedTaskLeft}>
              <h3>{task.title.toUpperCase()}</h3>
              <p>{task.description.toUpperCase()}</p>
            </div>
            <div className={classes.completedTaskRight}>
              <div className={classes.submittedStatus}>
                <p>Submission status:</p>
                {new Date(task.date) > new Date() &&
                  new Date(task.date).toLocaleDateString() !==
                    new Date().toLocaleDateString() && <p>Upcoming</p>}
                {new Date(task.date) < new Date() &&
                  new Date(task.date).toLocaleDateString() !==
                    new Date().toLocaleDateString() && (
                    <p style={{ color: "red" }}>Overdue</p>
                  )}
                {new Date(task.date).toLocaleDateString() ===
                  new Date().toLocaleDateString() && (
                  <p style={{ color: "green" }}>Due date</p>
                )}
              </div>
              <div className={classes.submittedTaskDate}>
                <p>Due date:</p>
                <p>{getIndianStandardTime(task.date.toLocaleString())}</p>
              </div>
              <div className={classes.submittedOnDate}>
                <p>Submitted on:</p>
                <p>
                  {getIndianStandardTime(task.submittedDate.toLocaleString())}
                </p>
              </div>
            </div>
            <DeleteButton id={task._id} />
          </div>
        ))}
      </>
    );
  }
}
