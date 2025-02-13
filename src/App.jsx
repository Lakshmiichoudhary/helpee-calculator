import React from "react";
import Calculator from "./components/Calculator";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h2 className="p-2 text-2xl font-medium mt-10">Drag & Drop Calculator</h2>
      <Calculator />
    </div>
  );
};

export default App;