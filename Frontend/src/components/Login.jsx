import { useContext, useState, useEffect } from "react";
import { MyContaxt } from "../MyContaxt";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    register,
    setRegister,
    theme,
    fetchUser,
    user,
    getAllThread,
    createNewChat,
  } = useContext(MyContaxt);
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = register ? "/api/register" : "/api/login";

      const response = await api.post(endpoint, formData);

        console.log(response.data);

      // After success  fetch user profile
      await fetchUser();
      await createNewChat();
      await getAllThread();
      navigate("/");
    } catch (err) {
      console.error(err?.response?.data?.message || "Auth failed");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-5">
        {/* change login, register button  */}
        <div className="mb-5">
          Click here to{" "}
          {register ? (
            <button
              onClick={() => setRegister(false)}
              className="cursor-pointer hover:text-shadow-purple-600 hover:text-shadow-lg font-bold"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setRegister(true)}
              className="cursor-pointer hover:text-shadow-purple-600 hover:text-shadow-lg font-bold"
            >
              Signup
            </button>
          )}
          &nbsp;
          <i className="fa-solid fa-arrow-right-long"></i>{" "}
        </div>
        {/* form */}
        <form
          action=""
          className="flex min-h-[550px] w-[500px] p-12 rounded-2xl flex-col justify-center gap-5 bg-[rgba(255,255,255,0.03)] backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.7)]"
        >
          <h1 className="text-5xl font-bold text-center mb-4">
          {register ? "Sign Up" : "Login"}
          </h1>
          <div className="flex items-center justify-between gap-5">
            <label htmlFor="email" className={`font-bold text-xl`}>
              Email
            </label>
            <input
              type="email"
              className={`w-[260px] py-3 px-4 rounded-xl border border-gray-500 bg-transparent focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 ${theme ? "placeholder:text-gray-300" : "placeholder:text-black/60"}`}
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {register ? (
            <div className="flex items-center justify-between gap-5">
              <label htmlFor="name" className={`font-bold text-xl`}>
                Name
              </label>
              <input
                type="text"
                className={`w-[260px] py-3 px-4 rounded-xl border border-gray-500 bg-transparent focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 ${theme ? "placeholder:text-gray-300" : "placeholder:text-black/60"}`}
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex items-center justify-between gap-5">
            <label htmlFor="password" className={`font-bold text-xl`}>
              Password
            </label>
            <input
              type="password"
              className={`w-[260px] py-3 px-4 rounded-xl border border-gray-500 bg-transparent focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 ${theme ? "placeholder:text-gray-300" : "placeholder:text-black/60"}`}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="text-right text-sm cursor-pointer hover:text-purple-400 transition-all duration-300">
            Forgot Password?
          </div>
          {/* Button section  */}
          <div className="flex gap-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
            >
          {register ? "Sign Up" : "Login"}
             </button>
          </div>
          <div className="flex flex-col items-center gap-5 mt-5">
              <p className="text-gray-400">
             Or {register ? "Sign Up" : "Login"} Using
            </p>

           <div className="flex gap-5 text-2xl">
            <i className="fa-brands fa-facebook cursor-pointer hover:text-blue-500"></i>

            <i className="fa-brands fa-twitter cursor-pointer hover:text-sky-400"></i>

            <i className="fa-brands fa-google cursor-pointer hover:text-red-500"></i>
          </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
