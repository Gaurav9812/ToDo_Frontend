import { useState } from "react";

export let API_URLS = "http://localhost:8000/api/v1";

export let LOCALSTORAGE_TOKEN_KEY = "token";

export function useFormInputs(initialvalue) {
  const [value, setValue] = useState(initialvalue);
  function onChange(e) {
    setValue(e.target.value.trim());
  }
  return {
    value,
    onChange: onChange,
  };
}

export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
}
export function getItemFromLocal(key) {
  return localStorage.getItem(key);
}

export function setItemToLocal(key, value) {
  console.log("setting key");
  localStorage.setItem(key, value);
}
export function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}
