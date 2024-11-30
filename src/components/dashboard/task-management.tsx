// "use client";
// import api from "@/lib/axios-instance";
// import { useState, useEffect } from "react";

// // Define the Task interface
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;
// }

// const TaskManagement: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]); // Strongly typed state for tasks
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility
//   const [currentTask, setCurrentTask] = useState<Task | null>(null); // State for the current task being edited

//   // Fetch tasks from API
//   const fetchTasks = async () => {
//     try {
//       const response = await api.get<Task[]>("/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   };

//   // Delete task by ID
//   const deleteTask = async (taskId: string) => {
//     try {
//       await api.delete("/tasks", { data: { taskId } });
//       fetchTasks();
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   // Open modal with the current task data
//   const openEditModal = (task: Task) => {
//     setCurrentTask(task);
//     setIsModalOpen(true);
//   };

//   // Load tasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">Tasks</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             className="flex justify-between items-center p-4 bg-gray-100 my-2 rounded"
//           >
//             <span>{task.title}</span>
//             <div>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded mx-1"
//                 onClick={() => openEditModal(task)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => deleteTask(task.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {isModalOpen && currentTask && (
//         <TaskModal
//           task={currentTask}
//           onClose={() => setIsModalOpen(false)}
//           onTaskUpdated={fetchTasks}
//         />
//       )}
//     </div>
//   );
// };

// export default TaskManagement;
