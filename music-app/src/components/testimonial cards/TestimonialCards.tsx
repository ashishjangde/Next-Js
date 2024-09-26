"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function TestimonialCards() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    feedback: "My time at the music school transformed my life. The diverse music courses and dedicated instructors helped me discover my true passion for music."
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    feedback: "Every lesson felt like a new journey, guiding me through the complexities of music theory and performance."
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    feedback: "The atmosphere here is incredibly supportive. I've grown not just as a musician, but as a person."
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    feedback: "The sense of community and collaboration among students makes every practice session enjoyable."
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    feedback: "Each lesson is a step into the vast ocean of musical knowledge, and I feel more equipped to explore it every day."
  },
  {
    quote:
      "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.",
    name: "Khalil Gibran",
    title: "Philosopher and Poet",
    feedback: "I love how the school integrates emotional expression with technical skills, helping us connect with our music on a deeper level."
  },
  {
    quote:
      "Music can change the world because it can change people.",
    name: "Bono",
    title: "Musician and Philanthropist",
    feedback: "The classes are not just about playing instruments; they teach us to impact the world through our music."
  },
  {
    quote:
      "The beautiful thing about learning is that no one can take it away from you.",
    name: "B.B. King",
    title: "Blues Music Legend",
    feedback: "Every lesson adds to my arsenal of skills. The knowledge I gain here is truly priceless."
  },
  {
    quote:
      "Where words fail, music speaks.",
    name: "Hans Christian Andersen",
    title: "Author and Poet",
    feedback: "This music school is where I found my voice. The support from instructors and peers is unmatched."
  },
  {
    quote:
      "Without music, life would be a mistake.",
    name: "Friedrich Nietzsche",
    title: "Philosopher",
    feedback: "Learning music has been a transformative journey. I can't imagine my life without it now."
  },
];


export default TestimonialCards

