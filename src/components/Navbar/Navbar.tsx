"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const Navbar = ({ loading }: { loading: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from(".nav-item", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }
  }, [loading]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={`${styles.logo} golden-text`} onClick={closeMenu}>
        El Greco
      </Link>
      <div className={`${styles.centerNav} ${menuOpen ? styles.open : ""}`}>
        <Link href="/#home" className={`${styles.item} nav-item`} onClick={closeMenu}>
          HOME
        </Link>
        <Link href="/#about" className={`${styles.item} nav-item`} onClick={closeMenu}>
          ABOUT
        </Link>
        <Link href="/#ambience" className={`${styles.reserve} nav-item`} onClick={closeMenu}>
          <span className={styles.circle}></span>
          AMBIENCE
        </Link>
        <Link href="/#contact" className={`${styles.item} nav-item`} onClick={closeMenu}>
          CONTACT
        </Link>
      </div>
      <div className={styles.rightMenu}>
        <Link href="/menu" className={`${styles.menuBtn} nav-item`} onClick={closeMenu}>
          MENU
        </Link>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div><div></div><div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;