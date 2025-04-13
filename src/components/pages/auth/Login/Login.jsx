/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../rtk/slices/userSlice";
import LoginContent from "./LoginContent";
// import { fetchAddresses } from "../../../../rtk/slices/adderssSlice";
import { BASE_URL } from "../../../setting";
import { useTranslation } from "react-i18next";
const LoginPage = ({ setToken  }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [userAddress, setUserAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const login = async (e) => {
    e.preventDefault();

    const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
    try {
      const response = await axios.post(`${BASE_URL}${APIURL}`);
      // console.log("Response Data:", response.data); 

      if (response.data && response.data.data) {
        const token = response.data.data.token;
        const userData = response.data.data.user;

        if (token && userData) {
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData)); 
          dispatch(setUser(userData)); 

          toast.success(t("loginPage.loginSuccess"));
          navigate("/");
        } else {
          throw new Error(t("loginPage.tokenNotFound"));
        }
      } else {
        throw new Error(t("loginPage.loginFailed"));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.messages || t("loginPage.invalidCredentials");
      toast.error(errorMessage);
      console.error("Error logging in: ", errorMessage);
    }
  };

  const getAddressForUser = (userId) => {
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    console.log("Addresses from localStorage:", addresses);
    
    // إضافة التحقق من نوع بيانات userId والعناوين
    console.log("User ID:", userId);
    
    // البحث عن العنوان بناءً على ID
    const foundAddress = addresses.find(address => address.userId === userId);
    console.log("Found Address:", foundAddress);
    return foundAddress;
  };
  
  
  // const login = async (e) => {
  //   e.preventDefault();
  
  //   const APIURL = `/login?phone=${phone}&password=${password}&email=${phone}`;
  //   try {
  //     const response = await axios.post(`${BASE_URL}${APIURL}`);
  //     console.log("Response Data:", response.data); // تحقق من استجابة API
  
  //     if (response.data?.response === true) {
  //       const token = response.data?.data?.token;
  //       const userData = response.data?.data?.user;
  
  //       if (token && userData) {
  //         setToken(token);
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("user", JSON.stringify(userData)); // تخزين بيانات المستخدم
  
  //         dispatch(setUser(userData)); // تخزين بيانات المستخدم في Redux
  
  //         // جرب إضافة طباعات للتحقق من البيانات
  //         console.log("User Data:", userData);
  
  //         // استرجاع العنوان للمستخدم بناءً على ID الخاص به
  //         try {
  //           const storedAddress = getAddressForUser(userData.id);
  //           console.log("Stored Address:", storedAddress); // تحقق من العنوان المسترجع
  
  //           if (storedAddress) {
  //             setUserAddress(storedAddress); // تعيين العنوان في state إذا كان موجودًا
  //           } else {
  //             setUserAddress(null); // لا يوجد عنوان محفوظ
  //           }
  //         } catch (addressError) {
  //           console.error("Error fetching address:", addressError);
  //           setUserAddress(null); // في حال وجود خطأ في العناوين، تعيين null
  //         }
  
  //         toast.success("Login successful!");
  //         navigate("/");
  //       } else {
  //         throw new Error("Token or user data not found");
  //       }
  //     } else {
  //       throw new Error(response.data?.messages || "Login failed");
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.messages || "Invalid User Name or Password";
  //     toast.error(errorMessage);
  //     console.error("Error logging in: ", errorMessage);
  //   }
  // };
  
  
  
  
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
