"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addBlog } from "../services/blogs";
import { likeBlog } from "../services/blogs";

export const createBlog = async (
  prevstate: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 charachters long" };
  }

  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 charachters long" };
  }

  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    return { error: "Url must be at least 5 charachters long" };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
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
