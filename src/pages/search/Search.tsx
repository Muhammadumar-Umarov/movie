import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import Loading from "@/components/loading/Loading";
import { useParamsHook } from "@/hooks/useParamsHook";
import { Button, Empty, Input, Pagination } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const { getParam, setParam } = useParamsHook();
  const [searchValue, setSearchValue] = useState(getParam("query") || "");
  const { getMovies } = useMovie()
  const { data } = getMovies({ page: 1, without_genres: "18,36,27,10749" })

  const page = Number(getParam("page")) || 1;
  const query = getParam("query") || "";
  const { getSearchedMovies } = useMovie();
  const { data: searchedData, isLoading } = getSearchedMovies({ query, page });
  const totalResults = searchedData?.total_results || 0;
  const [show, setShow] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Search Movies</h1>
        <p className="text-gray-400 mb-8">Find movies by title and save them to your favorites.</p>

        <form
          className="flex gap-2 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            setParam("query", searchValue.trim());
            setParam("page", "1");
            setShow(false);
          }}
        >
          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            prefix={<SearchOutlined />}
            placeholder="Type movie name..."
            className="search-input !bg-[#161616] !text-white !border-[#2a2a2a]"
            size="large"
          />
          <Button danger htmlType="submit" size="large">
            Search
          </Button>
        </form>

        {!query.trim() ? (
          <>
            <Empty description={<span className="text-gray-400">Start typing to search movies</span>} />
            <div className="container mt-40 mx-auto px-6 py-16 xl:mt-40 sm:mt-10 ">
            <h2 className="text-3xl pl-4 pb-4 font-bold mb-4">See other movies</h2>
              <MovieView data={data?.results?.slice(0, 12)} />
            </div>
          </>
        ) : isLoading ? (
          <div className="py-14 flex justify-center">
            <Loading />
          </div>
        ) : searchedData?.results?.length ? (
          <>
            <p className="text-gray-400 mb-4">{totalResults.toLocaleString()} result(s) found</p>
            {/* {setShow(false)} */}
            <MovieView data={searchedData.results} />
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                pageSize={20}
                onChange={(value) => setParam("page", value.toString())}
                total={totalResults <= 10000 ? totalResults : 10000}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <>
            <Empty description={<span className="text-gray-400">No movies found for "{query}"</span>} />
            <div className="container mt-40 mx-auto px-6 py-8 xl:mt-40 sm:mt-10">
              <h2 className="text-3xl pl-4 pb-4 font-bold mb-4">See other movies</h2>
              <MovieView data={data?.results?.slice(0, 12)} />
            </div>
          </>

        )}
      </div>

      {/* {
        show && (
          <div className="container mx-auto px-6 py-8">
            <MovieView data={data?.results?.slice(0, 12)} />
          </div>
        )
      } */}
    </div>
  );
};

export default React.memo(Search);
