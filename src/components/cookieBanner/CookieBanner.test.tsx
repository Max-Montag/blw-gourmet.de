import { render, screen, fireEvent } from "@testing-library/react";
import CookieBanner from "./CookieBanner";
import { useCookieConsent } from "@/context/CookieConsentContext";

jest.mock("@/context/CookieConsentContext", () => ({
  useCookieConsent: jest.fn(),
}));

describe("CookieBanner", () => {
  const mockSetNecessary = jest.fn();
  const mockSetOptional = jest.fn();
  const mockSetThirdParty = jest.fn();
  const mockSetCookie = jest.fn();

  beforeEach(() => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      necessary: false,
      optional: false,
      thirdParty: false,
      setNecessary: mockSetNecessary,
      setOptional: mockSetOptional,
      setThirdParty: mockSetThirdParty,
      setCookie: mockSetCookie,
    });

    // mock document.cookie
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows the banner when no cookie is set", () => {
    render(<CookieBanner />);
    expect(screen.getByText(/Wir verwenden Cookies/i)).toBeInTheDocument();
  });

  it("does not show the banner if the cookie has already been set", () => {
    document.cookie = "cookieConsent=true";
    render(<CookieBanner />);
    expect(screen.queryByText(/Wir verwenden Cookies/i)).toBeNull();
  });

  it("sets all cookies when accept all is clicked", () => {
    render(<CookieBanner />);
    const acceptAllButton = screen.getByText("Alle akzeptieren");

    fireEvent.click(acceptAllButton);

    expect(mockSetNecessary).toHaveBeenCalledWith(true);
    expect(mockSetOptional).toHaveBeenCalledWith(true);
    expect(mockSetThirdParty).toHaveBeenCalledWith(true);
    expect(mockSetCookie).toHaveBeenCalled();
  });

  it("saves preferences when save is clicked", () => {
    render(<CookieBanner />);
    const saveButton = screen.getByText("Speichern");

    fireEvent.click(saveButton);

    expect(mockSetCookie).toHaveBeenCalled();
    expect(screen.queryByText(/Wir verwenden Cookies/i)).toBeNull();
  });

  it("changes cookie preferences when toggles are used", () => {
    render(<CookieBanner />);

    const necessaryToggle = screen.getByLabelText("Notwendige Cookies");
    const optionalToggle = screen.getByLabelText("Optionale Cookies");
    const thirdPartyToggle = screen.getByLabelText("Drittanbieter-Cookies");

    fireEvent.click(necessaryToggle);
    expect(mockSetNecessary).toHaveBeenCalledWith(true);

    fireEvent.click(optionalToggle);
    expect(mockSetOptional).toHaveBeenCalledWith(true);

    fireEvent.click(thirdPartyToggle);
    expect(mockSetThirdParty).toHaveBeenCalledWith(true);
  });

  it("disables optional and third-party cookies when necessary cookies are disabled", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      necessary: false,
      optional: true,
      thirdParty: true,
      setNecessary: mockSetNecessary,
      setOptional: mockSetOptional,
      setThirdParty: mockSetThirdParty,
      setCookie: mockSetCookie,
    });

    render(<CookieBanner />);

    const optionalToggle = screen.getByText("Optionale Cookies");
    const thirdPartyToggle = screen.getByText("Drittanbieter-Cookies");

    fireEvent.click(optionalToggle);
    expect(mockSetOptional).toHaveBeenCalledWith(false);

    fireEvent.click(thirdPartyToggle);
    expect(mockSetThirdParty).toHaveBeenCalledWith(false);
  });
});
