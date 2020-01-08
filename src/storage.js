const Storage = {
  get: key => {
    let value = sessionStorage.getItem(key);
    if (!value) {
      value = localStorage.getItem(key);
    }

    const jsonValue = JSON.parse(value);

    return jsonValue;
  },
  set: (key, value, location = "session") => {
    const jsonValue = JSON.stringify(value);
    if (location === "session") {
      return sessionStorage.setItem(key, jsonValue);
    } else if (location === "local") {
      return localStorage.setItem(key, jsonValue);
    }
  },
  remove: key => {
    return sessionStorage.removeItem(key) || localStorage.removeItem(key);
  }
};

export default Storage;
