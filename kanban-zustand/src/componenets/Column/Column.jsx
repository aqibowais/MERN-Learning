import React, { useState } from "react";
import Tasks from "../Tasks/Tasks";
import { useStore } from "../../store/Store";

function Column({ status }) {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const store = useStore();
  const addTask = store.addTask;
  const setDraggedTask = store.setDraggedTask;
  const moveTask = store.moveTask;
  const draggedTask = store.draggedTask;

  return (
    <div
      onDragOver={(e) => {
        setIsDrag(true);
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log("Droped", draggedTask);
        moveTask(draggedTask, status);
        setDraggedTask(null);
        setIsDrag(false);
      }}
      onDragLeave={(e) => {
        setIsDrag(false);
        e.preventDefault();
      }}
      className={`relative w-[300px] h-[500px] overflow-y-auto rounded-xl p-4 text-center text-white font-bold ${isDrag ? "border-dashed border-2 border-white" : "border-2 border-zinc-800"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <span>{status}</span>
        <button
          className="flex justify-center items-center w-7 h-7 border border-zinc-500 rounded-md hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {store.tasks.map(
          (task, index) =>
            task.status &&
            status &&
            task.status.toLowerCase() === status.toLowerCase() && (
              <Tasks key={index} title={task.title} status={status} />
            )
        )}
        {isOpen && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-zinc-500 rounded-md p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
            <button
              onClick={() => {
                addTask(text, status);
                setText("");
                setIsOpen(false);
              }}
              className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-md p-2"
            >
              Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;
