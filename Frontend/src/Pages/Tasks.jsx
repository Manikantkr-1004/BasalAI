import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchTasks } from "../Redux/userReducer/action";

const filters = { status: "", priority: "", sort: "" };

export function Tasks() {
    
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState(filters);

    useEffect(() => {

        loadTasks();
    }, [query]);

    const loadTasks = async () => {
        try {
            const response = await fetchTasks({ ...query, own:"" });
            if (response?.error || !response) {
                toast.error(response?.message || "Internal Error")
            } else {
                setTasks(response?.data);
            }
        } catch (error) {
            toast.error("Failed to load tasks");
        }
    };

    return (
        <section className="w-full min-h-screen p-4 sm:p-8 bg-gray-100">
            <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">All Published Tasks</h1>

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
                        <p className="text-gray-600">
                            Created At: {new Date(task?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            Updated At: {new Date(task?.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    )
}
