import { useContext, useState } from "react";
import supabase from "../../supabase";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { isSignedInContext } from "../../contexts/IsSignedInContext";
import RippleButton from "../RippleButton";

export default function SignUp({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState("");
  const [signInStatus, setSignInStatus] = useState(null);
  const navigate = useNavigate();
  const { setIsSignedIn } = useContext(isSignedInContext);
  const [isLoading, setIsLoading] = useState(false);

  const emailHandler = e => {
    setEmail(e.target.value);
    setSignInStatus(null);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
    setSignInStatus(null);
  };

  const nameHandler = e => {
    setUserName(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSignInStatus(null);
  };

  let errorMsg = "Failed to sign up!";
  async function signUp(e) {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://www.google.com",
        data: {
          Name: userName.firstName + " " + userName.lastName,
        },
      },
    });
    if (!error) {
      setSignInStatus(true);
      setIsSignedIn(true);
      onSignIn(data.user.user_metadata);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setSignInStatus(false);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex h-full flex-col justify-center px-6 text-gray-900 lg:px-8 dark:text-gray-100">
      <div className="relative mt-12">
        {signInStatus && (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center text-green-500">
            Signed up successfully!
            <br /> Please check your email to verify your account.
          </div>
        )}
        {signInStatus === false && (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 text-red-500">
            {errorMsg}
          </div>
        )}
        <h2 className="mt-14 text-center text-2xl font-bold leading-9">
          Sign up new account
        </h2>
      </div>

      <div className="mx-auto mt-8 w-full max-w-sm">
        <form className="space-y-3" action="" onSubmit={signUp}>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="basis-5/12">
              <label
                htmlFor="firstName"
                className="mb-1 block text-xs font-medium leading-6 sm:text-sm"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="name"
                placeholder="First Name"
                onKeyUp={nameHandler}
                required
                className="block w-full rounded-md border-0  bg-opacity-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:ring-gray-700 dark:placeholder:text-gray-700"
              />
            </div>
            <div className="flex-grow">
              <label
                htmlFor="lastName"
                className="mb-1 block text-xs font-medium leading-6 sm:text-sm"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last Name"
                onKeyUp={nameHandler}
                required
                className="block w-full rounded-md border-0 bg-opacity-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:ring-gray-700 dark:placeholder:text-gray-700"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium leading-6 sm:text-sm"
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                onChange={emailHandler}
                required
                value={email}
                className="block w-full rounded-md border-0 bg-opacity-0 py-2 pl-3 pr-9 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:ring-gray-700 dark:placeholder:text-gray-700 dark:focus:ring-indigo-400"
              />
              {email && (
                <XMarkIcon
                  onClick={() => setEmail("")}
                  className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer fill-gray-400 hover:fill-indigo-500  active:fill-indigo-500 dark:fill-gray-700 dark:hover:fill-indigo-400"
                />
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium leading-6 sm:text-sm"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              onKeyUp={passwordHandler}
              required
              className="block w-full rounded-md border-0 bg-opacity-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:ring-gray-700 dark:placeholder:text-gray-700"
            />
          </div>

          <div>
            <RippleButton
              type="submit"
              {...(isLoading && { disabled: true })}
              className="flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <>
                  Signing in
                  <div className="ml-1.5 flex w-[1.7em] items-center justify-between">
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 [animation-delay:-400ms]"></div>
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 [animation-delay:-200ms]"></div>
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 delay-500"></div>
                  </div>
                </>
              ) : (
                "Sign Up"
              )}
            </RippleButton>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/SignIn"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
