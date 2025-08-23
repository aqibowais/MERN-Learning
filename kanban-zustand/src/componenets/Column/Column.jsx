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
        moveTask(draggedTask, status);
        setDraggedTask(null);
        setIsDrag(false);
      }}
      onDragLeave={(e) => {
        setIsDrag(false);
        e.preventDefault();
      }}
      className={`relative w-[320px] h-[540px] overflow-y-auto rounded-2xl p-6 flex flex-col bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-xl border transition-all duration-200 ${isDrag ? "border-blue-400 ring-2 ring-blue-300/40" : "border-neutral-800"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold tracking-wide text-neutral-200 uppercase letter-spacing-wide px-2 py-1 rounded bg-neutral-800/80 shadow-sm">{status}</span>
        <button
          className="flex justify-center items-center w-8 h-8 border border-neutral-700 rounded-lg bg-neutral-900 hover:bg-blue-500 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400"
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
      <div className="flex flex-col gap-3 flex-1">
        {store.tasks.map(
          (task, index) =>
            task.status &&
            status &&
            task.status.toLowerCase() === status.toLowerCase() && (
              <Tasks key={index} title={task.title} status={status} />
            )
        )}
        {isOpen && (
          <div className="flex flex-col gap-2 bg-neutral-800/80 rounded-lg p-3 mt-2 shadow-md">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-neutral-700 rounded-md p-2 bg-neutral-900 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-neutral-400"
              placeholder="Enter task title"
              autoFocus
            />
            <button
              onClick={() => {
                addTask(text, status);
                setText("");
                setIsOpen(false);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors rounded-md p-2 font-semibold text-white shadow"
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
