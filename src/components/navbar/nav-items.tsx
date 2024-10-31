import TextGlitch from "../edil-ozi/text-glitch";

type NavItemProps = {
  textOne: string;
  textTwo: string;
  onClick?: () => void; // Add onClick prop
};

const NavItem = ({ textOne, textTwo, onClick }: NavItemProps) => {
  return (
    <li className="listo list-none overflow-hidden  leading-[1] font-bold text-black text-[35px] md:text-[43px]">
      <button
        className="my-2 text-xl font-bold text-[35px] md:text-[43px] bg-transparent border-none cursor-pointer"
        onClick={onClick} // Assign onClick to the button
      >
        <TextGlitch
          textOne={textOne}
          textTwo={textTwo}
          className="font-bold text-black text-[35px] md:text-[43px] leading-tight"
        />
      </button>
    </li>
  );
};

export default NavItem;
