import { authOptions } from "./options";

import NextAuth from "next-auth";

export const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
