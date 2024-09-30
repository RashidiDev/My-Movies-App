import { Link } from "react-router-dom";

export default function Hero(props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="mx-3 max-w-sm text-2xl font-bold leading-10 sm:max-w-xl sm:text-4xl sm:leading-normal md:max-w-2xl md:text-5xl md:leading-[4.3rem]">
        Manage all Your Favorite Movies and Series!
      </h1>

      {props.isSignedIn ? (
        <Link
          className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-500"
          to="/movies"
        >
          My List
        </Link>
      ) : (
        <Link
          className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-500"
          to="/signIn"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
