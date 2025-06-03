"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Ambience.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const setupInfiniteTextScroll = (element: HTMLDivElement) => {
  element.innerHTML += element.innerHTML;

  gsap.to(element, {
    xPercent: -50,
    duration: 30,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % (element.scrollWidth / 2))
    }
  });
};

const AmbienceSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setupInfiniteTextScroll(textRef.current);
    }

    if (sectionRef.current && row1Ref.current && row2Ref.current) {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;

      gsap.set(row1, { xPercent: -12.5 });
      gsap.set(row2, { xPercent: -12.5 });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = self.direction;

          const row1Movement = direction === 1
            ? -12.5 + progress * 10
            : -12.5 - progress * 5;

          const row2Movement = direction === 1
            ? -12.5 - progress * 10
            : -12.5 + progress * 5;

          gsap.to(row1, {
            xPercent: row1Movement,
            overwrite: true,
            ease: "sine.out"
          });

          gsap.to(row2, {
            xPercent: row2Movement,
            overwrite: true,
            ease: "sine.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={styles.ambienceSection}>
      {/* Text loop */}
      <div className={styles.textContainer}>
        <div ref={textRef} className={styles.textLoop}>
          <h3 className={styles.heading2}>Ambience</h3>
          <h3 className={styles.gray}> • </h3>
          <h3 className={styles.gray}>Ambience</h3>
          <h3 className={styles.gray}> • </h3>
          <h3 className={styles.heading2}>Ambience</h3>
          <h3 className={styles.gray}> • </h3>
          <h3 className={styles.gray}>Ambience</h3>
          <h3 className={styles.gray}> • </h3>
        </div>
      </div>

      {/* Image rows */}
      <div className={styles.galleryContainer}>
        <div ref={row1Ref} className={styles.imageRow}>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 1"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 2"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 3"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 4"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
        </div>

        <div ref={row2Ref} className={styles.imageRow}>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 5"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 6"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 7"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
          <div className={styles.ambienceBlock}>
            <Image
              src="/images/torii-06-min_1torii-06-min.webp"
              alt="Ambience 8"
              fill
              className={styles.ambienceImage}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 69vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbienceSection;
