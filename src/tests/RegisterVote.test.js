import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import RegisterVote from "../components/RegisterVote";
import { pollData, successMessage2 } from "./mockData/mockData";

jest.mock("axios");

describe("RegisterVote Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("#DataFetch#ConditionalRendering - should fetch and display question and options", async () => {
    axios.get.mockResolvedValue({ data: pollData });

    render(<RegisterVote />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    const question = await screen.findByTestId("question-text");
    expect(question).toHaveTextContent(pollData.question);

    const options = await screen.findAllByRole("button");
    expect(options).toHaveLength(4);

    expect(options[0]).toHaveTextContent(pollData.option1);
    expect(options[1]).toHaveTextContent(pollData.option2);
    expect(options[2]).toHaveTextContent(pollData.option3);
    expect(options[3]).toHaveTextContent(pollData.option4);
  });

  it("#UpdateRecord#APIIntegration - send patch request to update vote when voted", async () => {
    axios.get.mockResolvedValue({ data: pollData });
    axios.patch.mockResolvedValue({ data: { message: successMessage2 } });

    render(<RegisterVote />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    const options = await screen.findAllByRole("button");

    // Click option2
    fireEvent.click(options[1]);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        "http://localhost:8001/polls/updateVotes",
        { selectedOption: "option2" }
      );
    });

    expect(window.alert).toHaveBeenCalledWith(successMessage2);
  });

  it("#UpdateRecord#APIIntegration - send patch request to update vote alternate option", async () => {
    axios.get.mockResolvedValue({ data: pollData });
    axios.patch.mockResolvedValue({ data: { message: successMessage2 } });

    render(<RegisterVote />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    const options = await screen.findAllByRole("button");

    // Click option4
    fireEvent.click(options[3]);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        "http://localhost:8001/polls/updateVotes",
        { selectedOption: "option4" }
      );
    });

    expect(window.alert).toHaveBeenCalledWith(successMessage2);
  });

  it("#ErrorHandling - handles error response from backend and displays error", async () => {
    axios.get.mockResolvedValue({ data: pollData });
    axios.patch.mockRejectedValueOnce({
      response: { data: { error: "Unexpected error occurred" } },
    });

    render(<RegisterVote />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    const options = await screen.findAllByRole("button");

    fireEvent.click(options[1]); // vote option2

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith("Unexpected error occurred");
  });
});