function getCookie(name: string): string {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

async function fetchCSRFToken(): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf_token/`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen des CSRF-Tokens");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Fehler beim Abrufen des CSRF-Tokens:", error);
    return undefined;
  }
}

async function getCSRFToken(): Promise<string> {
  {
    /** returns a token or empty string */
  }
  try {
    const csrftoken = getCookie("csrftoken");

    if (!csrftoken) {
      console.error(
        "CSRF-Token nicht gefunden. Versuche Token vom Server zu holen.",
      );
      const token = await fetchCSRFToken();

      if (!token) {
        throw new Error("CSRF-Token konnte nicht vom Server geholt werden");
      }

      return token;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des CSRF-Tokens:", error);
  }

  return "";
}

export { getCSRFToken };
