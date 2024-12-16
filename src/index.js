import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import React, { useState } from "react";
// import { ChakraProvider } from '@chakra-ui/react';  // Удалена лишняя запятая
// import Editor from "./Components/Editor/Editor";

// function App () {
//   const [language, setLanguage] = useState("python");
//   const [code, setCode] = useState("// Type your code here");

//   return (
//     <ChakraProvider>
//       <div>
//         <h1>Online Code Editor</h1>
//         <Editor language={language} code={code} onCodeChange={setCode} />
//       </div>
//     </ChakraProvider>
//   );
// };

// export default App;
