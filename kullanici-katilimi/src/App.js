import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form.js";
import axios from "axios";
import * as Yup from "yup";

function App() {
  return (
    <div className="App">
      <h1>WORKİNTECH SÖZLEŞMESİ</h1>
      <Form />
    </div>
  );
}

export default App;
