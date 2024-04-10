import Link from "next/link";
import classes from "./taskList.module.css";
import DeleteButton from "../deleteButton/deleteButton";
import { getIndianStandardTime } from "@/date/convertDate";
import { useRouter } from "next/router";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  console.log("tasks", tasks);

  const router = useRouter();
  async function completeTaskHandler(task: Task) {
    try {
      const response = await fetch("/api/tasks/completedTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        alert("Failed to complete the task!");
        return;
      }

      router.push("/completedTask");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* {(tasks.length === 0 || (tasks.length > 0 && tasks[0].done === true)) && (
        <p>No tasks found.</p>
      )} */}
      {(tasks.length === 0 || tasks.every((task) => task.done)) && (
        <p>No tasks found.</p>
      )}

      {tasks.length > 0 &&
        tasks.map(
          (task) =>
            task.done === false && (
              <div key={task._id} className={classes.taskList}>
                <div className={classes.taskListLeft}>
                  <div className={classes.taskListLeftFirst}>
                    <h2>{task.title.toUpperCase()}</h2>
                    <p>{task.description.toUpperCase()}</p>
                  </div>
                  <div className={classes.taskListLeftSecond}>
                    <span>
                      DUE DATE :
                      {getIndianStandardTime(task.date.toLocaleString())}
                    </span>

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
                </div>
                <div className={classes.taskListRight}>
                  <button onClick={() => completeTaskHandler(task)}>
                    Completed
                  </button>

                  <Link href={`/editTask/${task._id}`}>
                    <button>Edit</button>
                  </Link>

                  <DeleteButton id={task._id} />
                </div>
              </div>
            )
        )}
    </>
  );
}
