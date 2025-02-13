import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCalculatorStore } from "../store/calculatorStore";

const CalculatorButton = ({ symbol }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: symbol });
  const handleClick = useCalculatorStore((state) => state.handleInput);

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {e.preventDefault(); handleClick(symbol)}}
      className="p-4 bg-gray-200 text-xl rounded shadow cursor-pointer"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {symbol}
    </button>
  );
};

export default CalculatorButton;
