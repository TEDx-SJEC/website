import Link from "next/link";
import TextGlitch from "../edil-ozi/text-glitch";

type NavItemProps = {
  href: string;
  textOne: string;
  textTwo: string;
};

const NavItem = ({ href, textOne, textTwo }: NavItemProps) => {
  return (
    <li className="listo list-none overflow-hidden mt-[10px] leading-[1] font-bold text-black  text-[40px] md:text-[50px]">
      <Link
        href={href}
        className=" my-2 text-xl font-bold text-[40px] md:text-[50px]"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TextGlitch
          textOne={textOne}
          textTwo={textTwo}
          className="font-bold text-black  text-[40px] md:text-[50px] leading-tight"
        />
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  href: "#",
  textOne: "ABOUT",
  textTwo: "ABOUT",
};

export default NavItem;
