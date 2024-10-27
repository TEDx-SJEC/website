import Link from "next/link";
import TextGlitch from "../edil-ozi/text-glitch";

type NavItemProps = {
  href: string;
  textOne: string;
  textTwo: string;
};

const NavItem = ({ href, textOne, textTwo }: NavItemProps) => {
  return (
    <li className="listo list-none overflow-hidden mt-[10px] leading-[1] font-bold text-black  text-[35px] md:text-[43px]">
      <Link
        href={href}
        className=" my-2 text-xl font-bold text-[35px] md:text-[43px]"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TextGlitch
          textOne={textOne}
          textTwo={textTwo}
          className="font-bold text-black  text-[35px] md:text-[43px] leading-tight"
        />
      </Link>
    </li>
  );
};


export default NavItem;
