"use client";

import { registerUser, RegisterState } from "../actions/users";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/NotificationContext";

export default function RegisterPage() {
  const initialState: RegisterState = {
    errors: {},
    username: "",
    name: "",
    success: false,
  };

  const [state, formAction] = useActionState(
    registerUser,
    initialState
  );
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Registration succesful");
      router.push("/login");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold underline mb-8">Register</h2>
      <form action={formAction} className="space-y-4">

        <div className="flex items-center">
          <label className="w-24" htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={state.username}
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        {state.errors?.username && (
          <p
            style={{ color: "red" }}
            data-testid="username-error"
          >{state.errors.username}</p>
        )}

        {state.errors?.userexists && (
          <p
            style={{ color: "red" }}
            data-testid="username-error"
          >{state.errors.userexists}</p>
        )}

        <div className="flex items-center">
          <label className="w-24" htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={state.name}
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        <div className="flex items-center">
          <label className="w-24" htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              name="password"
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        {state.errors?.password && (
          <p
            style={{ color: "red" }}
            data-testid="username-error"
          >{state.errors.password}</p>
        )}

        <div className="flex items-center">
          <label className="w-24" htmlFor="passwordConfirmation">
            Confirm Password
            <input
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              required
              className="border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
          </label>
        </div>

        <button
          type="submit"
          data-testid="register-button"
          className="border rounded bg-blue-700 px-5 py-2 text-white hover:bg-blue-900"
        >Register</button>

        {state.errors?.passwordConfirmation && (
          <p
            style={{ color: "red" }}
            data-testid="passwordConfirm-error"
          >{state.errors.passwordConfirmation}</p>
        )}
      </form>
    </div>
  );
}
