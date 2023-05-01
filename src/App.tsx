import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import { Task } from "./types/task";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const ReactServerHost = "todo-app-server-production-686b.up.railway.app";

  const [cookies, setCookie, removeCookie] = useCookies<string>([]);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const getData = async () => {
    try {
      const response = await fetch(`${ReactServerHost}/todos/${userEmail}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  console.log(tasks);

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort((a, b) => {
    return Number(new Date(a.date)) - Number(new Date(b.date));
  });
  console.log(sortedTasks);

  return (
    <>
      <div className="mx-auto w-2/4 mt-20">
        {!authToken && <Auth ReactServerHost={ReactServerHost} />}
        {authToken && (
          <>
            <ListHeader
              ReactServerHost={ReactServerHost}
              listName={"🏝️ Holyday tick list"}
              getData={getData}
            />
            {sortedTasks?.map((task) => (
              <div className="flex-row justify-between items-center">
                <ListItem
                  ReactServerHost={ReactServerHost}
                  getData={getData}
                  task={task}
                  key={task.id}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
export default App;
