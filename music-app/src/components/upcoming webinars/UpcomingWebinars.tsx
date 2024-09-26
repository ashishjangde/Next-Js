'use client';
import Link from "next/link";
import { Button } from "../ui/moving-border";
import { HoverEffect } from "../ui/card-hover-effect";

export const projects = [
  {
    title: "Mastering the Piano",
    description: "Join us for an interactive session to learn the fundamentals of playing the piano.",
    link: "https://example.com/webinar1",
  },
  {
    title: "Guitar Techniques for Beginners",
    description: "A comprehensive guide for beginners looking to start their guitar journey.",
    link: "https://example.com/webinar2",
  },
  {
    title: "Understanding Music Theory",
    description: "Dive deep into the essentials of music theory and enhance your musical understanding.",
    link: "https://example.com/webinar3",
  },
  {
    title: "Vocal Training Essentials",
    description: "Learn techniques to improve your vocal skills and perform confidently.",
    link: "https://example.com/webinar4",
  },
  {
    title: "Songwriting Workshop",
    description: "Unlock your creativity and learn how to write your own songs.",
    link: "https://example.com/webinar5",
  },
];

const UpcomingWebinars = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-black">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">FEATURED WEBINARS</h2>
        <p className="text-lg font-light text-gray-600 dark:text-gray-300">Enhance Your Musical Journey</p>
      </div>
      <div className="flex justify-center">
        <HoverEffect items={projects} />
      </div>
      <div className="text-center mt-8">
        <Link href="/webinars">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            View Webinars
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UpcomingWebinars;
