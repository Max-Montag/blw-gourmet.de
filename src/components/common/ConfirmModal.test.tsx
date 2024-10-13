import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when show is false", () => {
    render(
      <ConfirmModal
        show={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).toBeNull();
  });

  it("renders the modal when show is true", () => {
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();
  });

  it("displays the default text when text is not provided", () => {
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const defaultText = screen.getByText(
      "Bist du sicher, dass du diese Aktion durchführen möchtest?"
    );
    expect(defaultText).toBeInTheDocument();
  });

  it("displays custom text when text is provided", () => {
    const customText = "Willst du wirklich fortfahren?";
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        text={customText}
      />
    );
    const textElement = screen.getByText(customText);
    expect(textElement).toBeInTheDocument();
  });

  it("displays the default button text when buttonText is not provided", () => {
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const defaultButtonText = screen.getByText("Löschen");
    expect(defaultButtonText).toBeInTheDocument();
  });

  it("displays custom button text when buttonText is provided", () => {
    const customButtonText = "Ich bin einverstanden <3";
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        buttonText={customButtonText}
      />
    );
    const buttonTextElement = screen.getByText(customButtonText);
    expect(buttonTextElement).toBeInTheDocument();
  });

  it("calls onClose when the cancel button is clicked", () => {
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const cancelButton = screen.getByText("Abbrechen");
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the confirm button is clicked", () => {
    render(
      <ConfirmModal
        show={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    const confirmButton = screen.getByText("Löschen");
    fireEvent.click(confirmButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
