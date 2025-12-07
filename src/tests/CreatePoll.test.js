import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CreatePoll from "../components/CreatePoll";
import { pollData, successMessage } from "./mockData/mockData";

jest.mock("axios");

describe("CreatePoll Component", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  it("#FormValidation displays alert on invalid input fields", async () => {
    render(<CreatePoll />);

    // Click submit with empty form
    fireEvent.click(screen.getByTestId("create-poll-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please fill in all the fields");
    });

    // Fill only question field
    fireEvent.change(screen.getByLabelText("Question:"), {
      target: { value: pollData.question },
    });

    fireEvent.click(screen.getByTestId("create-poll-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please fill in all the fields");
    });
  });

  it("#FormSubmit#APIIntegration sends pollData to backend with API PUT request", async () => {
    axios.put.mockResolvedValue({ data: { message: successMessage } });

    render(<CreatePoll />);

    // Fill question
    fireEvent.change(screen.getByLabelText("Question:"), {
      target: { value: pollData.question },
    });

    // Fill options (textboxes except first one)
    const options = screen.getAllByRole("textbox").slice(1);

    fireEvent.change(options[0], { target: { value: pollData.option1 } });
    fireEvent.change(options[1], { target: { value: pollData.option2 } });
    fireEvent.change(options[2], { target: { value: pollData.option3 } });
    fireEvent.change(options[3], { target: { value: pollData.option4 } });

    fireEvent.click(screen.getByTestId("create-poll-button"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:8001/polls/create",
        {
          question: pollData.question,
          option1: pollData.option1,
          option2: pollData.option2,
          option3: pollData.option3,
          option4: pollData.option4,
        }
      );
    });

    expect(window.alert).toHaveBeenCalledWith(successMessage);
  });

  it("#ErrorHandling handles error response from backend and displays error in alert", async () => {
    axios.put.mockRejectedValueOnce({
      response: { data: { error: "Unexpected error occurred" } },
    });

    render(<CreatePoll />);

    // Fill question
    fireEvent.change(screen.getByLabelText("Question:"), {
      target: { value: pollData.question },
    });

    // Fill options
    const options = screen.getAllByRole("textbox").slice(1);

    fireEvent.change(options[0], { target: { value: pollData.option1 } });
    fireEvent.change(options[1], { target: { value: pollData.option2 } });
    fireEvent.change(options[2], { target: { value: pollData.option3 } });
    fireEvent.change(options[3], { target: { value: pollData.option4 } });

    fireEvent.click(screen.getByTestId("create-poll-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Unexpected error occurred");
    });
  });
});