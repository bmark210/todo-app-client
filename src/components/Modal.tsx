import React from "react";
import { Task } from "../types/task";
import { useCookies } from "react-cookie";
interface ModalProps {
  getData: Function;
  isOpen: boolean;
  setIsOpen: Function;
  mode: string;
  task?: Task;
  ReactServerHost: string;
}

const Modal = ({
  isOpen,
  mode,
  task,
  setIsOpen,
  getData,
  ReactServerHost,
}: ModalProps) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies] = useCookies<string>([]);


  const [data, setData] = React.useState({
    user_email: editMode ? task?.user_email : cookies.Email,
    title: mode === "edit" ? task?.title : "",
    progress: mode === "edit" ? task?.progress : 0,
    date: editMode ? task?.date : new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const postData = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ReactServerHost}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        setIsOpen(false);
        console.log("WORKED");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ReactServerHost}/todos/${task?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setIsOpen(false);
        console.log("task edited");
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-10 inset-0 h-screen bg-black-faded/60 backdrop-opacity-10 flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded p-10"
      >
        <div className="mb-4">
          <h3 className="text-center text-xl font-bold">
            Let's {mode} your task
          </h3>
        </div>
        <form>
          <input
            className="mb-4 border text-md rounded-lg px-2 py-1 w-full"
            required
            maxLength={30}
            placeholder="Your new task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            className="mb-4 px-2 py-1 w-full"
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className="border text-lg rounded-lg px-2 py-1 w-full"
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
