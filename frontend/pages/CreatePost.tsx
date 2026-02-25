import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'

type Post = { id?: number; title: string; description: string; imageUrl?: string; author?: string; date?: string };

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();

  async function submit(e: any) {
    e.preventDefault()
    const currentDate = new Date().toLocaleDateString();
    const newData =
    {
        author: author,
        date: currentDate,
        title: title,
        description: description,
        imageUrl: imageUrl
    };
    await createPost(newData)
    setTitle('')
    setDescription('');
    setAuthor('');
    setImageUrl('');
    await router.push('/');
  }

    async function createPost(data: Post) {
        const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        const res = await fetch(`${api}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        })
        return res.json()
    }

  return (
    <div>
        <Navbar />
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-20">
            <form onSubmit={submit} className="mb-6 space-y-3">
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) =>setImageUrl(e.target.value)}
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
                    Create Post
                </button>
            </form>
        </div>
    </div>
  )
}