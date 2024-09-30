import { useEffect, useState } from "react";
import supabase from "../../supabase";

export default function MovieCard(props) {
  const { name, year, image_url } = props;
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (image_url) {
      getImages(image_url);
    }
  }, []);

  const getImages = async path => {
    try {
      const { data, error } = await supabase.storage
        .from("Movies Images")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-2 w-[calc(50%-0.5rem)] cursor-pointer sm:w-[calc(33.33333%-0.66667rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] xl:w-[calc(16.66666%-0.83334rem)]">
      {isLoading ? (
        <img
          src={"src/assets/placeholder-image.jpg"}
          alt=""
          className="animate-pulse rounded object-cover"
        />
      ) : (
        <img
          src={imageUrl || "src/assets/placeholder-image.jpg"}
          alt=""
          className="aspect-[2/3] select-none rounded object-cover [-webkit-user-drag:none]"
        />
      )}

      <h1 className="mt-2 text-center text-xs font-medium dark:text-white">
        {name + " " + year}
      </h1>
    </div>
  );
}
