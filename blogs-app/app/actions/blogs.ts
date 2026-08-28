"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addBlog } from "../services/blogs";
import { likeBlog } from "../services/blogs";

export const createBlog = async (prevstate: any, formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (
    !title ||
    title.length < 5 ||
    !author ||
    author.length < 5 ||
    !url ||
    url.length < 5
  ) {
    return {
      error: "Title, author and url must be at least 5 charachters long",
      success: false,
      title,
      author,
      url,
    };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { error: "", success: true };
};

export const addBlogLike = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));

  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
