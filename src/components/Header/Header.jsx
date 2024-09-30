import DarkmodeIcon from "../DarkmodeIcon/DarkmodeIcon";
import {
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { isSignedInContext } from "../../contexts/IsSignedInContext";
import RippleButton from "../RippleButton";

const navigation = [
  { name: "Home", href: "/", mustSignIn: false },
  { name: "Movies List", href: "/Movies", mustSignIn: true },
];

export default function Header({ userName, signOutAnimation }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [targetTheme, setTargetTheme] = useState("dark");
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useContext(isSignedInContext);

  const themeHandler = targetTheme => {
    setTargetTheme(targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  useEffect(() => {
    let savedTheme = localStorage.getItem("theme");
    savedTheme && setTargetTheme(savedTheme);
  }, []);

  useEffect(() => {
    targetTheme == "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [targetTheme]);

  const signOut = async () => {
    signOutAnimation(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (!error) {
        navigate("/");
        setIsSignedIn(false);
      }
    } catch (error) {
      alert(error);
    }
    signOutAnimation(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* MOBILE MENU */}
      <div
        className={`${openMenu ? "right-0" : "-right-full sm:-right-72"} fixed bottom-0 top-0 z-50 flex h-dvh w-full flex-col items-end space-y-2 bg-neutral-300 bg-opacity-60 px-4 py-6 backdrop-blur-xl transition-[right] duration-300 ease-out  will-change-auto sm:w-72 sm:ring-1 sm:ring-neutral-900/10 md:hidden dark:bg-neutral-900 dark:bg-opacity-80`}
        onMouseLeave={() => {
          setOpenMenu(false);
        }}
      >
        <XMarkIcon
          className="mb-3 size-6 cursor-pointer rounded-full hover:bg-neutral-50 hover:fill-indigo-500 active:fill-indigo-500 dark:hover:bg-neutral-800 dark:hover:fill-indigo-400 dark:active:bg-neutral-50 dark:active:fill-indigo-400"
          onClick={() => {
            setOpenMenu(false);
          }}
        />
        {/* maybe use focus for mobile tap effects. check tap highilight property. NEITHER OF THE.*/}
        {userName && (
          <RippleButton className="flex w-full cursor-pointer items-center gap-1 rounded-md px-4 py-6 hover:bg-neutral-50 hover:text-indigo-500 sm:py-4 dark:hover:bg-neutral-800 dark:hover:text-indigo-400">
            <UserIcon className="h-5 w-5" />
            <Link to="">{userName}</Link>
          </RippleButton>
        )}
        {userName && (
          <span className="h-px w-full bg-gray-200 dark:bg-gray-800"></span>
        )}
        {navigation.map(item => {
          if (userName || !item.mustSignIn) {
            return (
              <Link
                to={item.href}
                key={item.name}
                className="w-full rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800"
                onClick={() =>
                  setTimeout(() => {
                    setOpenMenu(false);
                  }, 300)
                }
              >
                <RippleButton className="size-[inherit] rounded-md px-4 py-4 text-left sm:py-2.5">
                  {item.name}
                </RippleButton>
              </Link>
            );
          }
        })}
        {userName && (
          <span className="h-px w-full bg-gray-200 dark:bg-gray-800"></span>
        )}
        {isSignedIn && (
          <RippleButton
            className="flex w-full cursor-pointer justify-between rounded-md px-4 py-5 hover:bg-neutral-50 sm:py-2.5 dark:hover:bg-neutral-800"
            onClick={signOut}
          >
            Sign out
            <ArrowLeftStartOnRectangleIcon className="inline-block size-6 hover:fill-indigo-500 dark:hover:fill-indigo-400" />
          </RippleButton>
        )}
      </div>
      <div className="flex items-center justify-between bg-white bg-opacity-30 px-3 py-3 shadow-md backdrop-blur-xl sm:px-4 md:px-20 md:py-5 dark:bg-neutral-500 dark:bg-opacity-5">
        <Link to={"/"}>
          <h1 className="cursor-pointer text-xl font-bold sm:text-3xl dark:text-gray-100">
            My<span className="text-indigo-600">Movies</span>
          </h1>
        </Link>

        {/* DESKTOP MANU */}
        <div className="hidden space-x-10 md:block">
          {navigation.map(item => {
            if (userName || !item.mustSignIn) {
              return (
                <Link
                  to={item.href}
                  key={item.name}
                  className="hover:text-indigo-500"
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>

        <div className="flex items-center justify-center gap-5 md:gap-10">
          {userName ? (
            <div className="hidden cursor-pointer items-center justify-center gap-1 hover:text-indigo-500 md:flex dark:hover:text-indigo-400">
              <UserIcon className="h-5 w-5" />
              <a className="font-medium" href="#">
                {userName}
              </a>
            </div>
          ) : (
            ""
          )}

          {isSignedIn && (
            <ArrowLeftStartOnRectangleIcon
              title="Sign Out"
              className="hidden size-6 cursor-pointer hover:fill-indigo-500 md:block dark:hover:fill-indigo-400"
              onClick={signOut}
            />
          )}

          <DarkmodeIcon onTheme={themeHandler} />

          <Bars3Icon
            className="size-6 cursor-pointer hover:fill-indigo-500 md:hidden dark:hover:fill-indigo-400"
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </div>
    </header>
  );
}
