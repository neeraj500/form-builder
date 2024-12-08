"use client";

import React from "react";

const Footer = ({ onSaveDraft, onPublish }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-300 shadow-sm z-50">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Save as Draft Button */}
        <button
          type="button"
          onClick={onSaveDraft}
          className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 focus:ring focus:ring-yellow-300"
        >
          Save as Draft
        </button>

        {/* Publish Button */}
        <button
          type="button"
          onClick={onPublish}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Footer;
