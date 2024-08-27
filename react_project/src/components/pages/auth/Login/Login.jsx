/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../rtk/slices/userSlice";
import LoginContent from "./LoginContent";
import { fetchAddresses } from "../../../../rtk/slices/adderssSlice";

const BASE_URL = "https://myres.me/chilis-dev/api";

const LoginPage = ({ setToken }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const api_token = localStorage.getItem("token");
  // const login = async (e) => {
  //   e.preventDefault();

  //   const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
  //   try {
  //     const response = await axios.post(`${BASE_URL}${APIURL}`);
  //     console.log("Response Data:", response.data);

  //     if (response.data && response.data.data) {
  //       // const token = response.data.data.token;
  //       // const userData = response.data.data.user;
  //       const token = response.data.data.token; 
  //       const userData = response.data.data.user; 

  //       if (token && userData) {
  //         setToken(token);
          
  //         // localStorage.setItem("token", token); // تخزين التوكن
  //         localStorage.setItem("token", token); // تخزين التوكن
  //         localStorage.setItem("user", JSON.stringify(userData)); // تخزين بيانات المستخدم
  

  //         dispatch(setUser(userData)); // تخزين بيانات المستخدم في Redux

  //         toast.success("Login successful!");
  //         navigate("/");
  //       } else {
  //         throw new Error("Token or user data not found");
  //       }
  //     } else {
  //       throw new Error(response.data.messages || "Login failed");
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.messages || "Invalid User Name or Password";
  //     toast.error(errorMessage);
  //     console.error("Error logging in: ", errorMessage);
  //   }
  // };
  // const login = async (e) => {
  //   e.preventDefault();
  
  //   const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
  //   try {
  //     const response = await axios.post(`${BASE_URL}${APIURL}`);
  //     console.log("Response Data:", response.data);
  
  //     if (response.data && response.data.data) {
  //       const token = response.data.data.token;
  //       const userData = response.data.data.user;
  
  //       if (token && userData) {
  //         setToken(token);
  
  //         // تخزين التوكن وبيانات المستخدم في localStorage
  //         // localStorage.setItem("token", token);
  //         localStorage.setItem("api_token", token);
  //         // localStorage.setItem("api_token", token); // استرجاع التوكن
  //         localStorage.setItem("user", JSON.stringify(userData)); // تخزين بيانات المستخدم
  
  //         // تحديث بيانات المستخدم في Redux
  //         dispatch(setUser(userData));
  //         toast.success("Login successful!");
  //         navigate("/");
  //         dispatch(fetchAddresses());
  //       } else {
  //         throw new Error("Token or user data not found");
  //       }
  //     } else {
  //       throw new Error(response.data.messages || "Login failed");
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.messages || "Invalid User Name or Password";
  //     toast.error(errorMessage);
  //     console.error("Error logging in: ", errorMessage);
  //   }
  // };
  
  const login = async (e) => {
    e.preventDefault();

    const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
    try {
      const response = await axios.post(`${BASE_URL}${APIURL}`);
      console.log("Response Data:", response.data); // تحقق من استجابة API

      if (response.data && response.data.data) {
        const token = response.data.data.token;
        const userData = response.data.data.user;

        if (token && userData) {
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData)); // تخزين بيانات المستخدم

          dispatch(setUser(userData)); // تخزين بيانات المستخدم في Redux

          toast.success("Login successful!");
          navigate("/");
        } else {
          throw new Error("Token or user data not found");
        }
      } else {
        throw new Error(response.data.messages || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages || "Invalid User Name or Password";
      toast.error(errorMessage);
      console.error("Error logging in: ", errorMessage);
    }
  };

  return (
    <LoginContent
      password={password}
      phone={phone}
      login={login}
      setPassword={setPassword}
      setPhone={setPhone}
    />
  );
};

export default LoginPage;
