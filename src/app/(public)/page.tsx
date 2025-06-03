"use client";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Ambience from "@/components/Ambience/Ambience";
import Contact from "@/components/Contact/Contact";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  return (
    <>
      <Hero id="home" />
      <About id="about" />
      <Ambience id="ambience" />
      <Contact id="contact" />
    </>
  );
}