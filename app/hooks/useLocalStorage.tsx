"use client";

import React from "react";

function useLocalStorage(name: string, value: any) {
  localStorage.setItem(name, JSON.stringify(value));

  return true;
}

export default useLocalStorage;
