import { Suspense } from "react";
import Signin from "./signin-page";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signin />
    </Suspense>
  );
}
