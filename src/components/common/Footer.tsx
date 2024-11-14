import Link from "next/link";
import React from "react";
import TextGlitch from "../edil-ozi/text-glitch";
import Image from "next/image";
import { tedxsjecAssetsPrefix } from "@/lib/utils";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="h-screen md:pt-32 pt-24 flex flex-col justify-between overflow-scroll lg:px-12 md:px-7  py-8 px-4 w-screen fixed bottom-0 z-10">
        <div>
          <h1 className="md:text-5xl text-3xl font-bold mb-4 text-center sm:text-left">
            Contact
          </h1>
          <h1 className="lg:text-xl text-sm">
            To get in touch with us regarding sponsorships and other queries,
            drop an email to:{" "}
            <a href="mailto:tedx@sjec.ac.in" className="text-red-600 pt-4">
              tedx@sjec.ac.in
            </a>
          </h1>
          <section className="flex md:flex-row flex-col w-full h-full md:mt-10 mt-4">
            <div className="flex flex-col md:w-2/5 w-full">
              <div>
                <div className="flex  h-min w-full items-center">
                  <div className="inline-block h-[150px] min-h-[1em] w-1 self-stretch bg-red-600 "></div>
                  <div className="mx-8">
                    <h1 className="md:text-2xl text-lg font-bold mb-4">
                      St Joseph Engineering College
                    </h1>
                    <p className="font-light md:text-base text-sm">
                      St Joseph Engineering College,
                      <br /> Vamanjoor,Mangalore - 575028
                      <br /> Karnataka, India
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:mt-8 my-2">
                  <div className="flex flex-col mx-8 text-center sm:text-left">
                    <h1 className="md:text-2xl text-lg font-bold lg:my-4">
                      Contact
                    </h1>
                    <p className="md:text-lg text-md ">
                      Dr. Binu K G :{" "}
                      <a href="tel:+91-9739866947" className="text-red-600">
                        +91-9739866947
                      </a>
                    </p>
                  </div>
                  <div className="flex flex-col mx-8 font-semibold text-white ">
                    <h1 className="md:text-2xl text-lg text-center sm:text-left font-bold mt-4 md:mt-8 no-underline">
                      Socials
                    </h1>
                    <section className="flex sm:flex-col justify-evenly pt-2">
                      <Link
                        href={"https://instagram.com/tedxsjec"}
                        className=" text-sm "
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <TextGlitch
                          textOne="INSTAGRAM"
                          textTwo="tedxsjec"
                          className="font-bold text-[15px] lg:text-[20px] leading-tight"
                        />
                      </Link>
                      <Link
                        href={"https://www.linkedin.com/company/tedxsjec"}
                        className="text-sm "
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <TextGlitch
                          textOne="LINKEDIN"
                          textTwo="tedxsjec"
                          className="font-bold  text-[15 px] lg:text-[20px] leading-tight"
                        />
                      </Link>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full md:w-1/2 w-full md:h-[500px] lg:h-full h-[150px] px-8 md:px-0 flex justify-end">
              <iframe
                className=" md:block hidden"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
                width="70%"
                height="90%"
                loading="lazy"
              ></iframe>
              <iframe
                className=" md:hidden block"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </div>

        <section className="text-center w-full flex md:flex-row flex-col justify-between mt-4 items-center">
          <div className="flex flex-row items-center md:divide-x divide-white">
            <Image
              src={`${tedxsjecAssetsPrefix}/logo/whiteLogo.png`}
              height={150}
              width={150}
              alt="logo"
              // layout="fixed"
              priority={true}
              className="hidden md:block"
            />
            <h1 className="text-white text-xs lg:text-base pl-2 h-full">
              © 2024 All Rights Reserved
            </h1>
          </div>
          <div>
            <h1 className="text-white text-xs lg:text-base pl-2 h-full items-center capitalize">
              This Independent TEDx Event is Operated under license from TED
            </h1>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
