// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useCheckEmailAvailability, signUpSchema } from "../../../header/index";
// import RegisterContent from "./RegisterContent";
// import { BASE_URL } from "../../../setting";
// const Register = ({ setToken }) => {
//   const [first_name, setFirst_name] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();

//   const registerUser = async (e) => {
//     e.preventDefault();

//     const APIURL = `/register?first_name=${first_name}&email=${email}&password=${password}&phone=${phone}`;

//     try {
//       const response = await axios.post(`${BASE_URL}${APIURL}`);

//       if (response.data.response) {
//         const token = response.data.data.user.token;
//         const userData = response.data.data.user;

//         setToken(token);
//         localStorage.setItem("user", JSON.stringify(userData));
//         toast.success("Register successful!");
//         navigate("/login");
//       } else {
//         throw new Error("Register failed");
//       }
//     } catch (error) {
//       toast.error("The email or phone has already been taken.");
//       console.error("Error registering: ", error);
//     }
//   };
//   const {
//     register,
//     handleSubmit,
//     getFieldState,
//     trigger,
//     formState: { errors },
//   } = useForm({
//     mode: "onBlur",
//     resolver: zodResolver(signUpSchema),
//   });

//   const {
//     emailAvailabilityStatus,
//     enteredEmail,
//     checkEmailAvailability,
//     resetCheckEmail,
//   } = useCheckEmailAvailability();

//   const emailOnBlurHandler = async (e) => {
//     await trigger("email");
//     const value = e.target.value;
//     const { isDirty, invalid } = getFieldState("email");
//     if (isDirty && !invalid && enteredEmail !== value) {
//       checkEmailAvailability(value);
//     } else if (isDirty && invalid && enteredEmail) {
//       resetCheckEmail();
//     }
//   };

//   return (
//     <RegisterContent
//       emailOnBlurHandler={emailOnBlurHandler}
//       registerUser={registerUser}
//       register={register}
//       errors={errors}
//       firstName={first_name}
//       setEmail={setEmail}
//       emailAvailabilityStatus={emailAvailabilityStatus}
//       setFirst_name={setFirst_name}
//       setPassword={setPassword}
//       setPhone={setPhone}
//     />
//   );
// };

// export default Register;

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCheckEmailAvailability, signUpSchema } from "../../../header/index";
import RegisterContent from "./RegisterContent";
import { BASE_URL } from "../../../setting";

const Register = ({ setToken }) => {
  const [first_name, setFirst_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const registerUser = async (data) => {
    try {
      const APIURL = `/register`;
      const response = await axios.post(`${BASE_URL}${APIURL}`, data);

      if (response.data.response) {
        const token = response.data.data.user.token;
        const userData = response.data.data.user;

        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Register successful!");
        navigate("/login");
      } else {
        throw new Error("Register failed");
      }
    } catch (error) {
      toast.error("The email or phone has already been taken.");
      console.error("Error registering: ", error);
    }
  };

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: first_name,
      email,
      password,
      phone
    }
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
      registerUser={handleSubmit(registerUser)}
      register={register}
      errors={errors}
      setEmail={(value) => {
        setEmail(value);
        setValue("email", value);
        clearErrors("email");
      }}
      emailAvailabilityStatus={emailAvailabilityStatus}
      setFirst_name={(value) => {
        setFirst_name(value);
        setValue("firstName", value);
        clearErrors("firstName");
      }}
      setPassword={(value) => {
        setPassword(value);
        setValue("password", value);
        clearErrors("password");
      }}
      setPhone={(value) => {
        setPhone(value);
        setValue("phone", value);
        clearErrors("phone");
      }}
    />
  );
};

export default Register;
