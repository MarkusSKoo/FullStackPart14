import { eq, desc } from "drizzle-orm";
import { db } from "../../db";
import { users, blogs } from "../../db/schema";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: {
        orderBy: desc(blogs.likes),
      },
    },
  });
};

export const getUser = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
};

export const getUserWithReadingLists = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      readingList: {
        with: {
          blog: true
        }
      }
    }
  });
};

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      token: false
    },
    with: {
      blogs: {
        orderBy: desc(blogs.likes),
      },
    },
  });
};

export const createToken = async (username: string, token: string) => {
  await db
    .update(users)
    .set({ token: token })
    .where(eq(users.username, username));
}

export const createUser = async (username: string, name: string, passwordHash: string) => {
  await db.insert(users).values({ username, name, passwordHash });
}
