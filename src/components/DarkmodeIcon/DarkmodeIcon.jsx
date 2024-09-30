import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function DarkmodeIcon(props) {
  const clickHandler = targetTheme => {
    props.onTheme(targetTheme);
  };
  return (
    <>
      <SunIcon
        onClick={() => clickHandler("dark")}
        className=" size-5 cursor-pointer transition hover:fill-indigo-500 dark:hidden dark:fill-white"
      />
      <MoonIcon
        onClick={() => clickHandler("light")}
        className="hidden size-5 cursor-pointer transition hover:fill-indigo-500 dark:inline dark:fill-white"
      />
    </>
  );
}
