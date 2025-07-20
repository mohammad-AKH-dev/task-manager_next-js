import { IconEye } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import LoginPageContent from "../components/templates/login/LoginPageContent";

function page() {
  return (
    <section className="login-page md:overflow-y-hidden">
      <LoginPageContent/>
    </section>
  );
}

export default page;
