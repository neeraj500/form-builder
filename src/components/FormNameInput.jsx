import React from 'react'

const FormNameInput = ({formName, setFormName}) => {
  return (
    <div>
        <input 
        type="text"
        value={formName}
        onChange={(e) => {setFormName(e.target.value)}}
        className='form-name-input'
        placeholder='Untitled'
        />
    </div>
  )
}

export default FormNameInput;
