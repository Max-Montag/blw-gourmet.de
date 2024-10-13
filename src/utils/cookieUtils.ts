import Cookies from "js-cookie";

async function fetchCSRFToken(): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf_token/`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen des CSRF-Tokens");
    }

    const data = await response.json();
    return data.csrf_token;
  } catch (error) {
    console.error("Fehler beim Abrufen des CSRF-Tokens:", error);
    return undefined;
  }
}

async function getCSRFToken(): Promise<string> {
  {
    /** returns a token or empty string */
  }

  let token: string | undefined;

  try {
    token = Cookies.get("csrftoken");

    if (!token) {
      console.warn(
        "CSRF-Token nicht gefunden. Versuche Token vom Server zu holen."
      );

      token = await fetchCSRFToken();

      if (!token) {
        throw new Error("CSRF-Token konnte nicht vom Server geholt werden");
      }

      return token;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des CSRF-Tokens:", error);
  }

  return token || "";
}

export { getCSRFToken };
