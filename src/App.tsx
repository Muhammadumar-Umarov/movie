import { Suspense } from "react";
import MainRouter from "./pages";
import Loading from "./components/loading/Loading";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-[aeonik400] dark">
      <Suspense fallback={<Loading/>}>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;
