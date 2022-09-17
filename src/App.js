import Navbar from "./components/navbar";
import Create from "./pages/create";
import List from "./pages/list";
import { useAppContext } from "./context/context";

function App() {
  let { tab } = useAppContext();
  let component = [<Create />, <List />];
  return (
    <div className="App">
      <Navbar />
      <div className="main">{component[tab]}</div>
    </div>
  );
}

export default App;
