import { useState } from "react";
import supabase from "../../supabase";
import RippleButton from "../../components/RippleButton";

export const NewMovie = () => {
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setIsLoading(true);

    const fileExt = imageFile.name.split(".").pop();

    let newMovie = {
      name: movieName,
      year: year,
      image_url: `${movieName} ${year}.${fileExt}`,
    };

    try {
      const { data, error: imageError } = await supabase.storage
        .from("Movies Images")
        .upload(newMovie.image_url, imageFile);

      console.log(imageError);
      if (data) {
        setIsLoading(false);
        setIsFileUploaded(true);
        setTimeout(() => {
          setIsFileUploaded(null);
        }, 3000);
        const { error } = await supabase.from("MyMovies").insert(newMovie);
        setMovieName("");
        setYear("");
        setImageFile("");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-gray-900 lg:px-8 dark:text-gray-100">
      <div className="relative w-full max-w-sm sm:mx-auto">
        <h2 className="mb-8 text-center text-2xl font-bold">Add New Movie</h2>
        <form className="space-y-5" action="" onSubmit={submitHandler}>
          <div>
            <div className="flex flex-col gap-2 md:flex-row">
              <input
                placeholder="Movie Name"
                name="movieName"
                type="text"
                onChange={e => {
                  setMovieName(e.target.value);
                }}
                value={movieName}
                required
                className="block w-full rounded-md border-0 bg-opacity-0 px-3 py-2 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 md:flex-[3] dark:ring-gray-700 dark:focus:ring-indigo-400"
              />
              <input
                placeholder="Year"
                name="year"
                type="text"
                onChange={e => {
                  setYear(e.target.value);
                }}
                value={year}
                required
                className="block w-full rounded-md border-0 bg-opacity-0 px-3 py-2 shadow-sm ring-1  ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 md:flex-[1] dark:ring-gray-700 dark:focus:ring-indigo-400"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6"
              >
                Upload Cover Image
              </label>
            </div>
            <div className="relative mt-2">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={e => {
                  setImageFile(e.target.files[0]);
                }}
                className="block w-full rounded-md border-0 bg-opacity-0 px-4 py-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:ring-gray-700"
              />
              {imageFile && (
                <div className="absolute right-2 top-1/2 size-14 -translate-y-1/2 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={URL.createObjectURL(imageFile)}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <RippleButton
              type="submit"
              disabled={isLoading}
              className="flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <>
                  Please wait
                  <div className="ml-1.5 flex w-[1.7em] items-center justify-between">
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 [animation-delay:-400ms]"></div>
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 [animation-delay:-200ms]"></div>
                    <div className="h-[0.35em] w-[0.35em] animate-fade rounded-full bg-neutral-100 delay-500"></div>
                  </div>
                </>
              ) : (
                "Add Movie"
              )}
            </RippleButton>
          </div>
        </form>
        {isFileUploaded && (
          <p
            className="pointer-events-none absolute -bottom-10 left-1/2 w-full
           -translate-x-1/2 text-center text-sm text-green-300"
          >
            movie Added Successfully!
          </p>
        )}
      </div>
    </div>
  );
};
