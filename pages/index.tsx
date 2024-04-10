import TaskList from "@/components/taskList/taskList";
import { GetServerSideProps } from "next";

interface HomeProps {
  tasks: {
    _id: string;
    title: string;
    description: string;
    date: Date;
    done: boolean;
  }[];
}

export default function Home({ tasks }: HomeProps) {
  return (
    <div className="taskListWrapper">
      <TaskList tasks={tasks} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/getTasks`);
    if (!response.ok) {
      console.error("No response");
      return { props: { tasks: [] } };
    }
    const data = await response.json();
    if (data) {
      // console.log("data", data);
      const { tasks } = data;
      if (tasks) {
        return { props: { tasks } };
      }
    } else {
      alert("No data");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }

  return { props: { tasks: [] } };
};
