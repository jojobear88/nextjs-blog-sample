import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-gray-900/75 text-white fixed top-0 w-full backdrop-blur z-50">
            <nav className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <Link href="/" className="text-white font-bold text-lg">NextJS Blogs</Link>

                    <div className="hidden sm:flex sm:items-center space-x-4">
                        <Link href="/" className="text-white hover:text-gray-200">Home</Link>
                        <Link href="/CreatePost" className="text-white hover:text-gray-200">Create new Blog</Link>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="sm:hidden p-2 rounded-md hover:bg-white/10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                {open && (
                    <div id="mobile-menu" className="sm:hidden pb-4">
                        <Link href="/" className="block py-2 text-white">Home</Link>
                        <Link href="/CreatePost" className="block py-2 text-white">Create new Blog</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}