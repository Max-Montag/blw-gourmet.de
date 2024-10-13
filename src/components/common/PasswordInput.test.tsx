import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

jest.mock("react-icons/fa", () => ({
  FaRegEye: () => <div data-testid="FaRegEye" />,
  FaRegEyeSlash: () => <div data-testid="FaRegEyeSlash" />,
}));

describe("PasswordInput", () => {
  test("renders input field with type 'password' by default", () => {
    render(<PasswordInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("renders FaRegEye icon initially", () => {
    render(<PasswordInput />);
    expect(screen.getByTestId("FaRegEye")).toBeInTheDocument();
  });

  test("toggles password visibility when the button is clicked", () => {
    render(<PasswordInput />);
    const inputElement = screen.getByRole("textbox");
    const toggleButton = screen.getByRole("button");

    expect(inputElement).toHaveAttribute("type", "password");
    expect(screen.getByTestId("FaRegEye")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");
    expect(screen.getByTestId("FaRegEyeSlash")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
    expect(screen.getByTestId("FaRegEye")).toBeInTheDocument();
  });

  test("passes additional props to the input element", () => {
    render(<PasswordInput placeholder="Enter your password" />);
    const inputElement = screen.getByPlaceholderText("Enter your password");
    expect(inputElement).toBeInTheDocument();
  });

  test("applies custom className to the input element", () => {
    render(<PasswordInput className="custom-class" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });

  test("uses forwarded ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
