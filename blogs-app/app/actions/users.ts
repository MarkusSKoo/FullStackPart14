"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createToken } from "../services/users";
import { createUser } from "../services/users";

export type RegisterState = {
  errors?: {
    username?: string;
    userexists?: string;
    password?: string;
    passwordConfirmation?: string;
  };
  username?: string;
  name?: string;
  success: boolean;
};

export const registerUser = async (
  prevstate: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  const errors: RegisterState["errors"] = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 charachters long";
  }
  if (password.length < 4) {
    errors.password = "Password must be at least 4 charachters long";
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation =
      "Password and password combination must be a match";
  }

  const userAlreadyExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (userAlreadyExists) {
    errors.userexists = "Username already exists";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      success: false,
      username,
      name,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser(username, name, passwordHash);

  revalidatePath("/users");
  return { errors: {}, success: true };
};

export const createTokenForUser = async () => {
  const session = await auth();
  
  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }

  const token = crypto.randomUUID()
  await createToken(session.user.email, token)
  revalidatePath("/me")
}
