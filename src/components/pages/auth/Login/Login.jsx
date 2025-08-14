/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../rtk/slices/userSlice";
import LoginContent from "./LoginContent";
// import { fetchAddresses } from "../../../../rtk/slices/adderssSlice";
import { BASE_URL } from "../../../setting";
import { useTranslation } from "react-i18next";
const LoginPage = ({ setToken }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // const [userAddress, setUserAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem("token");

  //  من البداية: لو في توكن، نروح للهوم ومنعرضش الصفحة
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  //  لو في توكن حالياً، مانعرضش صفحة اللوجين خالص
  if (token) return null;

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false)
        } else {
          throw new Error(t("loginPage.tokenNotFound"));
        }
      } else {
        throw new Error(t("loginPage.loginFailed"));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages || t("loginPage.invalidCredentials");
      toast.error(errorMessage);
      console.error("Error logging in: ", errorMessage);
    } finally {
      setLoading(false); // يوقف اللودينج سواء حصل نجاح أو خطأ
    }
  };



  return (
    <LoginContent
      password={password}
      phone={phone}
      login={login}
      setPassword={setPassword}
      setPhone={setPhone}
      loading={loading}
    />
  );
};

export default LoginPage;
