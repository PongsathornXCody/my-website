import { useState } from "react";

export default function Task() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };
  return (
    <div
      className="min-h-screen  flex items-center justify-center
         bg-no-repeat bg-center bg-cover bg-[url('./bg2.jpg')] p-6"
    >
      <div className="bg-black shadow-xl rounded-2xl max-w-md">
        <h1 className="text-2xl font=bold text-center mb-2 py-2">
          สิ่งที่ต้องทำวันนี้
        </h1>
        <div className="flex gap-2 mb-4 px-6 ">
          <input
            type="text"
            placeholder="ระบุสิ่งที่ต้องทำ..."
            value={task}
            onChange={(e) => setTask(e.currentTarget.value)}
            className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2
                        focus:ring-blue-400"
          />
          <button
            className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-400"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 px-2 mb-4">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-xl shadow-sm text-black"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`cursor-pointer flex-1 ${
                  t.done ? "line-through text-red-600" : ""
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => toggleTask(index)}
                className={`px-3 py-1 text-sm rounded-xl ${
                  t.done ? "bg-green-400 text-white" : "bg-gray-200"
                }`}
              >
                {t.done ? "Done" : "Mark"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
