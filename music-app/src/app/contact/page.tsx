'use client';
import React from 'react';

const Page = () => {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
        <form className="bg-black p-6 rounded shadow-md border border-white">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full p-2 border border-white rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full p-2 border border-white rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">Message</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Write your message here"
              className="w-full p-2 border border-white rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white font-semibold rounded bg-gray-800 hover:bg-gray-600 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
