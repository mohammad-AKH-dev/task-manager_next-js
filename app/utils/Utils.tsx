
import Swal from 'sweetalert2'


export const url = "https://task-manager-api-zpsa.onrender.com/api";

export const uploadImageHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUserImage: React.Dispatch<React.SetStateAction<string>>
) => {
  const imageFile = event.target.files?.[0];
  if (imageFile) {
    const reader = new FileReader();
    reader.addEventListener("load", (event: ProgressEvent<FileReader>) => {
      if (typeof event.target?.result === "string") {
        setUserImage(event.target.result);
      }
    });

    reader.readAsDataURL(imageFile);
  }
};

export function eraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setCookie(name: string, value: any, days: number) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const getLocalStorageItem = (name: string) => {
   const value = JSON.parse(localStorage.getItem(name)!)

   return value
}

