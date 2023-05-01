import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

interface Props {
  listName: string;
  getData: Function;
  ReactServerHost: string;
}

const ListHeader = ({ listName, getData, ReactServerHost }: Props) => {
  const [cockies, setCockies, removeCookie] = useCookies<string>([]);
  const [isOpen, setIsOpen] = useState(false);
  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  const toggleModalOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-md py-6 rounded-lg px-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 ">{listName}</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleModalOpen}
            className="border px-4 py-2 rounded hover:bg-yellow-light"
          >
            ADD NEW
          </button>
          <button
            className="border px-4 py-2 rounded hover:bg-red-light"
            onClick={signOut}
          >
            SIGN OUT
          </button>
        </div>
        <Modal
          ReactServerHost={ReactServerHost}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mode={"create"}
          getData={getData}
        />
      </div>
    </>
  );
};

export default ListHeader;
