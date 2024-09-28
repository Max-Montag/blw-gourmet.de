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

function getCSRFToken(): string {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    throw new Error("CSRF-Token nicht gefunden");
  }

  return csrftoken;
}

export { getCSRFToken };
