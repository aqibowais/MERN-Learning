import { useState, useEffect, useRef } from "react";
import { useStore } from "../../store/Store";

function Tasks({ title, status }) {
  const store = useStore();
  const removeTask = store.removeTask;
  const editTask = store.editTask;
  const setDraggedTask = store.setDraggedTask;
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  

  // Corrected: sync newTitle with prop
  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "todo":
        return "bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-800 border border-neutral-300";
      case "in progress":
        return "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 border border-blue-300";
      case "done":
        return "bg-gradient-to-r from-green-200 to-green-400 text-green-900 border border-green-300";
      default:
        return "bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-800 border border-neutral-300";
    }
  };

  const editFormRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEditTask = () => {
    if (newTitle && newTitle.trim() !== "") {
      editTask(title, status, newTitle.trim());
      setIsOpen(false); // Close after saving
    } else {
      alert("Task title cannot be empty");
    }
  };

  return (
    <div
      className="bg-white/90 rounded-2xl shadow-lg p-4 mb-4 hover:shadow-2xl transition-all cursor-grab active:cursor-grabbing border border-neutral-200 group"
      draggable
      onDragStart={() => {
        setDraggedTask(title);
      }}
    >
      <div className="flex justify-between items-center gap-2">
        {isOpen ? (
          <div ref={editFormRef} className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 border border-neutral-300 rounded-md p-2 text-neutral-900 bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit task title"
              autoFocus
            />
            <button
              className="text-green-600 hover:text-green-800 p-1 rounded"
              onClick={handleEditTask}
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-neutral-900 truncate text-start text-base max-w-[170px] group-hover:text-blue-700 transition-colors duration-150">
              {title}
            </h3>
            <button
              className="text-neutral-400 hover:text-blue-500 transition-colors p-1 rounded"
              onClick={() => setIsOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16.862 4.487a2.121 2.121 0 113 3l-9.9 9.9a2.121 2.121 0 01-1.414.586H6v-2.414a2.121 2.121 0 01.586-1.414l9.9-9.9zM20 6l-4-4m4 0l-4 4"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="flex justify-between items-center mt-3">
        <button
          className="text-neutral-400 hover:text-red-500 transition-colors p-1 rounded"
          onClick={() => removeTask(title, status)}
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
              d="M19 7l-2 14H7l-2-14m4-4h6m1 0a1 1 0 011 1v1a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1h6z"
            />
          </svg>
        </button>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusStyles()} border`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default Tasks;
