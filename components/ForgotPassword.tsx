import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { sendResetEmailLink } from "../pages/api/auth";

interface IProps {
  setForgotPass: () => void;
}

const ForgotPassword = ({ setForgotPass }: IProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  interface IValue {
    email: string;
  }

  const validate = (value: { email: string }): object => {
    const errors: any = {};

    if (!value.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const handleSubmit = (value: IValue, actions: FormikHelpers<IValue>) => {
    sendResetEmailLink(value.email);
    setShowMessage(true);
  };

  return (
    <>
      {!showMessage ? (
        <div className="grid grid-cols-1 gap-10 ml-16 md:ml-8 sm:ml-6">
          <p className="text-purple-600 text-opacity-100 text-3xl font-medium">
            Reset Password
          </p>
          <Formik
            initialValues={{
              email: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ errors, values }) => (
              <Form>
                <label htmlFor="email" className="block">
                  <span className="text-1xl text-black font-medium">
                    Request an email reset link
                  </span>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    value={values.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <span className="inline-block mt-1 font-small text-pink-500">
                      {errors.email}
                    </span>
                  )}
                </label>
                <button
                  type="submit"
                  className="btn bg-purple-500 active:bg-purple-700 focus:outline-none text-white font-normal mt-6 px-4 py-2 rounded-md"
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 ml-16 md:ml-8 sm:ml-6">
          <p className="text-purple-600 text-opacity-100 text-3xl font-medium">
            Password Updated
          </p>
          <p className="text-left text-gray-500">
            Will send you password reset link to your email,
            <br />
            if your email exist in our records.
          </p>
          <div className="flex items-start">
            <button
              onClick={setForgotPass}
              type="submit"
              className="btn bg-purple-500 active:bg-purple-700 focus:outline-none text-white font-normal px-4 py-2 rounded-md"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
