"use client";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import NavItem from "./nav-items";
import RegisterButton from "./register-button";

const FullPageMenu = () => {
  return (
    <section className="fullpage-menu hidden fixed left-0 top-0 w-screen z-50 h-screen">
      <div className="header-2 fixed left-0 top-0 w-full flex md:py-[20px] md:px-[30px] p-[30px] z-[60] justify-between items-center">
        <Image
          src={`${tedxsjecAssetsPrefix}/logo/blackLogo.webp`}
          height={200}
          width={200}
          alt="logo"
          layout="fixed"
          priority={true}
        />
      </div>
      <div className="fullpage-menu-inner flex items-center h-full px-[50px] py-[10px] md:px-[80px] md:py-[40px]">
        <div className="menu-bg h-full w-full absolute left-0 top-0">
          <span className="bg-white block back w-full h-[34%]"></span>
          <span className="bg-white block back w-full h-[34%]"></span>
          <span className="bg-white block back w-full h-[34%]"></span>
        </div>
        <nav className="relative z-10 flex flex-row w-full">
          <ul className="main-menu mt-10">
            <NavItem  textOne="ABOUT" textTwo="ABOUT" />
            <NavItem textOne="SPEAKERS" textTwo="SPEAKERS" />
            <NavItem

              textOne="PERFORMERS"
              textTwo="PERFORMERS"
            />
            <NavItem  textOne="TEAM" textTwo="TEAM" />
            <NavItem  textOne="GALLERY" textTwo="GALLERY" />
            <NavItem  textOne="CONTACT" textTwo="CONTACT" />
            <li className="list-none listo overflow-hidden leading-[1] font-bold text-white mt-[30px]">
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
              alt="logo"
            />
          </div>
          <div className="lg:flex hidden text-nowrap text-4xl relative bottom-32 justify-center items-center text-center">
            <h1 className="life uppercase font-bold text-black">
              Life - Explore What&#39;s Worth Living
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPageMenu;
