import axios from "axios";
import React, { useEffect, useState } from "react";
// import "../styles/RegisterVote.css";

const RegisterVote = () => {
    const [poll, setPoll] = useState({})

    const fetchPoll = async () => {
        try {
            const { data } = await axios.get("http://localhost:8001/polls/fetch");
            setPoll(data)
        } catch (error) {
            alert(error.response.data)
        }
        /* 
          This function should be invoked when this component is initialized.
          Should fetch the poll data by sending a GET request with API ->
          http://localhost:8001/polls/fetch
    
          Sample response:
          {
            question: 'Which is the best front-end technology?',
            option1: 'React',
            option2: 'Angular',
            option3: 'Vue',
            option4: 'Next',
            option1Votes: 0,
            option2Votes: 0,
            option3Votes: 0,
            option4Votes: 0,
            option1Percentage: 0,
            option2Percentage: 0,
            option3Percentage: 0,
            option4Percentage: 0
          }
    
          The question and options should be displayed in respective UI elements.
        */
    };

    useEffect(() => {
        fetchPoll()
    }, [])

    const registerVote =async (e) => {
        console.log("Cliked ", e.target.id);
        try {
            const {data} = await axios.patch("http://localhost:8001/polls/updateVotes",{
            selectedOption: e.target.id
          });
          alert(data.message)
        } catch (error) {
            alert(error?.response?.data?.error || error?.message)
        }
        
        /*
          This function should be invoked on clicking any option button.
          Should send the name of selected option to backend in order to register the vote.
          
          Use a PATCH request with API -> http://localhost:8001/polls/updateVotes
    
          Sample request body:
          {
            selectedoption: "option1"
          }
    
          Where 'selectedoption' can be ("option1", "option2", "option3" or "option4")
    
          On successful request: Display response message in alert and reset the form.
          On request failure: Display the error message in the alert window.
        */
    };

    return (
        <div className="poll-container">
            <h2>Leave your Response</h2>

            <h3
                className="poll-question"
                data-testid="question-text"
            >
                {poll.question}
                {/* Display question here */}
            </h3>

            <div className="options-container">
                <button
                    className="option-button"
                    id="option1"
                    onClick={registerVote}
                /* Clicking any button should invoke the function "registerVote" with id of selected button */
                >
                    {poll.option1}
                    {/* Display option1 here */}
                </button>

                <button
                    className="option-button"
                    id="option2"
                    onClick={registerVote}

                /* Clicking any button should invoke the function "registerVote" with id of selected button */
                >
                    {poll.option2}
                    {/* Display option2 here */}
                </button>

                <button
                    className="option-button"
                    id="option3"
                    onClick={registerVote}

                /* Clicking any button should invoke the function "registerVote" with id of selected button */
                >
                    {poll.option3}
                    {/* Display option3 here */}
                </button>

                <button
                    className="option-button"
                    id="option4"
                    onClick={registerVote}

                /* Clicking any button should invoke the function "registerVote" with id of selected button */
                >
                    {poll.option4}
                    {/* Display option4 here */}
                </button>
            </div>
        </div>
    );
};

export default RegisterVote;