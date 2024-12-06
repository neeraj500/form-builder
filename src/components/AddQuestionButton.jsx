import React from 'react'

const AddQuestionButton = ({ onAdd }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const questionTypes = [
        'ShortAnswer',
        'LongAnswer',
        'Single Select',
        'Number',
        'URL'
    ];

    
  return (
    <div className='add-question-button'>
      <button
      type='button'
      onClick={() => setShowDropdown((prev) => !prev)}
      className='add-question-button'
      >
        Add Question
      </button>

      {/* dropdown menu */}
      {
        showDropdown &&  (
            <div className='question-type-dropdown'>
                {questionTypes.map((type) => (
                    <button
                    key={type}
                    type='button'
                    onClick={() =>{
                        onAdd(type);
                        setShowDropdown(false);
                    }}
                    className="dropdown-item"
                    >
                        {type}
                    </button>
                ))}
            </div>
        )
      }
    </div>
  )
}

export default AddQuestionButton;
