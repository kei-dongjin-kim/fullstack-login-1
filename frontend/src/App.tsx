import Routes from "./routes";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const { init } = useAuth();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
