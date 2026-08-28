"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserWithReadingLists } from "../services/users";
import { createTokenForUser } from "../actions/users";
import { markAsRead } from "../actions/readingListActions";
import { readingLists } from "@/db/schema";

export default async function Me() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }

  const user = await getUserWithReadingLists(session.user.email)
  if (!user) {
    return <div>Cannot find user, log in and try again</div>
  }

  const read = user.readingList.filter(item => item.read)
  const unread = user.readingList.filter(item => !item.read)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4" data-testid="user-profile">
      <h2 className="text-2xl font-bold">My profile</h2>
      <p data-testid="user-name"><strong>Name: </strong>{user.name}</p>
      <p data-testid="user-username"><strong>Username: </strong>{session.user.email}</p>
      <hr />
      <h2 className="text-2xl font-bold">API Token</h2>

      {user.token && (
        <div data-testid="token-display">
          <p className="font-bold">Current token:</p>
          <p data-testid="api-token">{user.token}</p>
          <form action={createTokenForUser}>
            <button
              type="submit"
              data-testid="generate-token-button"
              className="border rounded bg-green-700 px-3 py-2 text-white hover:bg-green-900"
            >Create new token</button>
          </form>
        </div>
      )}

      {!user.token && (
        <div data-testid="api-token-section">
          <p data-testid="no-token-message">No token found, create new:</p>
          <form action={createTokenForUser}>
            <button
              type="submit"
              data-testid="generate-token-button"
              className="border rounded bg-green-700 px-3 py-2 text-white hover:bg-green-900"
            >Create token</button>
          </form>
        </div>
      )}

      <hr />
      <div>
        <h2 className="text-2xl font-bold" data-testid="reading-list-section">Reading lists</h2>

        {user.readingList.length === 0 && <p data-testid="empty-reading-list">Reading list is empty</p>}

        <h3 className="text-1xl font-bold p-3">Unread ({unread?.length})</h3>
        {unread.length === 0 && <p data-testid="no-unread-blogs">No undread blogs</p>}

        <ul className="max-w-2xl mx-auto space-y-2 p-6" data-testid="unread-section">
            {unread?.map(item =>
            <li
              key={item.id}
              className="border rounded p-3 flex items-center justify-between bg-orange-900"
            >
              <span>{item.blog.title}</span>
              <form action={markAsRead}>
                  <input type="hidden" name="blogId" value={item.blog.id} />
                  <input type="hidden" name="userId" value={user.id} />
                  <button
                    data-testid={`mark-read-${item.blog.id}`}
                    type="submit"
                    className="border rounded bg-green-700 px-3 py-2 text-white hover:bg-green-900"
                  >mark as read
                  </button>
              </form>
            </li>)}
        </ul>

        <h3 className="text-1xl font-bold p-3">Read ({read?.length})</h3>
        <ul className="max-w-2xl mx-auto space-y-2 p-6">
            {read?.map(item =>
            <li
              key={item.id}
              className="border rounded p-3 flex items-center justify-between bg-green-900"
            >{item.blog.title}</li>)}
        </ul>
      </div>
    </div>
  );
}