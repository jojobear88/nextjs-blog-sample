import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostList() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
                const r = await fetch(`${api}/api/posts`);
                const data = await r.json();
                setPosts(data);
            } catch {
                setPosts([]);
            }
        })();
    }, [])

    if (posts === null) return <div className="text-gray-500">Loading...</div>
    if (posts.length === 0) return <div className="text-gray-500">No posts yet.</div>

    let filteredData = posts;
    if (searchQuery.trim() !== '') {
        filteredData = posts.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto mt-20 px-4">
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        filteredData.map((item) => (
                            <div key={item.id} className="h-full">
                                <div className="bg-white rounded shadow overflow-hidden flex flex-col h-full">
                                    <img src={item.imageUrl}
                                        className="w-full h-48 object-cover"
                                        alt="Blog" />
                                    <div className="p-4 flex flex-col flex-1">
                                        <h5 className="font-semibold mb-2">
                                            {item.title}
                                        </h5>
                                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <div>
                                                <p className="m-0">posted by {item.author}</p>
                                                <small>{item.date}</small>
                                            </div>
                                        </div>
                                        <Link href={`/blog/${item.id}`} className='inline-block bg-blue-600 text-white px-3 py-1 rounded mt-auto'>Read more</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}