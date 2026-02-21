import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = Yup.object({
    emailid: Yup.string()
      .email("Invalid email format")
      .required("User ID is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setErrorMsg(null);
        localStorage.setItem("token", response.data.token);
        navigate("/blogs");
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (err) {
      setErrorMsg("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="bg-zinc-900 h-screen w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center rounded-md px-10 py-10 bg-zinc-800">
          <h4 className="text-2xl mb-5 text-white">Login</h4>

          <Formik
            initialValues={{ emailid: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-3">
                  <Field
                    type="email"
                    name="emailid"
                    placeholder="User ID"
                    className="w-full bg-zinc-100 px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="emailid"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-zinc-100 px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-5 rounded-full py-3 mt-2 bg-blue-500 text-white"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}

          <p className="text-white mt-5">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
