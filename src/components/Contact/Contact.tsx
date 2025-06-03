"use client";
import { useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPaperPlane
} from "react-icons/fa";
import styles from "./Contact.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = gsap.utils.toArray([
      `.${styles.contactHeader} h2`,
      `.${styles.contactHeader} p`,
      `.${styles.infoCard}`,
      `.${styles.mapContainer}`,
      `.${styles.contactForm}`
    ]) as HTMLElement[];

    gsap.set(elements, { opacity: 1, y: 0 });

    if (animationRef.current) animationRef.current.kill();

    animationRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    animationRef.current.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    return () => {
      animationRef.current?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={styles.contactSection}>
      <div className={styles.borderOverlay}></div>
      <div className={styles.contactHeader}>
        <h2 className="golden-text">Contact Us</h2>
        <p>We'd love to hear from you. Reach out via form, call, or visit us!</p>
      </div>

      <div className={styles.infoCardsContainer}>
        <div className={styles.infoCard}>
          <div className={styles.cardContent}>
            <FaMapMarkerAlt className={styles.cardIcon} />
            <div>
              <h3>Our Location</h3>
              <p>
                123 Mediterranean Avenue<br />
                Food City, FC 12345
              </p>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardContent}>
            <FaPhone className={styles.cardIcon} />
            <div>
              <h3>Phone</h3>
              <p>(123) 456-7890<br />(987) 654-3210</p>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardContent}>
            <FaClock className={styles.cardIcon} />
            <div>
              <h3>Opening Hours</h3>
              <p>Mon–Fri: 9am–10pm<br />Weekends: 10am–11pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.splitContainer}>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.3612812374257!2d-73.99080612379149!3d40.71961157139332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598c338f691d%3A0x6d5f394e7a1962cc!2sTorii%20Restaurant!5e0!3m2!1sen!2sus!4v1691025000000!5m2!1sen!2sus"
            title="Location Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className={styles.contactForm}>
          <h3><FaPaperPlane className={styles.formIcon} /> Send Us a Message</h3>
          <form onSubmit={e => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" placeholder="Your Message" rows={5} required />
            </div>

            <button type="submit" className="golden-bg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}