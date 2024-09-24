function setLocalStorageItem(cookieConsentGiven:boolean, key:string, value:string) {
  if (cookieConsentGiven) {
    localStorage.setItem(key, value);
    return true;
  }
  return false;
}

function getCookie(name:string) {
  let cookieValue = null;
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

export { getCookie, setLocalStorageItem };
