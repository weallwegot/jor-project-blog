import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

import RespectMotionPreference from "@/components/RespectMotionPreference";
import { cookies } from "next/headers";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "light";
  return (
    <RespectMotionPreference>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreference>
  );
}

export default RootLayout;
