import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

export default function Performers() {
  useGSAP(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.07,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Parallax effect for images
    gsap.utils.toArray<HTMLDivElement>('.img-container').forEach((container) => {
      const img = container.querySelector('img');

      if (img) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
          },
        });

        tl.fromTo(
          img,
          { yPercent: -20, },
          { yPercent: 20,  }
        );
      }
    });


  }, []);

  return (
    <div>
<section className="flex items-center justify-center z-0 relative">
  <div className="relative w-[1000vw] max-w-[1000px]">
    <div className="relative w-full pt-[80%] overflow-hidden img-container">
      <img
        src="https://images.unsplash.com/photo-1506157491319-81aab3add711?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="First Image"
        className="absolute w-auto h-full top-0"
      />
      <h1 className="absolute bottom-[100px] shadow-2xl  left-10 font-satoshi font-[450]  text-white text-center  p-2 text-6xl ">
      The Spotlight Crew
      </h1>
      <p className="absolute bottom-14 left-10 font-satoshi ml-20 shadow-2xl  text-white text-center  p-2 text-2xl ">
      "Shining brightest when it matters most."
      </p>
    </div>
  </div>
</section>



      <section className="flex items-center justify-center mt-32 ">
        <div className="relative w-[100vw] max-w-[1000px]">
          <div className="relative w-full pt-[80%] overflow-hidden  img-container">
            <img
              src="https://images.unsplash.com/photo-1540908625033-6e2d915074fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second Image"
              className="absolute w-auto h-full top-0  "
            />
          </div>
          <h1 className="absolute bottom-[100px] left-10 font-satoshi font-[450] shadow-sm  text-white text-center  p-2 text-6xl ">
      The Spotlight Crew
      </h1>
      <p className="absolute bottom-14 left-10 font-satoshi ml-20   text-white shadow-sm text-center  p-2 text-2xl ">
      "Shining brightest when it matters most."
      </p>
        </div>
      </section>

      <section className="flex items-center justify-center mt-32  mb-10">
        <div className="relative w-[100vw] max-w-[1000px] ">
          <div className="relative w-full pt-[80%] overflow-hidden  img-container">
            <img
              src="https://images.unsplash.com/photo-1707716489310-0bee7330ff6b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third Image"
              className="absolute w-auto h-full top-0 "
            />
          </div>
          <h1 className="absolute bottom-[100px] left-10 font-satoshi font-[450] shadow-sm  text-white text-center  p-2 text-6xl ">
      The Spotlight Crew
      </h1>
      <p className="absolute bottom-14 left-10 font-satoshi ml-20   text-white shadow-sm text-center  p-2 text-2xl ">
      "Shining brightest when it matters most."
      </p>
        </div>
      </section>
    </div>
  );
}
