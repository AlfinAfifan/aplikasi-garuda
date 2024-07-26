import React, { useEffect, useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Image from "../assets/images/not-found.jpg";
import Logo from "../../public/vite.svg";
import { login } from "../redux/actions/auth/loginThunk";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoginPage = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((i) => i.login.loading);

  const handleLogin = async (data) => {
    dispatch(login(data)).then((result) => {
      const token = result.payload.accessToken;
      if (token) {
        const decodedToken = jwtDecode(token);
        const user = {
          userid: decodedToken.userid,
          email: decodedToken.email,
          name: decodedToken.name,
          id_lembaga: decodedToken.idLembaga,
          role: decodedToken.role,
          access_token: token,
        };
        toast.success("Login Berhasil");
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setIsLoginError(true);
        toast.error("Gagal Login !");
      }
    });
  };

  const getUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (getUser?.access_token) {
      navigate("/dashboard");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter an email address"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <>
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center p-6"
        style={{ backgroundImage: "url(../src/assets/images/pramuka.svg)" }}
      >
        <div className="flex w-[450px] flex-col items-center justify-center gap-5 rounded-xl bg-white bg-opacity-75 p-10 font-montserrat shadow-xl backdrop-blur">
          <img src={Logo} alt="" className="w-44" />
          <div className="text-center text-3xl font-bold text-second">
            Login Garuda
          </div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <div className="mb-4 w-full">
                    <div className="flex flex-col">
                      <label className={`font-semibold`} htmlFor="email">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full rounded-md border border-black bg-transparent px-3 py-2 ${errors.email && touched.email ? "border-red-500 focus:outline-red-500" : ""}`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <div className="flex flex-col">
                      <label
                        className="text-base font-semibold"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className={`w-full rounded-md border border-black bg-transparent px-3 py-2 ${errors.password && touched.password ? "border-red-500 focus:outline-red-500" : ""}`}
                      />
                      {errors.password && touched.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`mt-5 h-12 w-full rounded-lg bg-second font-semibold text-white hover:bg-third ${loading ? "bg-third opacity-80" : ""}`}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <ScaleLoader
                        height={25}
                        width={3}
                        radius={10}
                        margin={3}
                        color="white"
                        speedMultiplier={1}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
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
              className="font-face-ro h-12 w-full rounded-lg bg-red-600 font-semibold text-white hover:bg-red-700"
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
