import React, { useState, useEffect } from "react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Mock Blogs Data
  useEffect(() => {
    const mockBlogs = [
      {
        id: 1,
        title: "Top Study Techniques for Students",
        author: "John Doe",
        date: "2024-12-20",
        description:
          "Discover effective study techniques to boost your learning and productivity.",
        image: "./assets/7tip.png",
      },
      {
        id: 2,
        title: "How to Balance Academics and Extracurriculars",
        author: "Jane Smith",
        date: "2024-12-18",
        description:
          "Learn how to maintain a healthy balance between academics and extracurricular activities.",
        image: "./assets/clock.png",
      },
      {
        id: 3,
        title: "The Benefits of Time Management for Students",
        author: "Michael Brown",
        date: "2024-12-15",
        description:
          "Master the art of time management to excel in academics and beyond.",
        image: "./assets/iimage.png",
      },
      {
        id: 4,
        title: "How to Prepare for Exams Effectively",
        author: "Emily Davis",
        date: "2024-12-10",
        description:
          "Get tips on how to prepare for exams without stress and maximize your results.",
        image: "./assets/exam.png",
      },
    ];

    setBlogs(mockBlogs);
    setFilteredBlogs(mockBlogs);
  }, []);

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset pagination after search
  };

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Student Blog Page
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 rounded-lg border-2 border-red-500 shadow-sm focus:outline-none w-full md:w-1/3"
        />
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border-2 border-gray-300 hover:border-red-500"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover border-b-2 border-red-500"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-red-500 transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                By {blog.author} on {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <a
                href={`/blog/${blog.id}`}
                className="inline-block text-red-500 hover:underline hover:text-red-700 transition-colors duration-300"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors duration-300 ${
                currentPage === index + 1
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-red-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
