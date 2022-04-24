import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUserLoad from "../../hooks/useUserLoad";

const UpdateUser = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/user/${id}`;
  const [user, setUser] = useUserLoad(url, {});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
  }, [user.name, user.email]);

  // handle form
  const handleUpdateUsersSubmit = ({ name, email }) => {
    axios
      .put(`http://localhost:5000/user/${id}`, { name, email })
      .then((res) => {
        res.status === 200 && toast.success("User Updated");
        navigate("/");
        reset();
      })
      .catch((e) => e.message && toast.error(e.message));
    console.log(name, email);
  };
  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
        <h1 className="text-xl text-center">Add User</h1>
        <form onSubmit={handleSubmit(handleUpdateUsersSubmit)}>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputName1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              {...register("name", { required: "This is a required" })}
              id="exampleInputName1"
              placeholder="User Name"
            />
            <small
              id="emailHelp"
              className="block text-red-700 mt-1 text-xs text-gray-600"
            >
              {errors?.name?.message && errors?.name?.message}
            </small>
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              User Email
            </label>
            <input
              type="email"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              {...register("email", { required: "This is a required" })}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small
              id="emailHelp"
              className="block text-red-700 mt-1 text-xs text-gray-600"
            >
              {errors?.email?.message && errors?.email?.message}
            </small>
          </div>

          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      mx-auto
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
