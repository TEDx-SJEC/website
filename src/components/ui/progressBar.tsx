"use client"
import { useEffect } from 'react';
import React from 'react';
const ScrollProgress: React.FC = () => {
  useEffect(() => {
    const scrollProgressBar = document.getElementById('scroll-progress-bar');

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / scrollHeight;

      if (scrollProgressBar) {
        scrollProgressBar.style.transform = `scaleX(${Math.min(Math.max(scrollPercentage, 0), 1)})`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        #scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background-color: #EB0028;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.1s ease-out, opacity 0.2s ease-out;
          z-index: 9999;
          width: 100%;
          opacity: 1;
        }
        #scroll-progress-bar.hidden {
          visibility: hidden;
          opacity: 0;
        }
      `}</style>

      <div id="scroll-progress-bar"></div>
    </>
  );
};

export default ScrollProgress;
