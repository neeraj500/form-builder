"use client";

import React from "react";

const AddQuestionButton = ({ onAdd }) => {
  return (
    <div className="relative text-sm mt-6">
      <button
        type="button"
        onClick={onAdd}  // Calls the onAdd function to add a question
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Question
      </button>
    </div>
  );
};

export default AddQuestionButton;
