"use client";

import { getServerSideSession } from "@/lib/get-server-session";
import { sendEmail } from "@/utils/sendMail";
import axios from "axios";
export default function Home() {
  const session = "";

  const sendVerificationEmail = async () => {
    await axios.post("/api/send-mail", {
      email: "joywinbennis0987@gmail.com",
      name: "Joywin",
      token: "1234",
    });
  };

//   if (!session) {
//     return (
//       <div>
//         <button>send verification mail</button>
//       </div>
//     );
//   }
  return <div>Hello  <button onClick={sendVerificationEmail}>send verification mail</button></div>;
}
