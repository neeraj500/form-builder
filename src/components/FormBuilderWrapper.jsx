"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import Footer Component
import QuestionBlock from "@/components/QuestionBlock";
import AddQuestionButton from "@/components/AddQuestionButton";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const FormBuilderWrapper = () => {
  const [formName, setFormName] = useState("Untitled");
  const [questions, setQuestions] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  

  // Handlers for Save Draft and Publish
  const handleSaveDraft = () => {
    const draft = { formName, questions, status: "draft" };
    console.log("Form saved as draft:", draft);
    alert("Form saved as draft!");
  };

  const handlePublish = () => {
    const publishedForm = { formName, questions, status: "published" };
    console.log("Form published:", publishedForm);
    alert("Form published!");
  };

  // Add question
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "short_answer",
      title: "Write a Question",
      helperText: "",
      options: [],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  // Update a question
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, ...updatedQuestion } : question
      )
    );
  };

  // Remove question
  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  // Drag and drop handler
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setQuestions((prev) => {
        const oldIndex = prev.findIndex((q) => q.id === active.id);
        const newIndex = prev.findIndex((q) => q.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        formName={formName}
        setFormName={setFormName}
        onPreview={() => setIsPreview(!isPreview)}
        canPreview={questions.length > 0}
        isPreview={isPreview}
      />

      <div className="pt-16 pb-16 min-h-screen px-4 sm:px-6">
        {/* Form Builder or Preview Mode */}
        {!isPreview ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {questions.map((question) => (
                  <QuestionBlock key={question.id} question={question} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="space-y-4 mt-4">
            <h2 className="text-sm font-medium">{formName}</h2>
            {questions.map((question) => (
              <div
                key={question.id}
                className="border p-4 rounded-md shadow-sm bg-white"
              >
                <div className="mb-2 text-sm font-medium">{question.title}</div>
                {/* Render question preview */}
                {question.type === "short_answer" && (
                  <input
                    type="text"
                    placeholder="Your answer..."
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                )}
                {question.type === "long_answer" && (
                  <textarea
                    placeholder="Your answer..."
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                )}
                {question.type === "single_select" &&
                  question.options.map((option, idx) => (
                    <label key={idx} className="block text-sm">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                {question.type === "date" && (
                  <input
                    type="date"
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                )}
                {question.type === "url" && (
                  <input
                    type="url"
                    placeholder="Enter a valid URL"
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Question Button */}
        {!isPreview && <AddQuestionButton onAdd={addQuestion} />}
      </div>

      {/* Footer */}
      <Footer onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
    </>
  );
};

export default FormBuilderWrapper;
