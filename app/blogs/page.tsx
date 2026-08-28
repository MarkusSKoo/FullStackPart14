import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs(filter);
  const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form action="/blogs">
        <h2 className="text-2xl font-bold mb-4">Search blogs</h2>
        <label className="mb-4 p-6 mr-2">
          Search word
          <input
            type="text" name="filter"
            className="p-6 border border-gray-400 rounded px-3 py-2 bg-white text-black mr-2"
            data-testid="filter-input"
          />

          <button
            type="submit"
            data-testid="search-button"
            className="border border-blue-700 rounded px-5 py-2 hover:bg-blue-600"
          >
            Search
          </button>
        </label>
      </form>

      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <ul className="space-y-2" data-testid="blogs-list">
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-grey-50">

            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline">
                Title: {blog.title}
            </Link>

            <p className="ml-2 text-purple-600">Author: {blog.author}</p>
            <p className="ml-2 text-amber-700">Url: {blog.url}</p>
            <p className="ml-2 text-amber-700">Likes: {blog.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;
