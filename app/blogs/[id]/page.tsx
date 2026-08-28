import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addBlogLike } from "../../actions/blogs";
import { addBlogToReadingList } from "@/app/actions/readingListActions";
import { getCurrentUser } from "@/app/services/session";
import { isBlogInReadingList } from "@/app/services/readingLists";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const alreadyInReadingList = user
    ? await isBlogInReadingList(user.id, blog.id)
    : null

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="blog-detail">
      <h2 className="text-2xl font-bold mb-4" data-testid="blog-title">{blog.title}</h2>
      <div className="border rounded border-blue-300 p-3">
        <p className="ml-2 text-purple-600" data-testid="blog-author">Author: {blog.author}</p>
        <p className="ml-2 text-amber-600">Url: {blog.url}</p>
        <p className="ml-2 text-amber-700">Likes: {blog.likes}</p>
        <form action={addBlogLike} className="py-2">
          <input type="hidden" name="id" value={blog.id} />
          <button className="border border-white rounded bg-blue-700 px-5 py-2 hover:bg-blue-900" type="submit">Like</button>
        </form>
        {user && blog.userId !== user.id && !alreadyInReadingList && (
        <form action={addBlogToReadingList} className="py-2">
          <input type="hidden" name="blogId" value={blog.id} />
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            data-testid="add-to-reading-list-button"
            className="border border-white rounded bg-green-700 px-5 py-2 hover:bg-green-900">
              Add to reading list
          </button>
        </form>)}
      </div>
    </div>
  );
};

export default BlogPage;
