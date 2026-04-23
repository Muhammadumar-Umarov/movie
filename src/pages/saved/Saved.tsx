import MovieView from "@/components/movie-view/MovieView";
import { useStore } from "@/zustand";
import React, { useEffect } from "react";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const navigate = useNavigate();
  const saved = useStore((state) => state.saved);
  const setSaved = useStore((state) => state.setSaved);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cached = localStorage.getItem("savedMovies");
    if (cached) {
      setSaved(JSON.parse(cached));
    }
  }, [setSaved]);

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white text-black">Saved Movies</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {saved.length} movie{saved.length === 1 ? "" : "s"} in your favorites list
        </p>

        {saved.length ? (
          <MovieView data={saved} />
        ) : (
          <div className="py-24">
            <Empty
              description={<span className="dark:text-gray-300 text-gray-600">No saved movies yet</span>}
            >
              <Button type="primary" danger onClick={() => navigate("/movies")}>
                Browse Movies
              </Button>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Saved);
