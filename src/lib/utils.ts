import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getServerSideSession } from "./get-server-session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


