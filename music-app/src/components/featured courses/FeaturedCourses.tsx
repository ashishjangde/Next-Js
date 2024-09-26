"use client";
import courseData from "../../data/music_course.json";
import Link from "next/link";
import { Button } from "../ui/moving-border";
import { BackgroundGradient } from "../ui/background-gradient";

interface CourseTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
}

const FeaturedCourses = () => {
  const featuredCourses = courseData.courses.filter((course: CourseTypes) => course.isFeatured === true);

  return (
    <div className="py-16 bg-black text-white">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">FEATURED COURSES</h2>
        <p className="text-lg font-light text-gray-400">Learn With The Best Instructors</p>
      </div>

      {/* Featured Courses Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {featuredCourses.map((course: CourseTypes) => (
          <div key={course.id} className="relative flex flex-col items-center">
            <BackgroundGradient className="rounded-[22px] p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-lg">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-black dark:text-neutral-200 mb-4">{course.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {course.description}
                </p>

                {/* Course Price */}
                <div className="mt-2 mb-6">
                  <span className="text-lg font-bold text-black dark:text-white">${course.price}</span>
                </div>

                {/* Learn More Button */}
                <Link href={`/courses/${course.slug}`} passHref>
                  <Button className="rounded-full pl-4 pr-4 py-2 text-white bg-black dark:bg-zinc-800 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-600">
                    Learn More
                  </Button>
                </Link>
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>

      {/* View All Courses Button */}
      <div className="text-center mt-12">
        <Link href="/courses" passHref>
          <Button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            View All Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCourses;
