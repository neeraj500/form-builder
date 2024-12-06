import React , { useState } from 'react';
import QuestionTypeDropdown from '@/components/QuestionTypeDropdown';


const QuestionBlock = ({ question, updateQuestion, removeQuestion }) => {
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);

    const handleUpdate = (field, value) => {
        updateQuestion(question.id, { ...question, [field]: value });
    };

  return (
    <div className='question-block'>
        {/* question title */}
        <input 
        type="text"
        value={question.title}
        onChange={(e) => handleUpdate('title', e.target.value)}
        placeholder='Write a question'
        className='question-title-input'
        />

        {/* helper text */}
        <input 
        type="text"
        value={question.helperText}
        onChange={(e) => handleUpdate('helperText', e.target.value)}
        placeholder='helper'
        className='helper-text-input'
        />
    </div>
  )
}

export default QuestionBlock
