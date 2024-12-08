"use client";

import React from "react";
import Image from "next/image";
import iconMapping from "../utils/iconMapping";
import QuestionTypeDropdown from "@/components/QuestionTypeDropdown";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const QuestionBlock = ({
  question,
  updateQuestion,
  removeQuestion,
  isPreview,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = (field, value) => {
    if (updateQuestion) {
      updateQuestion(question.id, { ...question, [field]: value });
    }
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "short_answer":
        return (
          <input
            type="text"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder=""
            className={`w-full px-2 py-1 border rounded text-sm ${
              isPreview ? "cursor-text" : "cursor-not-allowed"
            }`}
            disabled={!isPreview}
          />
        );
      case "long_answer":
        return (
          <textarea
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder=""
            className={`w-full px-2 py-1 border rounded text-sm ${
              isPreview ? "cursor-text" : "cursor-not-allowed"
            }`}
            disabled={!isPreview}
          />
        );
      case "single_select":
        return (
          <div className="space-y-2 text-sm">
            {isPreview ? (
              question.options?.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`single-select-${question.id}`}
                    value={option}
                    checked={question.answer === option}
                    onChange={() => handleUpdate("answer", option)}
                    className={`text-blue-500 ${
                      isPreview ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    disabled={!isPreview}
                  />
                  <span>{option}</span>
                </label>
              ))
            ) : (
              <div>
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleUpdate("options", [
                          ...question.options.slice(0, index),
                          e.target.value,
                          ...question.options.slice(index + 1),
                        ])
                      }
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                    <button
                      onClick={() =>
                        handleUpdate(
                          "options",
                          question.options.filter((_, idx) => idx !== index)
                        )
                      }
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    handleUpdate("options", [
                      ...question.options,
                      `Option ${question.options.length + 1}`,
                    ])
                  }
                  className="text-blue-500 text-sm"
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        );
      case "url":
        return (
          <input
            type="url"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder="Enter a valid URL"
            className={`w-full px-2 py-1 border rounded text-sm ${
              isPreview ? "cursor-text" : "cursor-not-allowed"
            }`}
            disabled={!isPreview}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            className={`w-full px-2 py-1 border rounded font-light text-gray-400 text-sm ${
              isPreview ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!isPreview}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-md p- bg-transparent space-y-3 text-sm"
    >
      {!isPreview && removeQuestion && (
        <button
          onClick={() => removeQuestion(question.id)}
          className="w-full flex justify-end"
          aria-label="Delete question"
        >
          <Image
            src={iconMapping.delete}
            alt="Delete"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-80"
          />
        </button>
      )}

      <div className="relative border rounded-md p-3 shadow-sm bg-white space-y-3 text-sm">
        <div className="absolute top-4 right-4 w-1/4 flex items-center justify-between">
          <div
            {...attributes}
            {...listeners}
            className="absolute right-0 cursor-grab"
          >
            <Image
              src={iconMapping.drag}
              alt="Drag"
              width={20}
              height={20}
              className="hover:opacity-80"
            />
          </div>
          {!isPreview && (
            <QuestionTypeDropdown
              value={question.type}
              onChange={(value) => handleUpdate("type", value)}
              isDisabled={isPreview}
            />
          )}
        </div>

        <input
          type="text"
          value={question.title}
          onChange={(e) => handleUpdate("title", e.target.value)}
          placeholder="write a question"
          className="px-2 w-full text-lg font-medium outline-none"
          disabled={isPreview}
        />

        <input
          type="text"
          value={question.helperText}
          onChange={(e) => handleUpdate("helperText", e.target.value)}
          placeholder="subquestion or caption?"
          className="px-2 w-full text-sm font-light outline-none"
          disabled={isPreview}
        />

        {renderQuestionInput()}
      </div>
    </div>
  );
};

export default QuestionBlock;
