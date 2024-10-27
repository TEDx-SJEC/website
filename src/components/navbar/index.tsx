"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import FullPageMenu from "./full-page-menu";
import NavHeader from "./nav-header";

const Navbar = () => {
  const menuBar = gsap.timeline({ paused: true });
  const tl = gsap.timeline({ paused: true });

  useGSAP(() => {
    //   ScrollTrigger.create({
    //     trigger: ".aboute",
    //     markers: true,
    //     toggleClass: "about",
    //     start: "top 50%",
    //     end: "+=9999", // Prevents it from ending
    //   });

    menuBar
      .to(
        ".bar-1",
        2,
        {
          attr: { d: "M8,2 L2,8" },
          stroke: "#000",
          x: 1,
          ease: "Power2.easeInOut",
        },
        "start"
      )
      .to(".bar-2", 2, { autoAlpha: 0, stroke: "#000" }, "start")
      .to(
        ".bar-3",
        2,
        {
          attr: { d: "M8,8 L2,2" },
          x: 1,
          stroke: "#000",
          ease: "Power2.easeInOut",
        },
        "start"
      );

    tl.to(".logo", { x: -300 }, "go")
      .to(".head-5", { y: -300 }, "go")
      .to(".fullpage-menu", {
        duration: 0,
        display: "block",
        ease: "Expo.easeInOut",
      })
      .from(".menu-bg span", {
        duration: 0.3,
        x: "100%",
        stagger: 0.1,
        ease: "Expo.easeInOut",
      })
      .from(".header-2", { x: -300 })
      .from(
        ".listo",
        { duration: 0.3, x: "-50%", stagger: 0.1, opacity: 0 },
        "-=0.5"
      )
      .from(
        ".social-links li",
        {
          duration: 0.3,
          y: "-100%",
          opacity: 0,
          stagger: 0.1,
          ease: "Expo.easeInOut",
        },
        "-=0.5"
      )
      .from(".hero-icon", { scale: 0, duration: 0.5 }, "end")
      .from(".life", { x: 800, duration: 0.5 }, "end");

    // gsap.to('.hero-icon', {
    //   repeat: -1,
    //   keyframes: [
    //     { translateX: 10, translateY: 10, duration: 0.5 },
    //     { translateX: 10, translateY: -10, duration: 0.5 },
    //     { translateX: -10, translateY: 10, duration: 0.5 },
    //     { translateX: 10, translateY: -10, duration: 0.5 }
    //   ],
    //   yoyo: true
    // });

    menuBar.reverse();
    tl.reverse();
  }, [menuBar, tl]);

  const handleClick = () => {
    menuBar.reversed(!menuBar.reversed());
    tl.reversed(!tl.reversed());
  };

  return (
    <>
      <header className="fixed z-[100] aboute left-0 top-0 w-screen">
        <NavHeader handleClick={handleClick} />
      </header>
      <FullPageMenu />
    </>
  );
};

export default Navbar;
