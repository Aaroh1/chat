import "./App.css";
import ChatScreen from "./Components/Screen";
import  ContextProvider  from "./context";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <ChatScreen />
      </ContextProvider>
    </div>
  );
}

export default App;
