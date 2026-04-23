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

  const page = Number(getParam("page")) || 1;
  const query = getParam("query") || "";
  const { getSearchedMovies } = useMovie();
  const { data, isLoading } = getSearchedMovies({ query, page });
  const totalResults = data?.total_results || 0;

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
          }}
        >
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined />}
            placeholder="Type movie name..."
            className="!bg-[#161616] !text-white !border-[#2a2a2a]"
            size="large"
          />
          <Button danger htmlType="submit" size="large">
            Search
          </Button>
        </form>

        {!query.trim() ? (
          <Empty description={<span className="text-gray-400">Start typing to search movies</span>} />
        ) : isLoading ? (
          <div className="py-14 flex justify-center">
            <Loading />
          </div>
        ) : data?.results?.length ? (
          <>
            <p className="text-gray-400 mb-4">{totalResults.toLocaleString()} result(s) found</p>
            <MovieView data={data.results} />
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
          <Empty description={<span className="text-gray-400">No movies found for "{query}"</span>} />
        )}
      </div>
    </div>
  );
};

export default React.memo(Search);
