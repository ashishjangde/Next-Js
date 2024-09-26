import { Spotlight } from "./Spotlight";
import Link from "next/link";
import { Button } from "../ui/moving-border";

const HeroSection = () => {
  return (
    <div className="h-[40rem] w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 animate-slow-pulse"
        fill="blue"
      />

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center pt-20 md:pt-0">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-wide leading-tight">
          Master The Art Of Music
        </h1>

        {/* Subtext */}
        <p className="mt-6 font-medium text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Drive into comprehensive music course and transform your musical
          journey today. Wether you're a beginer or looking to refine your
          skills. join us to unlock your true potentail
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-10">
          <Link href="/courses" passHref>
            <Button
              borderRadius="4rem"
              className={` relative px-8 py-3 bg-white dark:bg-slate-900 text-black dark:text-white
                            font-medium text-lg rounded-full overflow-hidden 
                            border border-neutral-200 dark:border-slate-800
                            shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out
                            group`} >
              <span className="relative z-10">Learn More</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
