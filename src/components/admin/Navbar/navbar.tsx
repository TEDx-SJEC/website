"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiChevronsRight, FiUser } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { SiTicktick, SiRazorpay } from "react-icons/si";
import { motion } from "framer-motion";
import Link from "next/link";

export const AdminNavbar = () => {
  return (
    <div className="flex bg-black h-screen text-white">
      <Sidebar />
      <NavbarContent />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-gray-700 bg-gray-900 p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={RiCoupon3Line}
          title="Coupon"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin"
        />
        <Option
          Icon={FiUser}
          title="Users"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/users"
        />
        <Option
          Icon={MdPayment}
          title="Payments"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/payment"
        />
        <Option
          Icon={SiTicktick}
          title="Verify"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/verify"
        />
        <Option
          Icon={SiRazorpay}
          title="Razorpay"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/admin/razorpay"
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  href,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
  href?: string;
}) => {
  return (
    <Link href={href ?? ""}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title
            ? "bg-red-500 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-red-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-gray-700 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-md font-semibold text-red-500">Tedxsjec</span>
              <span className="block text-xs text-gray-400">Admin Page</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2 text-gray-400" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-red-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-gray-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-700 transition-colors hover:bg-gray-800"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg text-gray-400"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-gray-400"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const NavbarContent = () => <div className="h-[200vh] w-full bg-gray-900"></div>;
