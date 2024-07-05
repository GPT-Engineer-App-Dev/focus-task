import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, text: newText } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (location.pathname === "/today") {
      // Add logic for filtering today's tasks
      return true;
    } else if (location.pathname === "/upcoming") {
      // Add logic for filtering upcoming tasks
      return true;
    }
    return true; // Default to showing all tasks
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{location.pathname === "/" ? "Inbox" : location.pathname.slice(1)}</h1>
      <div className="mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="mr-2"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center mb-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mr-2"
            />
            <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>{task.text}</span>
            <Button variant="outline" size="icon" className="mr-2" onClick={() => editTask(task.id, prompt("Edit task", task.text))}>Edit</Button>
            <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
