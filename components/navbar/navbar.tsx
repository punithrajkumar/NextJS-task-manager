import React from "react";
import Link from "next/link";
import classes from "./navbar.module.css";

export default function Navbar({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <div className={classes.navbar}>
        <h1>
          <Link href="/">TASK MANAGER</Link>
        </h1>

        <Link href="/addTask">
          <button>Add Task</button>
        </Link>
      </div>
      {children}
    </>
  );
}

 