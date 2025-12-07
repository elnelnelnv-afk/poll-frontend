import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import App from "../App";

// Mock component display text
const CreatePoll_mock_data = "Public Poll Mock for CreatePoll Component";
const RegisterVote_mock_data = "Public Poll Mock for RegisterVote Component";
const ViewResult_mock_data = "Public Poll Mock for ViewResult Component";

// Mock CreatePoll component
jest.mock("../components/CreatePoll", () => {
  return function CreatePoll() {
    return <div>{CreatePoll_mock_data}</div>;
  };
});

// Mock RegisterVote component
jest.mock("../components/RegisterVote", () => {
  return function RegisterVote() {
    return <div>{RegisterVote_mock_data}</div>;
  };
});

// Mock ViewResult component
jest.mock("../components/ViewResult", () => {
  return function ViewResult() {
    return <div>{ViewResult_mock_data}</div>;
  };
});

describe("Testing App component", () => {
  test("#Router#ComponentRender - Renders title and navlinks in Navbar", () => {
    render(<App />);

    const title = screen.getByText("Public Poll");
    expect(title).toBeInTheDocument();

    // Navbar links
    const CreatePollLink = screen.getByText("Create Poll");
    const RegisterVoteLink = screen.getByText("Register Vote");
    const ViewResultLink = screen.getByText("View Results");

    expect(CreatePollLink).toBeInTheDocument();
    expect(RegisterVoteLink).toBeInTheDocument();
    expect(ViewResultLink).toBeInTheDocument();

    // Check href attributes
    expect(CreatePollLink).toHaveAttribute("href", "/");
    expect(RegisterVoteLink).toHaveAttribute("href", "/register-vote");
    expect(ViewResultLink).toHaveAttribute("href", "/view-result");
  });

  test("#Router#ComponentRender - Renders CreatePoll component as default route", async () => {
    await act(async () => {
      render(<App />);
    });

    const textElement = await waitFor(() =>
      screen.getByText(CreatePoll_mock_data)
    );

    expect(textElement).toBeInTheDocument();
  });

  test("#Router#ComponentRender - Renders RegisterVote component in /register-vote route", async () => {
    await act(async () => {
      render(<App />);
    });

    const RegisterVoteLink = screen.getByText("Register Vote");
    fireEvent.click(RegisterVoteLink);

    const textElement = await waitFor(() =>
      screen.getByText(RegisterVote_mock_data)
    );

    expect(textElement).toBeInTheDocument();
  });

  test("#Router#ComponentRender - Renders ViewResult component in /view-result route", async () => {
    await act(async () => {
      render(<App />);
    });

    const ViewResultLink = screen.getByText("View Results");
    fireEvent.click(ViewResultLink);

    const textElement = await waitFor(() =>
      screen.getByText(ViewResult_mock_data)
    );

    expect(textElement).toBeInTheDocument();
  });
});