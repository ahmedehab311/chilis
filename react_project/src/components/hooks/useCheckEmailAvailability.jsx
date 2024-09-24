// src/hooks/useCheckEmailAvailability.js
import { useState } from "react";
import axios from "axios";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState("idle");
  const [enteredEmail, setEnteredEmail] = useState(null);

  const checkEmailAvailability = async (email) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");

    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
      console.log(error);
    }
  };

  const resetCheckEmail = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };

  return { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmail };
};

export default useCheckEmailAvailability;
