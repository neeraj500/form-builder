"use client";

import React from "react";
import iconMapping from "../utils/iconMapping";

const QuestionTypeDropdown = ({ value, onChange, isDisabled }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm rounded px-2 py-2 outline-none"
      disabled={isDisabled}
    >
      <option data-content={iconMapping.Number} value="short_answer">Short Answer</option>
      <option value="long_answer">Long Answer</option>
      <option value="single_select">Single Select</option>
      <option value="date">Date</option>
      <option value="url">URL</option>
    </select>
  );
};

export default QuestionTypeDropdown;

// "use client";
// import React from "react";

// const QuestionTypeDropdown = ({ selectedType, onChange }) => {
//   const questionTypes = [
//     "short_answer",
//     "long_answer",
//     "single_select",
//     "date",
//     "Number",
//     "url",
//   ];

//   return (
//     <div className="relative">
//       <select
//         value={selectedType}
//         onChange={(e) => onChange(e.target.value)} // Trigger the onChange handler
//         className="text-sm px-2 py-1 border rounded focus:ring focus:ring-blue-300"
//       >
//         {questionTypes.map((type) => (
//           <option key={type} value={type}>
//             {type}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default QuestionTypeDropdown;
