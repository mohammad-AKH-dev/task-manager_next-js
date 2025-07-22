import { SubmitHandler } from "react-hook-form";
import { registerFormInputs } from "../components/templates/register/RegisterPageContent";

export const url = "https://task-manager-api-zpsa.onrender.com/api";

export const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement> , setUserImage: React.Dispatch<React.SetStateAction<string>>) => {
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

  export function setCookie(name: string, value: any , days: number) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
  }

