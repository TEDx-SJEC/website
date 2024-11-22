"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="h-[700px] flex flex-col text-white px-5 py-4 md:px-10 md:py-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
        Contact TEDxSJEC
      </h1>
      <p className="text-center text-xl text-gray-400 mb-8">
        Have questions or want to get involved? We&#39;d love to hear from you!
      </p>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-center justify-center bg-black/40 rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9520361386985!2d74.89609701022555!3d12.910804316156533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359dfac132663%3A0xa7bf228838232d32!2sSt%20Joseph%20Engineering%20College!5e0!3m2!1sen!2sin!4v1713257369845!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="St Joseph Engineering College Map"
            className="rounded-md"
          ></iframe>
        </div>

        <div className="p-6 bg-black/30 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-center">CONNECT WITH TEDxSJEC</h2>
            </div>
            <div className="flex flex-col ml-5 md:ml-5 md:flex-row justify-between">
              <div className="space-y-4 text-sm mb-6">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail className="h-5 w-5 text-red-600" />
                  <a
                    href="mailto:tedx@sjec.ac.in"
                    className="hover:text-red-600 transition-colors"
                  >
                    tedx@sjec.ac.in
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-semibold">Dr. Binu KG</p>
                    <a
                      href="tel:+91-9739866947"
                      className="hover:text-red-600 transition-colors"
                    >
                      +91-9739866947
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <address className="not-italic">
                    St Joseph Engineering College,
                    <br />
                    Vamanjoor, Mangalore - 575028
                    <br />
                    Karnataka, India
                  </address>
                </motion.div>
              </div>
              <div className="flex flex-col space-y-4  md:mt-0">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Instagram className="h-5 w-5 text-red-600" />
                  <Link
                    href="https://instagram.com/tedxsjec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors"
                  >
                    Instagram
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Linkedin className="h-5 w-5 text-red-600" />
                  <Link
                    href="https://www.linkedin.com/company/tedxsjec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors"
                  >
                    LinkedIn
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <div className="text-center text-sm mt-10 ">
            <p>
              © 2024 Developed & Maintained by{" "}
              <span className="font-bold inline-block">Google DG SJEC</span>
            </p>
          </div> */}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p className="">
          © 2024 TEDxSJEC. This independent TEDx event is operated under license
          from TED.
        </p>
        <div className="flex items-center justify-center mt-4 md:pb-0 pb-4 gap-4">
          <Link
            href=""
            className="hover:text-red-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href=""
            className="hover:text-red-600 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/refund"
            className="hover:text-red-600 transition-colors"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
