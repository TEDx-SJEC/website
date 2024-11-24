import Link from "next/link";
import React from "react";
import TextGlitch from "../edil-ozi/text-glitch";
import Image from "next/image";
import { tedxsjecAssetsPrefix } from "@/lib/utils";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="pt-16 md:pt-2 text-center text-sm text-gray-400 md:pb-4 mx-2">
        <div>
          <p className="">
            © 2024 TEDxSJEC. This independent TEDx event is operated under
            license from TED.
          </p>
          <div className="flex items-center justify-center mt-4 md:pb-0 pb-4 gap-4 text-xs">
            <Link
              href="/privacy"
              className="hover:text-red-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
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
      </footer>
    </>
  );
};

export default Footer;
