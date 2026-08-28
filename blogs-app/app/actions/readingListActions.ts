"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addToReadingList, markBlogAsRead } from "../services/readingLists";

export const addBlogToReadingList = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  const userId = Number(formData.get("userId"));

  await addToReadingList(userId, blogId)
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
};

export const markAsRead = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  const userId = Number(formData.get("userId"));

  await markBlogAsRead(userId, blogId)
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}