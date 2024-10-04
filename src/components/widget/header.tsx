"use client"  
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tedxsjecAssetsPrefix } from '@/lib/utils';
import React from 'react';
const Nav = () => {

  gsap.registerPlugin(ScrollTrigger);

  const menuToggle = useRef(null);

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

    menuBar.to('.bar-1', 2, {
      attr: { d: 'M8,2 L2,8' },
      stroke:"#000",
      x: 1,
      ease: "Power2.easeInOut",
    }, 'start')
      .to('.bar-2', 2, { autoAlpha: 0, stroke:"#000" }, 'start')
      .to('.bar-3', 2, {
        attr: { d: 'M8,8 L2,2' },
        x: 1,
        stroke:"#000",
        ease: "Power2.easeInOut",
      }, 'start');

    tl.to('.logo', { x: -300 },"go")
       .to('.reg',{y:-300},"go")
      .to('.fullpage-menu', { duration: 0, display: 'block', ease: 'Expo.easeInOut' })
      .from('.menu-bg span', { duration: 0.3, x: '100%', stagger: 0.1, ease: 'Expo.easeInOut' })
      .from('.header-2', { x: -300 })
      .from('.listo', { duration: 0.3, x: '-50%', stagger: 0.1, opacity: 0 }, '-=0.5')
      .from('.social-links li', { duration: 0.3, y: '-100%', opacity: 0, stagger: 0.1   , ease: 'Expo.easeInOut' }, '-=0.5')
      .from('.hero-icon', { scale: 0, duration: 0.5 }, 'end')
      .from('.life', { x: 800, duration: 0.5 }, 'end');


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

<header className='fixed  z-[100] aboute left-0 top-0 w-screen'>
  <div className="header-1 flex md:py-[20px] md:px-[30px] p-[30px]  justify-between  items-center  ">
    <div className="logo">
      <a href="">

      <Image
  src={`${tedxsjecAssetsPrefix}/logo/whiteLogo.png`}
  height={200}
  width={200}
  alt="logo"
/>

      </a>
</div>
<div className='flex justify-between items-center '>
<li className='list-none overflow-hidden  leading-[1] font-bold text-white reg'><a href=""><button className='px-3 shadow-sm  py-4 lg:block hidden  mr-7 rounded-md  bg-[#EB0028]'>REGISTER</button></a></li>
<button id='menuToggle' ref={menuToggle} onClick={handleClick} className="menu-toggle bg-transparent border-none cursor-pointer">
<svg viewBox="0 0 12 10" className="hamburger" height="40px" width="40px">
                    <path d="M10,2 L2,2" className="bar-1 fill-none stroke-white"></path>
                    <path d="M2,5 L10,5" className="bar-2 fill-none stroke-white"></path>
                    <path d="M10,8 L2,8" className="bar-3 fill-none stroke-white"></path>

                </svg>
</button>
</div>
  </div>
</header>

<section  className="fullpage-menu hidden fixed left-0 top-0 w-screen z-50  h-screen ">
  <div className='header-2 fixed left-0 top-0 w-full  flex md:py-[20px] md:px-[30px] p-[30px] z-[60]  justify-between  items-center'>
  <Image
  src={`${tedxsjecAssetsPrefix}/logo/blackLogo.webp`}
  height={200}
  width={200}
    alt="logo"
/>
  </div>
  <div className="fullpage-menu-inner flex items-center  h-full px-[50px] py-[10px] md:px-[80px] md:py-[40px]">
    <div className="menu-bg h-full w-full  absolute  left-0 top-0">
      <span className='bg-white    block back w-full h-[34%]'></span>
      <span className='bg-white   block back w-full h-[34%]'></span>
      <span className='bg-white   block back w-full h-[34%]'></span>
      
    </div>
    <nav className=' relative z-10 flex flex-row  w-full'>
      <div>
      <ul className="main-menu mt-10">
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">ABOUT</a></li>
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">SPEAKERS</a></li>
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">PERFORMERS</a></li>
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">TEAM</a></li>
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">GALLARY</a></li>
        <li className='listo list-none overflow-hidden mt-[20px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]'><a href="">CONTACT</a></li>
        <li className='list-none listo overflow-hidden  leading-[1] font-bold text-white mt-[30px]'><a href=""><button className='px-8 shadow-sm  py-5 rounded-md  bg-[#EB0028]'>REGISTER</button></a></li>
        
          </ul>
          </div>
    </nav>
    <div className='w-full flex flex-col items-center'>
      
  <div className='lg:self-center  lg:flex hidden lg:flex-col'>
    <Image className='mt-10 hero-icon' 
      src={`${tedxsjecAssetsPrefix}/logo/ActualLogo.PNG`}
      height={550} 
      width={550} 
      alt="logo" 
    />  
  </div>
  <div className='lg:flex hidden text-nowrap  text-4xl relative bottom-32 justify-center items-center text-center'>
  <h1 className="life uppercase font-bold text-black">Life - Explore What&#39;s Worth Living</h1>
  </div>
</div>

    <div className="header-nav-footer absolute z-10 bottom-2 md:bottom-3 lg:bottom-10  w-full">
<ul className="social-links  cursor-pointer list-none flex items-center w-full">
  <li className="text-[16px] md:text-[18px] text-black   hover:text-[#EB0028]">
    <a><FiInstagram size={36} className='hover:-translate-y-4 transition duration-300'  /></a>
  </li>
  <li className="ml-[16px] text-[16px] md:text-[18px] text-black  hover:text-[#EB0028]">
    <a><FaLinkedinIn size={36} className='hover:-translate-y-4 transition duration-300'  /></a>
  </li>
  <li className="ml-[16px] text-[16px] md:text-[18px] text-black  hover:text-[#EB0028]">
    <a><IoMail size={36} className='hover:-translate-y-4 transition duration-300'  /></a>
  </li>
  <li className="ml-[16px] text-[16px] md:text-[18px] text-black   hover:text-[#EB0028]">
    <a className=''><FaLocationArrow size={36} className='hover:-translate-y-4 transition duration-300' /></a>
  </li>
</ul>


    </div>
  </div>
</section>




</>
  )
}

export default Nav;
