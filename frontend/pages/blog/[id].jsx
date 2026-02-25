import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function BlogDetails() {
  const [blogDetail, setBlogDetail] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${api}/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => setBlogDetail(data))
      .catch(() => setBlogDetail(null));
  }, [id]);

  if (!blogDetail) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto mt-28 p-6 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white p-6 mt-20">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {blogDetail.imageUrl ? (
            <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden">
              <img
                src={blogDetail.imageUrl}
                alt={blogDetail.title || 'Blog image'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-32 sm:h-40 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{blogDetail.title}</h1>
              <Link href="/" className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Back
              </Link>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">By {blogDetail.author || 'Unknown'}</span>
                <span className="text-gray-400">{blogDetail.date}</span>
              </div>
            </div>

            <div className="mt-6 prose prose-sm sm:prose-base max-w-none text-gray-700">
              <p>{blogDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}