import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    emailid: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/blogs");
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (err) {
      setErrorMsg("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="bg-zinc-900 h-screen w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center rounded-md px-10 py-10 bg-zinc-800">
          <h4 className="text-2xl mb-5 text-white">Register</h4>

          <Formik
            initialValues={{ fullname: "", emailid: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-3">
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="w-full bg-zinc-100 px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

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
                  {isSubmitting ? "Creating Account..." : "Create My Account"}
                </button>
              </Form>
            )}
          </Formik>

          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}

          <p className="text-white mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
