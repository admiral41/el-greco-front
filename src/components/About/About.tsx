"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.css";
import Image from "next/image";

const About = ({ id }: { id?: string }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id={id} ref={sectionRef} className={styles.about}>
      <div className={styles.borderOverlay}></div>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          className={styles.imageContent}
        >
          <Image
            src="/images/cafe-bg.jpg"
            alt="About El Greco"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        <div className={styles.textContent}>
          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            className={`${styles.heading} golden-text`}
          >
            About El Greco
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 0.2 }}
            className={styles.text}
          >
            Nestled in the heart of the city, El Greco offers a warm ambiance
            paired with the finest Mediterranean dishes made from traditional
            recipes and fresh ingredients.
          </motion.p>
          
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 0.3 }}
            className={styles.text}
          >
            Our chefs combine time-honored techniques with modern culinary
            innovation to create dishes that delight the senses and transport
            you to the sun-drenched coasts of Greece.
          </motion.p>
          
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
            transition={{ delay: 0.4 }}
            className={styles.text}
          >
            Every ingredient is carefully sourced from local producers and
            Mediterranean imports, ensuring authenticity and quality in every bite.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;