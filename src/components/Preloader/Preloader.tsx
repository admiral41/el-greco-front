"use client";
import { useEffect } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";

const Preloader = () => {
  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        ".dot",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.4,
          duration: 0.4,
          ease: "power2.inOut",
        }
      )
      .to(".preloader", {
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
      });
  }, []);

  return (
    <div className={`${styles.preloader} preloader`}>
      <div className={styles.marbleOverlay}></div>
      <h1 className={styles.title}>
        El Greco
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </h1>
    </div>
  );
};

export default Preloader;