import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { api } from '../../api';
import { db, addDoc, collection } from '../FireBase/Firebase';
import axios from 'axios';
import * as ts from "typescript"; // Импорт библиотеки TypeScript
import './Editor.css'

const CodeEditor = () => {
  const [code, setCode] = useState("// Type your code here");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark"); // Тема по умолчанию
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    // Применяем класс темы на весь сайт
    document.body.className = selectedTheme;
  };

  const saveResult = async (resultData) => {
    let firebaseSuccess = false;
    let localServerSuccess = false;

    try {
      await addDoc(collection(db, "results"), resultData);
      firebaseSuccess = true;
      console.log("Saved to Firebase successfully.");
    } catch (firebaseError) {
      console.error("Error saving to Firebase:", firebaseError);
    }

    try {
      await axios.post("http://localhost:5000/results", resultData);
      localServerSuccess = true;
      console.log("Saved to local server successfully.");
    } catch (localServerError) {
      console.warn("Local server is unavailable:", localServerError);
    }

    return { firebaseSuccess, localServerSuccess };
  };

  const handleRun = async () => {
    setIsLoading(true);
    try {
      console.log("Running code...");
      
      let codeToRun = code; // Код, который будет отправлен на выполнение
      
      // Если выбран TypeScript, транспилируем его в JavaScript
      if (language === "typescript") {
        try {
          const transpiled = ts.transpileModule(code, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
          });
          codeToRun = transpiled.outputText; // Получаем транспилированный JavaScript-код
          console.log("Transpiled TypeScript:", codeToRun);
        } catch (tsError) {
          console.error("TypeScript transpilation error:", tsError);
          setOutput("TypeScript transpilation error");
          setIsLoading(false);
          return;
        }
      }
  
      // Отправляем код на выполнение через API
      const result = await api(language === "typescript" ? "javascript" : language, codeToRun);
  
      const cleanedOutput =
        result.output?.trim() || result.stdout?.trim() || "No output";
  
      const resultData = {
        language,
        code,
        output: cleanedOutput,
        error: result.error || null,
        timestamp: new Date().toISOString(),    
      };
  
      const { firebaseSuccess, localServerSuccess } = await saveResult(resultData);
  
      if (firebaseSuccess || localServerSuccess) {
        setOutput(cleanedOutput);
        console.log("Output updated:", cleanedOutput);
      } else {
        setOutput("Error saving results to all destinations");
      }
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Применяем начальную тему при монтировании компонента
    document.body.className = theme;
  }, [theme]);

  return (
    // верстка
    <div>
      <div>
        <label>Select Language: </label>
        <select className='select' value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>

      <div>
        <label>Select Theme: </label>
        <select className='select' value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="high-contrast">High Contrast</option>
        </select>
      </div>

      <Editor
        height="500px"
        language={language}
        theme={theme === "dark" ? "vs-dark" : theme === "high-contrast" ? "hc-black" : "vs"} // Устанавливаем тему только для Monaco Editor
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button className='button button1' onClick={handleRun} disabled={isLoading}>
        {isLoading ? "Running..." : "Run"}
      </button>

      <div>
        {output ? <pre>{output}</pre> : <p>No output yet. Run your code!</p>}
      </div>
    </div>
  );
};

export default CodeEditor;
