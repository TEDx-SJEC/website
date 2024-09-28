"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiChevronsRight, FiUser } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const AdminNavbar = () => {
    return (
        <div className="flex bg-indigo-50 h-screen">
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
            className="sticky top-0 bottom-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
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
                    selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"
                }`}
            >
                <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                    <Icon />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
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
                        className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
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
        <div className="mb-3 border-b border-slate-300 pb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <span className="block text-xs font-semibold">Tedxsjec</span>
                            <span className="block text-xs text-slate-500">Admin Page</span>
                        </motion.div>
                    )}
                </div>
                {open && <FiChevronDown className="mr-2" />}
            </div>
        </div>
    );
};

const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
        <motion.div layout className="grid size-10 shrink-0 place-content-center rounded-md bg-black">
            <Image src={"/logo.png"} alt="logo" width={100} height={100} />
        </motion.div>
    );
};

const ToggleClose = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
        >
            <div className="flex items-center p-2">
                <motion.div layout className="grid size-10 place-content-center text-lg">
                    <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        Hide
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};

const NavbarContent = () => <div className="h-[200vh] w-full"></div>;
