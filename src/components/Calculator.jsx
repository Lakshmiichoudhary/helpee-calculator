import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CalculatorButton from "./CalculatorButton";
import Display from "./Display";
import { useCalculatorStore } from "../store/calculatorStore";

const Calculator = () => {
    const { buttons, handleDragEnd, handleInput } = useCalculatorStore();
    const darkMode = useCalculatorStore((state) => state.darkMode);
    const toggleDarkMode = useCalculatorStore((state) => state.toggleDarkMode);

  return (
    <div className={`border p-4 rounded-lg shadow-xl w-[60%] lg:w-[30%] mt-4 transition-all duration-300 ${darkMode ? "bg-gray-900 text-black" : "bg-gray-50 text-black"}`}>
    <button 
      className="mb-3 p-2 border rounded-md bg-gray-300 dark:bg-gray-800 dark:text-white"
      onClick={toggleDarkMode}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
    
    <Display />
    
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={buttons} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-4 gap-2 p-3">
          {buttons.length > 0 ? (
            buttons.map((symbol) => (
              <CalculatorButton onClick={() => handleInput(symbol)} key={symbol} symbol={symbol} />
            ))
          ) : (
            <p>Loading buttons...</p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  </div>
);
};

export default Calculator;