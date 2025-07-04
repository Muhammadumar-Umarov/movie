import { Suspense } from "react";
import MainRouter from "./pages";
import Loading from "./components/loading/Loading";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-white text-black font-[aeonik400]">
      <Suspense fallback={<Loading/>}>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;
