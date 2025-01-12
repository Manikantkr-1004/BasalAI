import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchTasks, createTask, updateTask, deleteTask } from "../Redux/userReducer/action";
import { useSelector } from "react-redux";

const initialData = {
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
};

const filters = { status: "", priority: "", sort: "" };

export function ManageTask() {

    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState(filters);
    const { email } = useSelector((store) => store.userReducer);

    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all tasks on component mount
    useEffect(() => {

        loadTasks();
    }, [query]);

    const loadTasks = async () => {
        try {
            const response = await fetchTasks({ ...query, own: email });
            if (response?.error || !response) {
                toast.error(response?.message || "Internal Error")
            } else {
                setTasks(response?.data);
            }
        } catch (error) {
            toast.error("Failed to load tasks");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            const response = await deleteTask(id);
            if (response?.error || !response) {
                toast.error(response?.message || "Internal Error")
            } else {
                toast.success(response?.message);
                setTasks((prev) => prev.filter((task) => task._id !== id)); // Remove task from state
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Failed to delete task");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.dueDate) {
            toast.error("Title and due date are required");
            return;
        }

        try {
            setLoading(true);

            if (isEditing) {
                // Update existing task
                const response = await updateTask({ id: currentTaskId, taskData: formData });

                if (response?.error || !response) {
                    toast.error(response?.message || "Internal Error")
                } else {
                    toast.success(response?.message);
                    setTasks((prev) =>
                        prev.map((task) =>
                            task._id === currentTaskId ? { ...task, ...formData } : task
                        )
                    );
                    setFormData(initialData);
                }

            } else {
                // Create new task
                const response = await createTask(formData);
                if (response?.error || !response) {
                    toast.error(response?.message || "Internal Error")
                } else {
                    toast.success(response?.message);
                    setTasks((prev) => [formData, ...prev]);
                    setFormData(initialData);
                }
            }

            setIsEditing(false);
            setCurrentTaskId(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Failed to submit task");
        }
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate.slice(0, 10), // Format date for input
        });
        setIsEditing(true);
        setCurrentTaskId(task._id);
    };

    return (
        <section className="w-full min-h-screen p-4 sm:p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {isEditing ? "Update Task" : "Create New Task"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4"
            >
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={formData.status}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Priority
                    </label>
                    <select
                        name="priority"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="dueDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Due Date
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 text-white font-medium rounded-md ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading
                        ? isEditing
                            ? "Updating Task..."
                            : "Creating Task..."
                        : isEditing
                            ? "Update Task"
                            : "Create Task"}
                </button>
                {isEditing &&
                    <button disabled={loading} onClick={() => { setIsEditing(false); setFormData(initialData) }}
                        className={`w-full py-2 px-4 text-white font-medium rounded-md ${loading
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-400 hover:bg-red-600"
                            }`}
                    >Cancel</button>}
            </form>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                <select
                    value={query.status}
                    onChange={(e)=> setQuery((prev)=> ({...prev, status: e.target.value}))}
                    className="mt-1 block w-full rounded-md p-1.5 border-gray-300 shadow-sm sm:text-sm"
                >
                    <option value="">All Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select
                    value={query.priority}
                    onChange={(e)=> setQuery((prev)=> ({...prev, priority: e.target.value}))}
                    className="mt-1 block w-full rounded-md p-1.5 border-gray-300 shadow-sm sm:text-sm"
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    value={query.sort}
                    onChange={(e)=> setQuery((prev)=> ({...prev, sort: e.target.value}))}
                    className="mt-1 block w-full rounded-md p-1.5 border-gray-300 shadow-sm sm:text-sm"
                >
                    <option value="">Sort By Timing</option>
                    <option value="asc">Oldest</option>
                    <option value="desc">Newest</option>
                </select>
            </div>

            {tasks?.length===0 && <p className="text-center font-bold text-xl my-4">No Data Found</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks?.map((task) => (
                    <div
                        key={task?._id}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <h2 className="text-xl font-bold text-gray-800">
                            {task?.title}
                        </h2>
                        <p className="text-gray-600">{task?.description}</p>
                        <p className="text-gray-600">
                            Status: {task?.status}
                        </p>
                        <p className="text-gray-600">
                            Priority: {task?.priority}
                        </p>
                        <p className="text-gray-600">
                            Due: {new Date(task?.dueDate).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                disabled={loading}
                                onClick={() => handleEdit(task)}
                                className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Update
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => handleDelete(task?._id)}
                                className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
