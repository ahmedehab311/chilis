import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCheckEmailAvailability, signUpSchema } from "../../../header/index";
import RegisterContent from "./RegisterContent";
import { BASE_URL } from "../../../setting";
import { useTranslation } from "react-i18next"; 

const Register = ({ setToken }) => {
  const { t } = useTranslation();
  const [first_name, setFirst_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const APIURL = `/register?first_name=${first_name}&email=${email}&password=${password}&phone=${phone}`;

    try {
      const response = await axios.post(`${BASE_URL}${APIURL}`);

      if (response.data.response) {
        const token = response.data.data.user.token;
        const userData = response.data.data.user;

        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(t("regsterPage.success"));
        navigate("/login");
      } else {
        throw new Error(t("regsterPage.error"));
      }
    } catch (error) {
      toast.error("The email or phone has already been taken.");
      console.error("Error registering: ", error);
    }
  };
  const {
    register,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmail,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    } else if (isDirty && invalid && enteredEmail) {
      resetCheckEmail();
    }
  };

  return (
    <RegisterContent
      emailOnBlurHandler={emailOnBlurHandler}
      registerUser={registerUser}
      register={register}
      errors={errors}
      firstName={first_name}
      setEmail={setEmail}
      emailAvailabilityStatus={emailAvailabilityStatus}
      setFirst_name={setFirst_name}
      setPassword={setPassword}
      setPhone={setPhone}
    />
  );
};

export default Register;