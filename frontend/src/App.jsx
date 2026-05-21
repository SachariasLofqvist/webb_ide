import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [array, setArray] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080");
    setArray(response.data.blogPost);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 ">My Blog</h1>

      <ul className="flex flex-col gap-4">
        {array.map((blog, index) => (
          <li key={index} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-500">{blog.post}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
