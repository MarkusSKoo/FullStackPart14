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
    <div>
      <form action="/blogs">
        <h2>Search blogs</h2>
        <label>
          Search word
          <input type="text" name="filter" />
        </label>
        <button type="submit">Search</button>
      </form>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>Title: {blog.title}</Link>
            <p>Author: {blog.author}</p>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;
