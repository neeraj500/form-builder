"use client";

import React from "react";
import iconMapping from "../utils/iconMapping";

const Navbar = ({ formName, setFormName, onPreview, isPreview, canPreview }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-300 shadow-sm z-50">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Form Name Input */}
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="text-lg bg-slate-300 rounded-sm focus:border-gray-500 outline-none max-w-xs sm:max-w-md"
          placeholder="Untitled"
          disabled={isPreview} // Disable editing the name in Preview Mode
        />

        {/* Preview/Go Back Button */}
        <button
          type="button"
          onClick={onPreview}
          disabled={!canPreview && !isPreview}
          className={`ml-4 px-4 py-2 flex items-center gap-2 text-white text-sm rounded-lg ${
            canPreview || isPreview ? "bg-green-500 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isPreview ? (
            <>
              <img src={iconMapping.back} alt="Go Back" className="w-4 h-4" />
              Go Back
            </>
          ) : (
            "Preview"
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
