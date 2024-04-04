import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Image from "../assets/images/not-found.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  // const [getToken, setGetToken] = useState(null)
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_DOMAIN}/login`,
        data,
        {
          withCredentials: true,
        },
      );

      const token = res.data.accessToken;
      const user = jwtDecode(token);
      const allowedUserIDs = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 23,
      ];

      if (allowedUserIDs.includes(user.userid)) {
        const loginTime = new Date().getTime();
        sessionStorage.setItem("login_time", loginTime);
        sessionStorage.setItem("access_token", token);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("name", user.name);
        localStorage.setItem("access_token", token);

        toast.success("Login Berhasil");
        navigate("/dashboard");
      } else {
        toast.error("Gagal Login !");
      }
    } catch (error) {
      setIsLoginError(true);
      console.log(error);
    }
  };

  const getToken = localStorage.getItem("access_token");
  console.log(getToken);

  useEffect(() => {
    if (getToken) {
      navigate(-1);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter an email address"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-slate-400 p-6">
        <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-white p-10 shadow-md sm:w-auto">
          <div className="absolute top-0 w-full bg-cyan-600 py-5 text-center text-3xl font-bold text-white">
            Login Page
          </div>
          <div className="mt-28 w-full">
            <div className="mb-5 flex items-center gap-2 whitespace-nowrap text-cyan-600">
              <div className="h-0.5 w-full bg-cyan-600"></div>
              <h1 className="text-xl font-semibold">Silahkan Login</h1>
              <div className="h-0.5 w-full bg-cyan-600"></div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 w-full">
                <div className="relative">
                  <input
                    className={`peer block h-14 w-full rounded border border-gray-400 p-4 placeholder-transparent focus:outline-[#74777F] sm:w-[400px] ${
                      formik.errors.email &&
                      formik.touched.email &&
                      "border-red-500 focus:outline-red-500"
                    }`}
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <label
                    htmlFor="email"
                    className={`absolute -top-3 left-3 bg-white px-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-slate-600  ${
                      formik.errors.email &&
                      formik.touched.email &&
                      "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    }`}
                  >
                    Email
                  </label>
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-1 text-red-500 max-[640px]:text-sm">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <div className="relative">
                  <input
                    className={`peer block h-14 w-full rounded border border-gray-400 p-4 pr-10 placeholder-transparent focus:outline-[#74777F] sm:w-[400px] ${
                      formik.errors.password &&
                      formik.touched.password &&
                      "border-red-500 focus:outline-red-500"
                    }`}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4.11023C14.79 4.11023 18.17 6.24023 19.82 9.61023C19.23 10.8302 18.4 11.8802 17.41 12.7302L18.82 14.1402C20.21 12.9102 21.31 11.3702 22 9.61023C20.27 5.22023 16 2.11023 11 2.11023C9.73 2.11023 8.51 2.31023 7.36 2.68023L9.01 4.33023C9.66 4.20023 10.32 4.11023 11 4.11023ZM9.93 5.25023L12 7.32023C12.57 7.57023 13.03 8.03023 13.28 8.60023L15.35 10.6702C15.43 10.3302 15.49 9.97023 15.49 9.60023C15.5 7.12023 13.48 5.11023 11 5.11023C10.63 5.11023 10.28 5.16023 9.93 5.25023ZM1.01 1.98023L3.69 4.66023C2.06 5.94023 0.77 7.64023 0 9.61023C1.73 14.0002 6 17.1102 11 17.1102C12.52 17.1102 13.98 16.8202 15.32 16.2902L18.74 19.7102L20.15 18.3002L2.42 0.560226L1.01 1.98023ZM8.51 9.48023L11.12 12.0902C11.08 12.1002 11.04 12.1102 11 12.1102C9.62 12.1102 8.5 10.9902 8.5 9.61023C8.5 9.56023 8.51 9.53023 8.51 9.48023ZM5.11 6.08023L6.86 7.83023C6.63 8.38023 6.5 8.98023 6.5 9.61023C6.5 12.0902 8.52 14.1102 11 14.1102C11.63 14.1102 12.23 13.9802 12.77 13.7502L13.75 14.7302C12.87 14.9702 11.95 15.1102 11 15.1102C7.21 15.1102 3.83 12.9802 2.18 9.61023C2.88 8.18023 3.9 7.00023 5.11 6.08023Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <label
                    htmlFor="password"
                    className={`absolute -top-3 left-3 bg-white px-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-slate-600  ${
                      formik.errors.password &&
                      formik.touched.password &&
                      "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    }`}
                  >
                    Password
                  </label>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 text-red-500 max-[640px]:text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-8 h-12 w-full rounded-full bg-cyan-600 font-semibold text-white hover:bg-cyan-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {isLoginError && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden bg-black/[.15] backdrop-blur-[2px]">
          <div className={`w-[450px] rounded-3xl bg-white px-4 py-6`}>
            <div className="mx-auto mb-4 w-full">
              <img src={Image} alt="Modal Image" className="mx-auto h-32" />
            </div>

            <p className="font-face-ro mb-4 px-8 text-center">
              <span className="mb-1 block text-2xl font-bold text-red-600">
                Login Gagal
              </span>
              Silahkan cek kembali Email dan password yang kamu masukan
            </p>
            <button
              onClick={() => setIsLoginError(false)}
              className="font-face-ro w-full rounded-full bg-red-600 p-[15px] text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
