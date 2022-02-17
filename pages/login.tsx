import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { withRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import { notification } from "antd";
import { useRouter } from "next/router";

import {
  LoginParamsType,
  loginApi,
  getPk,
  exchangeMagicToken,
} from "./api/auth";
import ForgotPassword from "../components/ForgotPassword";

export type LoginProps = {
  children?: ReactNode;
};

const LoginPage: React.FC<LoginProps> = () => {
  const router = useRouter();
  const useQuery = () => new URLSearchParams(router.pathname);
  let query = useQuery();

  useEffect(() => {
    let token = query.get("token");
    if (token) {
      magicTokenLogin(token);
    }
  });

  const [forgotPass, setForgotPass] = useState<boolean>(false);

  const toggleForgotPass = () => {
    setForgotPass(!forgotPass);
  };

  const magicTokenLogin = async (token: string) => {
    let resp = await exchangeMagicToken(token);
    if (resp?.status && resp?.data) {
      let {
        data: { token, user },
      } = resp;

      localStorage.setItem("access_token", token);

      let key = await getPk(token);
      localStorage.setItem("pk", key.data);

      window.location.href = "/home";
    } else {
      notification.error({
        message: "Unable to login",
        description: "Please make sure you have valid Magic Token",
      });
    }
  };

  const login = async (values: LoginParamsType) => {
    let resp = await loginApi(values);
    if (resp?.status && resp?.data) {
      let {
        data: { token },
      } = resp;

      localStorage.setItem("access_token", token);
      let key = await getPk(token);
      localStorage.setItem("pk", key.data);

      global.window.location.href = "/";
    } else {
      notification.error({
        message: "Unable to login",
        description: "Please make sure you have entered valid credentials",
      });
    }
  };

  function validateEmailLocal(values: LoginParamsType) {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  }

  return (
    <div className={`flex lg:flex-row md:flex-col min-h-screen`}>
      <div
        className={`w-1/2 bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-700`}
      ></div>
      <div className={`w-1/2 p-6"`}>
        <div className={`flex flex-row items-center h-full`}>
          {!forgotPass ? (
            <div className={`grid grid-cols-1 gap-10 ml-16 md:ml-8 sm:ml-6`}>
              <p
                className={`text-purple-600 text-opacity-100 text-3xl font-medium`}
              >
                Login
              </p>
              <div className={`max-w-100`}>
                <div className={`grid grid-cols-1 gap-8`}>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values: LoginParamsType) => {
                      login(values);
                    }}
                    validate={validateEmailLocal}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <label htmlFor="email" className="block">
                          <span className={`text-1xl text-black font-medium`}>
                            Email
                          </span>
                          <Field
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 focus:ring-opacity-50 h-5"`}
                            id="email"
                            name="email"
                            type="text"
                          />
                          {errors.email && touched.email && (
                            <span
                              className={`inline-block mt-1 font-small text-pink-500`}
                            >
                              {errors.email}
                            </span>
                          )}
                        </label>
                        <label htmlFor="password" className={`block`}>
                          <span className={`text-1xl text-black font-medium`}>
                            Password
                          </span>
                          <Field
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 focus:ring-opacity-50`}
                            id="password"
                            name="password"
                            type="text"
                          />
                          {errors.password && touched.password && (
                            <span
                              className={`inline-block mt-1 font-small text-pink-500`}
                            >
                              {errors.password}
                            </span>
                          )}
                        </label>

                        <button
                          type="submit"
                          className={`btn bg-purple-500 active:bg-purple-700 focus:outline-none text-white font-normal mt-6 px-4 py-2 rounded-md`}
                        >
                          Login
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <a
                className={`text-purple-500 font-normal hover:underline`}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  toggleForgotPass();
                }}
              >
                Forgot Password?
              </a>
            </div>
          ) : (
            <ForgotPassword setForgotPass={toggleForgotPass} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
