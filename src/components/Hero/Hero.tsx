"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { usePathname } from "next/navigation";

const Hero = ({ id }: { id?: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const reserveBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Safely reset all elements to visible state
  const resetElements = () => {
    const elements = [
      titleRef.current,
      subtitleRef.current,
      descriptionRef.current,
      reserveBtnRef.current,
      menuBtnRef.current
    ].filter(Boolean); // Filter out null values

    if (elements.length > 0) {
      gsap.set(elements, {
        opacity: 1,
        y: 0,
        clearProps: "all"
      });
    }
  };

  useEffect(() => {
    // Get references to all elements
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descriptionEl = descriptionRef.current;
    const reserveBtnEl = reserveBtnRef.current;
    const menuBtnEl = menuBtnRef.current;

    // Reset elements first
    resetElements();

    if (!isHomePage || !titleEl || !subtitleEl || !descriptionEl || !reserveBtnEl || !menuBtnEl) {
      return;
    }

    // Kill any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Create new timeline
    animationRef.current = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    animationRef.current.from(titleEl, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.4
    });

    animationRef.current.from(subtitleEl, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.8");

    animationRef.current.from(descriptionEl, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.7");

    animationRef.current.from([reserveBtnEl, menuBtnEl], {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2
    }, "-=0.6");

    return () => {
      // Clean up animations when component unmounts
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      resetElements();
    };
  }, [isHomePage]);

  return (
      <section id={id} className={styles.hero} data-scroll-section>
      <div className={styles.borderOverlay}></div>
      <div className={styles.bgImage}></div>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 ref={titleRef} className={`${styles.title} golden-text`}>
          Welcome to El Greco
        </h1>
        <p ref={subtitleRef} className={`${styles.subtitle} golden-text`}>
          Where flavor meets finesse.
        </p>
        <p ref={descriptionRef} className={styles.description}>
          Experience the finest Mediterranean flavors crafted with passion and tradition. Join us for an unforgettable dining journey.
        </p>

        <div className={styles.buttonGroup}>
          <button ref={reserveBtnRef} className={`${styles.reserveButton} golden-bg`}>
            Order
          </button>
          <button ref={menuBtnRef} className={`${styles.menuButton} golden-border`}>
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;