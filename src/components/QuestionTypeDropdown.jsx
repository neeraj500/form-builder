"use client";
import React from "react";

const QuestionTypeDropdown = ({ selectedType, onChange }) => {
  const questionTypes = [
    "short_answer",
    "long_answer",
    "single_select",
    "date",
    "Number",
    "url",
  ];

  return (
    <div className="relative">
      <select
        value={selectedType}
        onChange={(e) => onChange(e.target.value)} // Trigger the onChange handler
        className="text-sm px-2 py-1 border rounded focus:ring focus:ring-blue-300"
      >
        {questionTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuestionTypeDropdown;
