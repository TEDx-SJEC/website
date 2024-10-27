"use client";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import RegisterButton from "./register-button";

interface NavHeaderProps {
  handleClick: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ handleClick }) => {
  const menuToggle = useRef(null);
  return (  
    <>
    <header className="fixed  z-50 aboute left-0 top-0 w-screen">
      <div className="header-1 flex md:py-[15px] md:px-[30px] px-3 py-4  justify-between  items-center  ">
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
          <button
            id="menuToggle"
            ref={menuToggle}
            onClick={handleClick}
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
    </>
  );
};

export default NavHeader;
