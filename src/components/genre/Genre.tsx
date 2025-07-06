import { useParamsHook } from "@/hooks/useParamsHook";
import type { IGenre } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: undefined | IGenre[];
}

const Genre: FC<Props> = ({ data }) => {
  const { setParam, getParam, removeParam} = useParamsHook()
  const genre = getParam("genre")
  console.log(genre);

  const handleGenre = (id:number)=> {
    if(genre === id.toString()){
      removeParam("genre")
    }else{
      setParam("genre", id.toString())
    }
  }
  return (
    <div className="flex overflow-auto scrollbar-none gap-6 container mt-2  mb-10" style={{scrollbarWidth: "none"}}>
      {data?.slice(0,17)?.map((item: IGenre) => (
        <div onClick={() => handleGenre(item.id)} className={`text-nowrap select-none cursor-pointer  px-3 rounded-[14px] ${item.id.toString() === genre ? "bg-red-700 text-white " : ""}`} key={item.id}>{item.name}</div>
  ))
}
    </div >
  );
};

export default React.memo(Genre);
