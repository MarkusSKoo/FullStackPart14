import { db } from "../../db";
import { readingLists } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const isBlogInReadingList = async(userId: number, blogId: number) => {
  return db.query.readingLists.findFirst({
    where: (readingLists, { and, eq }) =>
      and(
        eq(readingLists.userId, userId),
        eq(readingLists.blogId, blogId)
      ),
  });
};

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingLists).values({ userId, blogId })
}

export const markBlogAsRead = async (userId: number, blogId: number) => {
  await db
    .update(readingLists)
    .set({ read: true })
    .where(
      and(
        eq(readingLists.userId, userId),
        eq(readingLists.blogId, blogId),
        eq(readingLists.read, false)
      )
    );
};