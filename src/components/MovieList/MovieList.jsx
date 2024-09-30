import { useState, useEffect } from "react";
import Category from "../Category/Category";
import MovieCard from "../MovieCard/MovieCard";
import supabase from "../../supabase";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading";
import RippleButton from "../RippleButton";

function MovieList() {
  const [moviesList, setMoviesList] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    getMovies();
  }, []);
  async function getMovies() {
    let { data: MyMovies, error } = await supabase
      .from("MyMovies")
      .select("name, year, type, image_url , created_at");

    setMoviesList(MyMovies);
    setIsloading(false);
    console.log(MyMovies);
    console.log(error);
  }

  return (
    <>
      {isloading && <Loading />}
      <div className="mx-auto mt-12 w-[93%] sm:mt-24 sm:w-4/5">
        <div className="flex items-center justify-between py-6 md:mb-4">
          <Category />
          <Link
            to={"new"}
            className="rounded bg-indigo-500 text-sm hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            <RippleButton className="flex items-center justify-center gap-2 rounded px-3 py-2">
              <PlusIcon className="size-5" /> Add New Movie
            </RippleButton>
          </Link>
        </div>
        <div className="flex w-full flex-wrap gap-4">
          {moviesList.map((movie, index) => (
            <MovieCard key={index} {...movie} />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
}

export default MovieList;
