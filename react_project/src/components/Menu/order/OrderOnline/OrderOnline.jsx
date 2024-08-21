import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import "./OrderOnline.css";
import CheckOut from "./checkOut/CheckOut";
import Address from "../adderess/Address";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../../rtk/slices/orderSlice";
// import img from "../"
function OrderOnline() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const API_CITIES = "https://myres.me/chilis/api/cities";
  const API_ARIA = (cityId) =>
    `https://myres.me/chilis/api/areas/?city=${cityId}`;

  const [bageCount, setBadgeCount] = useState(0);

  useEffect(() => {
    // تحديث عدد العناصر في البادج بناءً على العناصر الموجودة في السلة عند تحميل الصفحة
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setBadgeCount(cart.length);
    setCartItems(cart);

    // يمكنك أيضاً تحميل الأسعار هنا إذا كنت تريد
  }, []);

  useEffect(() => {
    // تحديث الأسعار الإجمالية عند تغيير العناصر في السلة
    const updatedPrices = {};
    cartItems.forEach((item, index) => {
      updatedPrices[index] = totalPrices[index] || item.price;
    });
    setTotalPrices(updatedPrices);
  }, [cartItems]);

  const handleCounterChange = (index, newTotalPrice) => {
    setTotalPrices((prevPrices) => ({
      ...prevPrices,
      [index]: newTotalPrice,
    }));
  };

  const handleRemoveItem = (index) => {
    // حذف العنصر من Redux store
    dispatch(removeItemFromCart(index));

    // تحديث localStorage إذا كان لديك منطق إضافي هناك
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // تحديث الحالة في الواجهة الأمامية إذا لزم الأمر
    setCartItems(cart);

    // عرض عدد العناصر في البادج بعد التحديث
    console.log("Updated badge count:", cart.length);

    setTotalPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[index];
      return newPrices;
    });
  };

  const subtotal = Object.values(totalPrices).reduce(
    (acc, price) => acc + price,
    0
  );
  const deliveryFee = 50;
  const totalToPay = subtotal + deliveryFee;

  // diolg
  const [selectedCity, setSelectedCity] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    deliveryCity: "",
    deliveryArea: "",
  });
  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(API_CITIES);
        const data = await response.json();
        setCities(data.data.cities);
        // console.log(data.data.cities)
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const fetchAreas = async () => {
        setLoadingAreas(true);
        try {
          const response = await fetch(API_ARIA(selectedCity));
          const data = await response.json();
          setAreas(data.data.areas);
        } catch (error) {
          console.error("Error fetching areas:", error);
        } finally {
          setLoadingAreas(false);
        }
      };

      fetchAreas();
    }
  }, [selectedCity]);

  const [addressData, setAddressData] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddressData(JSON.parse(savedAddresses));
    }

    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(Number(savedActiveIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addressData));
  }, [addressData]);

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  const handleSelectLabel = (label) => {
    setCurrentAddress((prev) => ({ ...prev, label }));
  };
  const [selectedAddress, setSelectedAddress] = useState(null);

  // existing useEffects and functions...

  const handleCardClick = (index) => {
    setActiveIndex(index);
    setSelectedAddress(addressData[index]); // Set selected address when card is clicked
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // في OrderOnline
  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      total: totalToPay,
      user: user, // تضمين معلومات المستخدم هنا
      address: addressData[activeIndex], // استخدام العنوان النشط
    };


  };

  return (
    <Stack
      className={"orderOnline"}
      sx={{
        display: "flex",
        mx: "6rem",
        "@media (max-width: 1000px)": {
          flexDirection: "column !important",
        },
        "@media (max-width: 480px)": {
          mx: "0.5rem",
        },
      }}
      direction={"row"}
      alignItems={"center"}
    >
      <Address
        handlePlaceOrder={handlePlaceOrder}
        handleCardClick={handleCardClick}
        handleSelectLabel={handleSelectLabel}
      />
      <CheckOut
        totalToPay={totalToPay}
        handleRemoveItem={handleRemoveItem}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        totalPrices={totalPrices}
        handleCounterChange={handleCounterChange}
        selectedAddress={selectedAddress} // Pass selected address to CheckOut
      />
    </Stack>
  );
}

export default OrderOnline;
