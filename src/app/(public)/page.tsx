"use client";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Ambience from "@/components/Ambience/Ambience";
import Contact from "@/components/Contact/Contact";

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