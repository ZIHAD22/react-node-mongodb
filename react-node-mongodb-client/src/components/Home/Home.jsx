import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserLoad from "../../hooks/useUserLoad";

const Home = () => {
  const [users, setUsers] = useUserLoad("http://localhost:5000/user", []);

  // handle delete user
  const handleDeleteUser = (id) => {
    const isDeleted = window.confirm("are you sure to delete this user");
    if (isDeleted) {
      axios.delete(`http://localhost:5000/user/${id}`).then((res) => {
        const { data } = res;
        if (data.deletedCount) {
          const remaining = users.filter((user) => user.id !== id);
          setUsers(remaining);
          toast.success("User Deleted");
        }
      });
    }
  };

  if (users.length === 0) {
    return (
      <p className="text-center text-red-600 text-4xl mt-10">No User Found</p>
    );
  }
  return (
    <div>
      <h1 className="text-3xl text-center">Available User ({users?.length})</h1>
      <ul className="text-center mt-10">
        {users.map((user) => (
          <li key={user._id} className="p-2">
            {user.name}:: {user.email}
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="bg-slate-600 text-white px-8 py-1 rounded-md mx-2"
            >
              X
            </button>
            <Link
              to={`update/${user._id}`}
              className="bg-slate-600 text-white px-8 py-2 rounded-md mx-2"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
