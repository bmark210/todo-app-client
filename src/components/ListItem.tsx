import { useState } from "react";
import { Task } from "../types/task";
import Modal from "./Modal";
import ProgressBar from "./Task/ProgressBar";
import TickIcon from "./Task/TickIcon";


interface Props {
  task: Task;
  getData: Function;
  ReactServerHost: string;
}

const ListItem = ({ task, getData, ReactServerHost }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteItem = async () => {
    try {
      const response = await fetch(`${ReactServerHost}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="flex justify-between items-center w-full shadow-md py-3 bg-white rounded-lg px-4 border-gray-primary mb-4 hover:transform hover:scale-105 transition-all">
        <div className="gap-3 flex items-center">
          <TickIcon />
          <p>{task.title}</p>
        </div>
        <ProgressBar progress={task.progress} />
        <div className="gap-3 flex items-center">
          <button
            onClick={handleOpen}
            className="border rounded px-2 py-1 hover:bg-yellow-light"
          >
            EDIT
          </button>
          <button
            onClick={handleDeleteItem}
            className="border rounded px-2 py-1 hover:bg-red-light"
          >
            DELETE
          </button>
        </div>
      </div>
      <Modal
        mode="edit"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        task={task}
        ReactServerHost={ReactServerHost}
      />
    </>
  );
};

export default ListItem;
