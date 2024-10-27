'use client'

import { tedxsjecAssetsPrefix } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { Button } from "../ui/button"

const Navbar = () => {
  const menuBar = useRef(gsap.timeline({ paused: true }))
  const tl = useRef(gsap.timeline({ paused: true }))
  const menuToggleRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useGSAP(() => {
    menuBar.current
      .to(
        ".bar-1",
        0.5,
        {
          attr: { d: "M8,2 L2,8" },
          stroke: "#000",
          x: 1,
          ease: "Power2.easeInOut",
        },
        "start"
      )
      .to(".bar-2", 0.5, { autoAlpha: 0, stroke: "#000" }, "start")
      .to(
        ".bar-3",
        0.5,
        {
          attr: { d: "M8,8 L2,2" },
          x: 1,
          stroke: "#000",
          ease: "Power2.easeInOut",
        },
        "start"
      )

    tl.current
      .to(".logo", { x: -300, duration: 0.5 }, "go")
      .to(".reg", { y: -300, duration: 0.5 }, "go")
      .to(".fullpage-menu", {
        duration: 0.1,
        display: "block",
        ease: "Expo.easeInOut",
      })
      .from(".menu-bg span", {
        duration: 0.5,
        x: "100%",
        stagger: 0.1,
        ease: "Expo.easeInOut",
      })
      .from(".header-2", { x: -300, duration: 0.5 })
      .from(".listo", { 
        duration: 0.5, 
        x: "-50%", 
        stagger: 0.1, 
        opacity: 0,
        ease: "Power2.easeOut"
      }, "-=0.5")
      .from(".hero-icon", { scale: 0, duration: 0.5 }, "end")
      .from(".life", { 
        x: 800, 
        duration: 0.5,
        opacity: 0,
        ease: "Power2.easeOut"
      }, "end")

    menuBar.current.reverse()
    tl.current.reverse()
  }, [])

  const handleClick = () => {
    menuBar.current.reversed(!menuBar.current.reversed())
    tl.current.reversed(!tl.current.reversed())
    setIsMenuOpen(!isMenuOpen)
  }

  const NavItem = ({ href, textOne, textTwo }: { href: string; textOne: string; textTwo: string }) => (
    <li className="listo list-none overflow-hidden mt-6 leading-tight font-bold text-black text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
      <Link
        href={href}
        className="block py-2 relative overflow-hidden group"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TextGlitch
          textOne={textOne}
          textTwo={textTwo}
          className="font-bold text-black transition-transform duration-300 group-hover:translate-y-[-110%]"
        />
      </Link>
    </li>
  )

  const TextGlitch = ({
    textOne,
    textTwo,
    className,
  }: {
    textOne: string
    textTwo: string
    className: string
  }) => (
    <span className={`block ${className}`} data-text={textTwo}>
      {textOne}
      <span className="absolute top-full left-0 block">{textTwo}</span>
    </span>
  )

  const RegisterButton = () => (
    <Button className="bg-orange-600 text-lg md:text-3xl p-[30px] hover:bg-orange-700 text-white font-semibold rounded-md">
      Register Now
    </Button>
  )

  return (
    <>
      <header
        className={`fixed z-[100] left-0 top-0 w-full ${
          !isMenuOpen ? "backdrop-blur-md bg-black/30" : ""
        }`}
      >
        <div className="header-1 flex md:py-5 md:px-8 p-6 justify-between items-center">
          <div className="logo">
            <Link href="/">
              <Image
                src={`${tedxsjecAssetsPrefix}/logo/whiteLogo.png`}
                height={180}
                width={180}
                alt="TEDxSJEC logo"
                priority={true}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              id="menuToggle"
              ref={menuToggleRef}
              onClick={handleClick}
              className="menu-toggle bg-transparent border-none cursor-pointer p-2"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 12 10" className="hamburger" height="40px" width="40px">
                <path d="M10,2 L2,2" className="bar-1 fill-none stroke-white"></path>
                <path d="M2,5 L10,5" className="bar-2 fill-none stroke-white"></path>
                <path d="M10,8 L2,8" className="bar-3 fill-none stroke-white"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <section className="fullpage-menu hidden fixed left-0 top-0 w-full z-50 h-screen">
        <div className="header-2 fixed left-0 top-0 w-full flex md:py-5 md:px-8 p-6 z-[60] justify-between items-center">
          <Image
            src={`${tedxsjecAssetsPrefix}/logo/blackLogo.webp`}
            height={180}
            width={180}
            alt="TEDxSJEC logo"
            priority={true}
          />
        </div>
        <div className="fullpage-menu-inner flex items-center h-full px-6 py-4 md:px-12 md:py-8 lg:px-16 lg:py-12">
          <div className="menu-bg h-full w-full absolute left-0 top-0">
            <span className="bg-white block back w-full h-[34%]"></span>
            <span className="bg-white block back w-full h-[34%]"></span>
            <span className="bg-white block back w-full h-[34%]"></span>
          </div>
          <nav className="relative z-10 flex flex-row w-full">
            <ul className="main-menu mt-16 space-y-4 w-full">
              <NavItem href="/about" textOne="ABOUT" textTwo="ABOUT" />
              <NavItem href="/speakers" textOne="SPEAKERS" textTwo="SPEAKERS" />
              <NavItem href="/performers" textOne="PERFORMERS" textTwo="PERFORMERS" />
              <NavItem href="/team" textOne="TEAM" textTwo="TEAM" />
              <NavItem href="/gallery" textOne="GALLERY" textTwo="GALLERY" />
              <NavItem href="/contact" textOne="CONTACT" textTwo="CONTACT" />
              <li className="list-none listo overflow-hidden mt-8">
                <RegisterButton />
              </li>
            </ul>
          </nav>
          <div className="w-full flex flex-col items-center">
            <div className="lg:self-center lg:flex hidden lg:flex-col">
              <Image
                className="mt-10 hero-icon"
                src={`${tedxsjecAssetsPrefix}/logo/ActualLogo.PNG`}
                height={550}
                width={550}
                alt="TEDxSJEC hero logo"
              />
            </div>
            <div className="lg:flex hidden text-nowrap text-4xl xl:text-5xl relative text-center p-2 rounded-md mt-8">
              <h1 className="life uppercase font-bold text-black">
                Life - Explore What&#39;s Worth Living
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar