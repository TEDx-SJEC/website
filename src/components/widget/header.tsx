"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import React from "react";
import Link from "next/link";

const Nav = () => {
  // gsap.registerPlugin(ScrollTrigger);

  // const menuToggle = useRef(null);

  // const menuBar = gsap.timeline({ paused: true });
  // const tl = gsap.timeline({ paused: true });



  // const handleClick = () => {
  //   menuBar.reversed(!menuBar.reversed());
  //   tl.reversed(!tl.reversed());
  // };

  return (
    <>
      <header className="fixed  z-[100] aboute left-0 top-0 w-screen">
        <div className="header-1 flex md:py-[20px] md:px-[30px] p-[30px]  justify-between  items-center  ">
          <div className="logo">
            <Link href="/">
              <Image
                src={`${tedxsjecAssetsPrefix}/logo/whiteLogo.png`}
                height={200}
                width={200}
                alt="logo"
                layout="fixed"  
                priority={true}
              />
            </Link>
          </div>
          <div className="flex justify-between items-center ">
            <li className="list-none overflow-hidden  leading-[1] font-bold text-white reg">
              <Link href="/register">
                <button className="px-3 shadow-sm  py-4 lg:block hidden  mr-7 rounded-md  bg-[#EB0028]">
                  REGISTER
                </button>
              </Link>
            </li>
            <button
              id="menuToggle"
              // ref={menuToggle}
              // onClick={handleClick}
              className="menu-toggle bg-transparent border-none cursor-pointer"
            >
              <svg
                viewBox="0 0 12 10"
                className="hamburger"
                height="40px"
                width="40px"
              >
                <path
                  d="M10,2 L2,2"
                  className="bar-1 fill-none stroke-white"
                ></path>
                <path
                  d="M2,5 L10,5"
                  className="bar-2 fill-none stroke-white"
                ></path>
                <path
                  d="M10,8 L2,8"
                  className="bar-3 fill-none stroke-white"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="fullpage-menu hidden fixed left-0 top-0 w-screen z-50  h-screen ">
        <div className="header-2 fixed left-0 top-0 w-full  flex md:py-[20px] md:px-[30px] p-[30px] z-[60]  justify-between  items-center">
          <Image
            src={`${tedxsjecAssetsPrefix}/logo/blackLogo.webp`}
            height={200}
            width={200}
            alt="logo"
            layout="fixed" 
            priority={true}
          />
        </div>
        <div className="fullpage-menu-inner flex items-center  h-full px-[50px] py-[10px] md:px-[80px] md:py-[40px]">
          <div className="menu-bg h-full w-full  absolute  left-0 top-0">
            <span className="bg-white    block back w-full h-[34%]"></span>
            <span className="bg-white   block back w-full h-[34%]"></span>
            <span className="bg-white   block back w-full h-[34%]"></span>
          </div>
          <nav className=" relative z-10 flex flex-row  w-full">
            <div>
              <ul className="main-menu mt-10">
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">ABOUT</a>
                </li>
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">SPEAKERS</a>
                </li>
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">PERFORMERS</a>
                </li>
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">TEAM</a>
                </li>
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">GALLARY</a>
                </li>
                <li className="listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
                  <a href="">CONTACT</a>
                </li>
                <li className="list-none listo overflow-hidden  leading-[1] font-bold text-white mt-[30px]">
                  <a href="">
                    <button className="px-8 shadow-sm  py-5 rounded-md  bg-[#EB0028]">
                      REGISTER
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="w-full flex flex-col items-center">
            <div className="lg:self-center  lg:flex hidden lg:flex-col">
              <Image
                className="mt-10 hero-icon"
                src={`${tedxsjecAssetsPrefix}/logo/ActualLogo.PNG`}
                height={550}
                width={550}
                alt="logo"
              />
            </div>
            <div className="lg:flex hidden text-nowrap  text-4xl relative bottom-32 justify-center items-center text-center">
              <h1 className="life uppercase font-bold text-black">
                Life - Explore What&#39;s Worth Living
              </h1>
            </div>
          </div>

          <div className="header-nav-footer absolute z-10 bottom-2 md:bottom-3 lg:bottom-10  w-full">
            <ul className="social-links  cursor-pointer list-none flex items-center w-full">
              <li className="text-[16px] md:text-[18px] text-black   hover:text-[#EB0028]">
                <a>
                  <FiInstagram
                    size={36}
                    className="hover:-translate-y-4 transition duration-300"
                  />
                </a>
              </li>
              <li className="ml-[16px] text-[16px] md:text-[18px] text-black  hover:text-[#EB0028]">
                <a>
                  <FaLinkedinIn
                    size={36}
                    className="hover:-translate-y-4 transition duration-300"
                  />
                </a>
              </li>
              <li className="ml-[16px] text-[16px] md:text-[18px] text-black  hover:text-[#EB0028]">
                <a>
                  <IoMail
                    size={36}
                    className="hover:-translate-y-4 transition duration-300"
                  />
                </a>
              </li>
              <li className="ml-[16px] text-[16px] md:text-[18px] text-black   hover:text-[#EB0028]">
                <a className="">
                  <FaLocationArrow
                    size={36}
                    className="hover:-translate-y-4 transition duration-300"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
