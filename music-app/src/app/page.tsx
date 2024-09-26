import FeaturedCourses from "@/components/featured courses/FeaturedCourses";
import Instructors from "@/components/instructors/Instructors";
import TestimonialCards from "@/components/testimonial cards/TestimonialCards";
import HeroSection from "@/components/ui/HeroSection";
import UpcomingWebinars from "@/components/upcoming webinars/UpcomingWebinars";
import WhyChooseUs from "@/components/why choose us/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection/>
      <FeaturedCourses/>
      <WhyChooseUs/>
      <TestimonialCards/>
      <UpcomingWebinars/>
      <Instructors/>
    </main>
  );
}
