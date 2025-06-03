"use client";
import Link from "next/link";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";

const Footer = ({ loading }: { loading: boolean }) => {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 50 }}
      animate={!loading ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Wavy SVG Top Border */}
      <div className={styles.waveWrapper}>
        <svg
          className={styles.wave}
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000"
            d="M0,64L48,58.7C96,53,192,43,288,64C384,85,480,139,576,160C672,181,768,171,864,144C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.logo}>El Greco</div>
        <div className={styles.links}>
          <Link href="/#home" className={styles.link}>Home</Link>
          <Link href="/#about" className={styles.link}>About</Link>
          <Link href="/#ambience" className={styles.link}>Ambience</Link>
          <Link href="/#contact" className={styles.link}>Contact</Link>
          <Link href="/menu" className={styles.link}>Menu</Link>
        </div>
        <div className={styles.copy}>
          © {new Date().getFullYear()} El Greco. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
