"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      showNotification("Invalid username or password", "error");
    } else {
      showNotification("Login succesful");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold underline mb-8">login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex items-center">
          <label className="w-24" htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              name="username"
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

        <button
          type="submit"
          className="border rounded bg-blue-700 px-5 py-2 text-white hover:bg-blue-900"
          data-testid="login-button"
        >Login</button>
      </form>
    </div>
  );
}
