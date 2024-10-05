import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaLinkedinIn, FaLocationArrow } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

const SocialLinks: React.FC = () => {
  return (
    <div className="header-nav-footer absolute z-10 bottom-2 md:bottom-3 lg:bottom-10 w-full">
      <ul className="social-links cursor-pointer list-none flex items-center w-full">
        <li className="text-[16px] md:text-[18px] text-black hover:text-[#EB0028]">
          <a>
            <FiInstagram
              size={36}
              className="hover:-translate-y-4 transition duration-300"
            />
          </a>
        </li>
        <li className="ml-[16px] text-[16px] md:text-[18px] text-black hover:text-[#EB0028]">
          <a>
            <FaLinkedinIn
              size={36}
              className="hover:-translate-y-4 transition duration-300"
            />
          </a>
        </li>
        <li className="ml-[16px] text-[16px] md:text-[18px] text-black hover:text-[#EB0028]">
          <a>
            <IoMail
              size={36}
              className="hover:-translate-y-4 transition duration-300"
            />
          </a>
        </li>
        <li className="ml-[16px] text-[16px] md:text-[18px] text-black hover:text-[#EB0028]">
          <a>
            <FaLocationArrow
              size={36}
              className="hover:-translate-y-4 transition duration-300"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
