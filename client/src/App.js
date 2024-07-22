import "./App.css";
import Form from "./Components/Form";
// import Table from "./Components/Table";
import Table from "./Components/./v1/Table_v1";
import { PasswordProvider } from "./Components/v1/PasswordContext";

function App() {
  return (
    <PasswordProvider>
      <div className="App-container">
        <Form />
        <Table />
      </div>
    </PasswordProvider>
  );
}

export default App;
