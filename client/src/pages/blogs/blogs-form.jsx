import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiCloseCircleLine } from "@remixicon/react";

const BlogForm = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    blog_title: "",
    blog_description: "",
  });
  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, []);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/blogs/${blogId}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.success) {
        const data = response.data.blog;
        setInitialValues(data);
        setPreview(data.blog_image);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validationSchema = Yup.object({
    blog_title: Yup.string().required("Title is required"),
    blog_description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!preview) {
      setImageError(true);
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("blog_title", values.blog_title);
    formData.append("blog_description", values.blog_description);
    if (selectedFile) formData.append("file", selectedFile);
    if (blogId) formData.append("blogId", blogId);

    try {
      const response = await axios.post(
        `http://localhost:8080/blogs/${blogId ? "edit-blog" : "add-blog"}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="bg-zinc-800 p-5 w-full max-w-[800px] mx-auto flex gap-3 flex-col rounded-lg text-white">
          <div className="flex justify-between">
            <div className="font-lg font-bold">
              {blogId ? "Update blog" : "Add New blog"}
            </div>
            <RiCloseCircleLine
              size={26}
              color="white"
              onClick={() => navigate("/my-blogs")}
              className="cursor-pointer"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="m-auto max-h-48 border-2 border-gray-400"
            />
          )}

          <input
            type="file"
            id="file"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && ["image/jpeg", "image/png"].includes(file.type)) {
                setFieldValue("file", file);
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
                setImageError(false);
              } else {
                alert("Please select a valid image (JPEG, PNG)");
              }
            }}
          />
          <div
            className="rounded-md m-auto py-2 px-3 bg-purple-600 cursor-pointer"
            onClick={() => document.getElementById("file").click()}
          >
            Browse Image
          </div>
          {imageError && (
            <p className="text-red-500 text-center">Image is required!</p>
          )}

          <Field
            name="blog_title"
            className="bg-zinc-700 rounded-md py-2 px-3"
            placeholder="Enter Title"
          />
          <ErrorMessage
            name="blog_title"
            component="div"
            className="text-red-500"
          />

          <Field
            as="textarea"
            name="blog_description"
            className="bg-zinc-700 rounded-md py-2 px-3 h-full"
            placeholder="Enter Description..."
          />
          <ErrorMessage
            name="blog_description"
            component="div"
            className="text-red-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md py-2 px-3 bg-green-600 m-auto"
          >
            {isSubmitting ? "Submitting..." : blogId ? "Update" : "Add new"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;
