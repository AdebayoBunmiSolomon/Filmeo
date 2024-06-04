import { useLikedMovieStore } from "../store";

export const useLikedMovie = () => {
  const { likedMovie, setLikedMovie } = useLikedMovieStore();

  const likeAMovie = (id: number, title: string, videoImgUrl: string) => {
    const isMovieExist = likedMovie.some((items) => items.id === id);
    if (isMovieExist) {
      const updatedMovies = likedMovie.filter((movie) => movie.id !== id);
      setLikedMovie(updatedMovies);
    } else {
      setLikedMovie([
        ...likedMovie,
        {
          id: id,
          title: title,
          videoImgUrl: videoImgUrl,
        },
      ]);
    }
  };

  return {
    likeAMovie,
    likedMovie,
  };
};
