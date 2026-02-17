import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

export default function Toast(): JSX.Element {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  );
}
