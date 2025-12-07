import React, { useState } from "react";
import "../styles/createPoll.css";
import axios from "axios";

const CreatePoll = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);


    const handleChange = (index, value) => {
        /* Code goes here for onChange event for the input fields */
        setOptions(prev => {
            const arr = [...prev]
            arr[index] = value;
            return arr
        })
    };

    const isNotValid = (data) => (data ?? "").toString().trim().length === 0

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            question,
            options
        });

        const anyInputsInvalid = [question, ...options].some(data => isNotValid(data))

        if (anyInputsInvalid) {
            alert("Please fill in all the fields")
        }

        try {
            const { data } = await axios.put('http://localhost:8001/polls/create', {
                question,
                option1: options[0],
                option2: options[1],
                option3: options[2],
                option4: options[3],
            });

            alert(data.message)
            setQuestion("")
            setOptions(["", "", "", ""])

        } catch (error) {
            alert(error.response.data.error)

        }



        /* 
          Used to send poll data to the backend server. Should be called when the form is submitted.
          Validate the form fields on submission - If any form fields is empty or with empty white spaces 
          display an alert "Please fill in all the fields".
          
          On successful validation, save poll details by sending a PUT request with API -> 
          http://localhost:8001/polls/create
          
          Sample request body:
          {
            question: 'Which is the best front-end technology?',
            option1: "React",
            option2: "Angular",
            option3: "Vue",
            option4: "Next",
          }
    
          On successful request: Display response message in alert and reset the form.
          On request failure: Display the error message in the alert window.
        */
    };

    return (
        <div className="form-container">
            <h2>Create Poll</h2>

            <form
                onSubmit={handleSubmit}
            /* Submitting the form should call the function "handleSubmit" */
            >
                <label htmlFor="question" className="form-label">Question:</label>
                <input
                    type="text"
                    id="question"
                    className="question-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <br />

                <label className="form-label">Options:</label>
                <div className="options-container">
                    {
                        options.map((opt, index) => (<input
                            key={index}
                            value={opt}
                            onChange={(e) => handleChange(index, e.target.value)}
                            type="text"
                            className="option-input" />))
                    }
                </div>

                <button
                    type="submit"
                    className="form-button"
                    data-testid="create-poll-button"
                /* Clicking the button should invoke the function "handleSubmit" */
                >
                    Create Poll
                </button>
            </form>
        </div>
    );
};

export default CreatePoll;