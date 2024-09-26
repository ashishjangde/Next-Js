//"use client";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from 'next/image'; // Next.js optimized Image component


const content = [
    {
      title: "Group Lessons",
      description:
        "Learn together in a dynamic group setting with fellow musicians. Share knowledge, collaborate on musical pieces, and enhance your learning experience with real-time feedback from peers and instructors.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Group Lessons
        </div>
      ),
    },
    {
      title: "Real-time Practice Feedback",
      description:
        "Improve your skills with real-time feedback during practice sessions. Our platform allows you to track your progress, make adjustments instantly, and ensure you're always on the right note.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="https://cdn.pixabay.com/photo/2015/07/13/02/52/girl-842719_1280.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="real-time feedback"
          />
        </div>
      ),
    },
    {
      title: "Music Theory Exercises",
      description:
        "Stay in tune with music theory by practicing through interactive exercises. Our platform offers real-time updates, allowing you to keep track of your progress without stress, and maintain a seamless flow in your music education.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Music Theory Exercises
        </div>
      ),
    },
    {
      title: "Performance Preparation",
      description:
        "Prepare for live performances with structured guidance. Stay aligned with your music coach, receive instant updates on your practice sessions, and perform with confidence, knowing you’re always on the right path.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Performance Preparation
        </div>
      ),
    },
  ];
  
const WhyChooseUs = () => {
  return (
    <div>
        <StickyScroll content={content} />
    </div>
  )
}

export default WhyChooseUs