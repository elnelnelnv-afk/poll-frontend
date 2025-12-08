import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import "../styles/ViewResult.css";
import axios from "axios";

const ViewResult = () => {
    const [poll, setPoll] = useState({});
console.log(poll);


    const fetchVoteResults = async () => {
        try {
            const { data } = await axios.get("http://localhost:8001/polls/fetch");
            setPoll(data)
        } catch (error) {
            alert(error.response.data.error)
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
            option1Votes: 4,
            option2Votes: 3,
            option3Votes: 2,
            option4Votes: 1,
            option1Percentage: 40,
            option2Percentage: 30,
            option3Percentage: 20,
            option4Percentage: 10
          }
    
          The question, options, votes and votePercentage should be displayed in respective UI elements.
          In case of request failure, display the error message in alert window.
        */
    };
    useEffect(() => {
        fetchVoteResults()
    }, [])

    return (
        <div className="result-container">
            <h2 className="result-title">Poll Results</h2>

            <div className="result-card">
                <h3 className="question" id="question">
                    {/* Display question here */}
                    {poll.question}
                </h3>

                <div>
                    {/* Template to display option details for each option */}
                    {
                        [1, 2, 3, 4].map((opt, index) => {
                            return (<div key={index} className="option">
                                <span
                                    className="option-name"
                                    data-testid="option-name"
                                >
                                    {
                                        poll[`option${opt}`]
                                    }
                                    {/* Display option here */}
                                </span>

                                <span
                                    className="vote-count"
                                    data-testid="vote-count"
                                >
                                    {/* Display respective votes here */ poll[`option${opt}Votes`] ?? 0} Votes
                                </span>

                                <span
                                    className="vote-percentage"
                                    data-testid="vote-percentage"
                                >
                                    ({/* Display respective votePercentage here */poll[`option${opt}Percentage`] ?? 0}%)
                                </span>

                                <LinearProgress
                                    className="progress-bar"
                                    data-testid="progress-bar"
                                    variant="determinate"
                                    value={poll[`option${opt}Percentage`] ?? 0}
                                />
                            </div>)
                        })
                    }



                    {/* End of the template */}
                </div>
            </div>
        </div>
    );
};

export default ViewResult;