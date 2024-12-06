import React, {useState} from 'react';
import FormNameInput from "@/components/FormNameInput";
import PreviewButton from "@/components/PreviewButton";
import AddQuestionButton from "@/components/AddQuestionButton";



const FormBuilderWrapper = () => {
    const [formName, setFormName] = useState("Untitled");
    const [questions, setQuestions] = useState([]);


    const addQuestion = (type) => {
        const newQuestion = {
            id: Date.now(),
            type,
            title: "Write a Question",
            helperText: '',
            options: type === 'single_select' ? ['Option 1','Option 2'] : null,
        };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <div className="form-builder-wrapper">
            {/* header section */}
            <div>
                <FormNameInput formName={formName} setFormName={setFormName} />
                <PreviewButton />
            </div>

            {/* central section */}
            <div>
                {questions.length === 0? (
                    <AddQuestionButton onAdd={addQuestion} />
                ): (
                    <div>
                    {questions.map((question) => (
                        <div key={question.id}>{question.title}</div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormBuilderWrapper;