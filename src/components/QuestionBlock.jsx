import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import iconMapping from "../utils/iconMapping";

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
    // Same as previously updated renderQuestionInput
    switch (question.type) {
      case "short_answer":
        return (
          <input
            type="text"
            value={question.answer || ""}
            onChange={(e) => handleUpdate("answer", e.target.value)}
            placeholder="Your answer..."
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
            placeholder="Your answer..."
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
            className={`w-full px-2 py-1 border rounded text-sm ${
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
      className="relative border rounded-md p-3 shadow-sm bg-white space-y-3 text-sm"
    >
      {/* Drag Handle Icon */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-grab"
      >
        <Image
          src={iconMapping.drag}
          alt="Drag"
          width={20}
          height={20}
          className="hover:opacity-80"
        />
      </div>

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

      <div className="flex items-center justify-between">
        {!isPreview && (
          <select
            value={question.type}
            onChange={(e) => handleUpdate("type", e.target.value)}
            className="text-sm px-2 py-1 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="short_answer">Short Answer</option>
            <option value="long_answer">Long Answer</option>
            <option value="single_select">Single Select</option>
            <option value="date">Date</option>
            <option value="url">URL</option>
          </select>
        )}
      </div>

      <input
        type="text"
        value={question.title}
        onChange={(e) => handleUpdate("title", e.target.value)}
        placeholder="Question title"
        className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
        disabled={isPreview}
      />

      <input
        type="text"
        value={question.helperText}
        onChange={(e) => handleUpdate("helperText", e.target.value)}
        placeholder="Helper text"
        className="w-full px-2 py-1 border rounded text-sm focus:ring focus:ring-blue-300"
        disabled={isPreview}
      />

      {renderQuestionInput()}
    </div>
  );
};

export default QuestionBlock;
