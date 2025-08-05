import { create } from "zustand";
import { persist } from "zustand/middleware";
const store = (set) => ({
  tasks: [
    // { title: "CI/CD", status: "Todo" },
    // { title: "code review", status: "in progress" },
    // { title: "pull request", status: "done" },
  ],
  draggedTask:null,
  addTask: (title, status) => {
    set((state) => ({
      tasks: [...state.tasks, { title, status }],
    }));
  },

  removeTask: (title) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.title !== title),
    }));
  },

  editTask: (oldTitle, status, newTitle) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.title === oldTitle ? { title: newTitle, status } : task
      ),
    }));
  },
  setDraggedTask:(title)=>{
    set((state)=>({draggedTask:title}))
  },
  moveTask:(title,status)=>{
    set((state)=>({tasks:state.tasks.map((task)=>task.title===title?{title,status}:task)}))
  }
});

export const useStore = create(persist(store),{name:"store"});
