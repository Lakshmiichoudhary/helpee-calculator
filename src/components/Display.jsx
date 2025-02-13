import React from "react";
import { useCalculatorStore } from "../store/calculatorStore";

const Display = () => {
  const { text, result, handleClear, handleResult } = useCalculatorStore();

  return (
    <div className="p-4 bg-white border border-gray-300 mb-2">
      <div className="text-lg font-semibold text-right">{text}</div>
      <div className="text-base font-medium text-right text-gray-600">{result}</div>
      <div className="flex gap-2 mt-2">
        <button className="p-2 bg-red-400 text-white rounded" onClick={handleClear}>C</button>
        <button className="p-2 bg-blue-400 text-white rounded" onClick={handleResult}>=</button>
      </div>
    </div>
  );
};

export default Display;