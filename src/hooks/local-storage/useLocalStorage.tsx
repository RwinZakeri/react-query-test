"use client";
import { localStorageType } from "@/types/type";
import { useEffect, useState } from "react";

// Type for the data stored in localStorage
type LocalStorageData = string | object | null;

const useLocalStorage = ({ key, value }: localStorageType) => {
  // State to manage localStorage data
  const [localStorageData, setLocalStorageData] =
    useState<LocalStorageData>(null);

  // Use effect to initialize the state from localStorage on component mount
  useEffect(() => {
    try {
      const existingValue = localStorage.getItem(key);
      if (existingValue) {
        // Try to parse the value to object if it's a stringified object/array
        const parsedValue = isJsonString(existingValue)
          ? JSON.parse(existingValue)
          : existingValue;
        setLocalStorageData(parsedValue);
      } else {
        // Set the initial value if not present, storing it as a string if it's an object
        const valueToStore =
          typeof value === "object" ? JSON.stringify(value) : value;
        localStorage.setItem(key, valueToStore);
        setLocalStorageData(valueToStore);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setLocalStorageData(null); // Fallback in case of an error
    }
  }, [key, value]); // This effect will run once on mount and set the initial value

  // Function to update localStorage and state
  const updateLocalStorage = (newValue: string | object) => {
    try {
      const valueToStore =
        typeof newValue === "object" ? JSON.stringify(newValue) : newValue;
      localStorage.setItem(key, valueToStore);
      setLocalStorageData(newValue); // Update state with new value
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  // Helper function to check if a string is JSON-parsable
  const isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return { localStorageData, updateLocalStorage };
};

export default useLocalStorage;
