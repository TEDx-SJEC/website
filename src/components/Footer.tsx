import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="h-screen md:py-20 md:px-12 py-8 px-4 w-screen fixed bottom-0 z-10">
        <h1 className="text-5xl font-bold">Contact</h1>
        <section className="flex md:flex-row flex-col w-full h-full mt-10">
          <div className="flex flex-col md:w-2/5 w-full">
            <div>
              <div className="flex  h-min w-full items-center">
                <div className="inline-block h-[150px] min-h-[1em] w-1 self-stretch bg-red-600 "></div>
                <div className="mx-8">
                  <h1 className="text-2xl font-bold mb-4">
                    St Joseph Engineering College
                  </h1>
                  <p className="font-light">
                    St Joseph Engineering College,
                    <br /> Vamanjoor,Mangalore - 575028
                    <br /> Karnataka, India
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex flex-col mx-8">
                  <h1 className="text-2xl font-bold my-4">Contact</h1>
                  <p>
                    Dr. Binu K G :{" "}
                    <a href="tel:+91-9739866947" className="text-red-600">
                      +91-9739866947
                    </a>
                  </p>
                </div>
                <div className="flex flex-col mx-8 font-semibold ">
                  <h1 className="text-2xl font-bold my-4 no-underline">
                    Socials
                  </h1>
                  <Link
                    href={"https://instagram.com/tedxsjec"}
                    className="underline hover:decoration-4 transition-all  decoration-red-600 my-2"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/company/tedxsjec"}
                    className="underline hover:decoration-4 transition-all decoration-red-600"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-8">
            <iframe
              className=" md:block hidden"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
              width="80%"
              height="60%"
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
      </footer>
    </>
  );
};

export default Footer;
