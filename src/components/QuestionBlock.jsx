"use client";

import React from "react";
import Image from "next/image";
import iconMapping from "../utils/iconMapping";

const QuestionBlock = ({ question, updateQuestion, removeQuestion }) => {
  const handleUpdate = (field, value) => {
    updateQuestion(question.id, { ...question, [field]: value });
  };

  // Function to render the input field based on question type
  const renderQuestionInput = () => {
    switch (question.type) {
      case "short_answer":
        return (
          <input
            type="text"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder="Answer in max 20 words"
            className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
          />
        );
      case "long_answer":
        return (
          <textarea
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder="Answer in max 500 words"
            className="w-full h-24 px-2 py-1 border rounded resize-none text-sm focus:ring focus:ring-blue-300"
          />
        );
      case "single_select":
        return (
          <div className="space-y-2 text-sm">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`single-select-${question.id}`}
                  value={option}
                  checked={question.answer === option}
                  onChange={() => handleUpdate("answer", option)}
                  className="text-blue-500 focus:ring focus:ring-blue-300"
                />
                <span>{option}</span>
              </label>
            ))}
            <button
              type="button"
              onClick={() => handleUpdate("options", [...question.options, `Option ${question.options.length + 1}`])}
              className="mt-2 text-blue-500"
            >
              Add Option
            </button>
          </div>
        );
      case "url":
        return (
          <input
            type="url"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder="Enter a valid URL"
            className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative border rounded-md p-3 shadow-sm bg-white space-y-3 text-sm">
      {/* Delete Icon - Top Right */}
      <button onClick={() => removeQuestion(question.id)} className="w-full flex justify-end" aria-label="Delete question">
        <Image
          src={iconMapping.delete}
          alt="Delete"
          width={20}
          height={20}
          className="cursor-pointer hover:opacity-80"
        />
      </button>

      {/* Question Type Dropdown (Inside Question Block) */}
      <div className="flex items-center justify-between">
        <select
          value={question.type}
          onChange={(e) => handleUpdate("type", e.target.value)}  // Trigger the onChange handler
          className="text-sm px-2 py-1 border rounded focus:ring focus:ring-blue-300"
        >
          <option value="short_answer">Short Answer</option>
          <option value="long_answer">Long Answer</option>
          <option value="single_select">Single Select</option>
          <option value="date">Date</option>
          <option value="url">URL</option>
        </select>
      </div>

      {/* Question Title Input */}
      <input
        type="text"
        value={question.title}
        onChange={(e) => handleUpdate("title", e.target.value)}
        placeholder="Question title"
        className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
      />

      {/* Helper Text */}
      <input
        type="text"
        value={question.helperText}
        onChange={(e) => handleUpdate("helperText", e.target.value)}
        placeholder="Helper text"
        className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
      />

      {/* Render Question Input */}
      {renderQuestionInput()}

    </div>
  );
};

export default QuestionBlock;
