import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ViewResult from "../components/ViewResult";
import { pollData } from "./mockData/mockData";

jest.mock("axios");

describe("ViewResult Component", () => {
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve({ data: pollData }));
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("#DataFetch#DataDisplay should fetch and display question, options, vote counts and vote percentage", async () => {
    render(<ViewResult />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    // Question
    const question = await screen.findByText(pollData.question);
    expect(question).toBeInTheDocument();

    // Option elements
    const optionNames = await screen.findAllByTestId("option-name");
    const voteCounts = await screen.findAllByTestId("vote-count");
    const votePercentages = await screen.findAllByTestId("vote-percentage");

    const options = [
      pollData.option1,
      pollData.option2,
      pollData.option3,
      pollData.option4,
    ];

    const votes = [
      pollData.option1Votes,
      pollData.option2Votes,
      pollData.option3Votes,
      pollData.option4Votes,
    ];

    const percentages = [
      pollData.option1Percentage,
      pollData.option2Percentage,
      pollData.option3Percentage,
      pollData.option4Percentage,
    ];

    options.forEach((option, index) => {
      expect(optionNames[index]).toHaveTextContent(`${options[index]}`);
      expect(voteCounts[index]).toHaveTextContent(`${votes[index]} Votes`);
      expect(votePercentages[index]).toHaveTextContent(`${percentages[index]}%`);
    });
  });

  it("#DataFetch#DataDisplay should render ProgressBars with correct values", async () => {
    render(<ViewResult />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    const progressBars = await screen.findAllByTestId("progress-bar");

    const percentages = [
      pollData.option1Percentage,
      pollData.option2Percentage,
      pollData.option3Percentage,
      pollData.option4Percentage,
    ];

    progressBars.forEach((progressBar, index) => {
      expect(
        progressBar.getAttribute("aria-valuenow") == percentages[index]
      ).toBe(true);
    });
  });

  it("#ErrorHandling should handle error response and display alert", async () => {
    axios.get.mockRejectedValueOnce({
      response: { data: { error: "Unexpected error occurred" } },
    });

    render(<ViewResult />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith("Unexpected error occurred");
  });
});