import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { eraseCookie } from "../utils/Utils";

function useLogOut() {
  const router = useRouter()

  const logout = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to log out?",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        eraseCookie("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("urlPath");
        router.push("/login");
      }
    });
  };

  return logout
}

export default useLogOut;
