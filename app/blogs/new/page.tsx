"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useRouter } from "next/navigation";
import { useNotification } from "../../components/NotificationContext";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    title: "",
    author: "",
    url: "",
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Create a new blog</h2>
      <form action={formAction} className="space-y-4">

        <div className="flex items-center">
          <label className="w-24">
            Title
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={state.title}
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        <div className="flex items-center">
          <label className="w-24">
            Author
            <input
              id="author"
              name="author"
              type="text"
              defaultValue={state.author}
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        <div className="flex items-center">
          <label className="w-24">
            URL
            <input
              id="url"
              name="url"
              type="text"
              defaultValue={state.url}
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        <button
          type="submit"
          data-testid="create-blog-button"
          className="border rounded bg-blue-700 px-5 py-2 text-white hover:bg-blue-900"
        >Create</button>
        {state.error && <p className="border-red-600 rounded px-3 py-2 bg-red-200" style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewBlog;
