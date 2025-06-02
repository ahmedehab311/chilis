import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderCode, hasedKey, openFawaterkDialog, cartItems } =
    location.state || {};

  useEffect(() => {
    const fromCheckout = sessionStorage.getItem("fromCheckout");
    // لو مش جاي من صفحة الشيك آوت، يمنع الدخول
    if (fromCheckout !== "true") {
      navigate("/", { replace: true });
    } else {
      sessionStorage.removeItem("fromCheckout");
      // هنا ممكن تحط sessionStorage.setItem('fromPayment', 'true') لو محتاج تدخل success بعد الدفع
    }
  }, [navigate]);
  useEffect(() => {
    sessionStorage.setItem("fromPayment", "true");
  }, []);
  useEffect(() => {
    if (openFawaterkDialog && hasedKey && orderCode) {
      let attempts = 0;
      const maxAttempts = 50;
      const interval = setInterval(() => {
        const div = document.getElementById("fawaterkDivId");

        if (div || attempts >= maxAttempts) {
          clearInterval(interval);
          if (div) {
            const loadFawaterkScript = () => {
              return new Promise((resolve, reject) => {
                if (window.fawaterkCheckout) {
                  resolve();
                  return;
                }
                const script = document.createElement("script");
                script.src =
                  "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
                script.async = true;
                script.onload = () => {
                  resolve();
                };
                script.onerror = () => {
                  console.error("Fawaterk script failed to load");
                  reject(new Error("Failed to load Fawaterk script"));
                };
                document.body.appendChild(script);
              });
            };

            loadFawaterkScript()
              .then(() => {
                if (window.fawaterkCheckout) {
                  const cartTotal = cartItems?.reduce((sum, item) => {
                    return sum + item.totalPrice;
                  }, 0);
                  const FormatCartItem = cartItems?.map((item) => ({
                    name: item.name_en || item.name_ar,
                    price: item.price.toFixed(2),
                    quantity: item.quantity.toString(),
                  }));
                  console.log("cartTotal", cartTotal.toFixed(2));
                  console.log("FormatCartItem", FormatCartItem);

                  window.pluginConfig = {
                    envType: "test",
                    hashKey:
                      "81aa60fe261ced7171c356a9c16fa7a3c6f18016a91f53e2a18391ac4d3c2f87",
                    style: { listing: "horizontal" },
                    version: "0",
                    requestBody: {
                      cartTotal: cartTotal.toFixed(2),
                      currency: "EGP",
                      customer: {
                        first_name: "test",
                        last_name: "fawaterk",
                        email: "test@fawaterk.com",
                        phone: "0123456789",
                        address: "test address",
                      },
                      redirectionUrls: {
                        successUrl: `https://chilis-egypt.com/order-online/payment/success/${orderCode}`,
                        failUrl: `https://chilis-egypt.com/order-online/payment/fail/${orderCode}`,
                        pendingUrl: `https://chilis-egypt.com/order-online/payment/failpending/${orderCode}`,
                      },

                      cartItems: FormatCartItem,
                      payLoad: { custom_field1: "xyz", custom_field2: "xyz2" },
                    },
                  };

                  window.fawaterkCheckout(window.pluginConfig);
                } else {
                  console.error("Fawaterk Checkout not loaded");
                }
              })
              .catch((error) => {
                console.error("Error loading Fawaterk script:", error);
              });
          } else {
            console.error("fawaterkDivId not found in DOM after max attempts");
          }
        }
        attempts++;
      }, 100);

      return () => clearInterval(interval);
    }
  }, [openFawaterkDialog, hasedKey, orderCode]);

  return <div id="fawaterkDivId"></div>;
};
// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderCode, hasedKey, openFawaterkDialog, cartItems, fromOrderOnline } = location.state || {};

//   useEffect(() => {
//     // إضافة Console Logs للتصحيح
//     console.log("location.state", location.state);
//     console.log("fromOrderOnline", fromOrderOnline);
//     console.log("sessionStorage.fromOrderOnline", sessionStorage.getItem("fromOrderOnline"));

//     // التحقق من fromOrderOnline في location.state أو sessionStorage
//     const fromOrderOnlineSession = sessionStorage.getItem("fromOrderOnline");
//     if (!fromOrderOnline && !fromOrderOnlineSession) {
//       console.log("Redirecting to home: No valid fromOrderOnline");
//       navigate("/"); // لو مش جاي من /order-online، يرجع للهوم
//       return;
//     }

//     // إزالة علامة sessionStorage بعد التحقق
//     if (fromOrderOnlineSession) {
//       sessionStorage.removeItem("fromOrderOnline");
//     }

//     // إضافة مستمع popstate عشان نتحكم في Back/Forward
//     const handlePopState = () => {
//       window.history.replaceState(null, "", "/");
//       navigate("/");
//     };
//     window.addEventListener("popstate", handlePopState);

//     if (openFawaterkDialog && hasedKey && orderCode) {
//       let attempts = 0;
//       const maxAttempts = 50;
//       const interval = setInterval(() => {
//         const div = document.getElementById("fawaterkDivId");

//         if (div || attempts >= maxAttempts) {
//           clearInterval(interval);
//           if (div) {
//             const loadFawaterkScript = () => {
//               return new Promise((resolve, reject) => {
//                 if (window.fawaterkCheckout) {
//                   resolve();
//                   return;
//                 }
//                 const script = document.createElement("script");
//                 script.src =
//                   "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
//                 script.async = true;
//                 script.onload = () => resolve();
//                 script.onerror = () =>
//                   reject(new Error("Failed to load Fawaterk script"));
//                 document.body.appendChild(script);
//               });
//             };

//             loadFawaterkScript()
//               .then(() => {
//                 if (window.fawaterkCheckout) {
//                   const cartTotal = cartItems?.reduce((sum, item) => {
//                     return sum + item.totalPrice;
//                   }, 0);
//                   const FormatCartItem = cartItems?.map((item) => ({
//                     name: item.name_en || item.name_ar,
//                     price: item.totalPrice.toFixed(2),
//                     quantity: item.quantity.toString(),
//                   }));

//                   // إضافة علامة fromPayment
//                   sessionStorage.setItem("fromPayment", "true");

//                   // استبدال الـ history قبل تحميل الـ iframe
//                   window.history.replaceState(null, "", "/");

//                   window.pluginConfig = {
//                     envType: "test",
//                     hashKey:
//                       "81aa60fe261ced7171c356a9c16fa7a3c6f18016a91f53e2a18391ac4d3c2f87", // استخدم القيمة الصحيحة
//                     style: { listing: "horizontal" },
//                     version: "0",
//                     requestBody: {
//                       cartTotal: cartTotal.toFixed(2),
//                       currency: "EGP",
//                       customer: {
//                         first_name: "test",
//                         last_name: "fawaterk",
//                         email: "test@fawaterk.com",
//                         phone: "0123456789",
//                         address: "test address",
//                       },
//                       redirectionUrls: {
//                         successUrl: `https://chilis-egypt.com/order-online/payment/success/${orderCode}`,
//                         failUrl: `https://chilis-egypt.com/order-online/payment/fail/${orderCode}`,
//                         pendingUrl: `https://chilis-egypt.com/order-online/payment/failpending/${orderCode}`,
//                       },
//                       cartItems: FormatCartItem,
//                       payLoad: { custom_field1: "xyz", custom_field2: "xyz2" },
//                     },
//                   };

//                   window.fawaterkCheckout(window.pluginConfig);
//                 } else {
//                   console.error("Fawaterk Checkout not loaded");
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error loading Fawaterk script:", error);
//               });
//           } else {
//             console.error("fawaterkDivId not found in DOM after max attempts");
//           }
//         }
//         attempts++;
//       }, 100);

//       return () => {
//         clearInterval(interval);
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [openFawaterkDialog, hasedKey, orderCode, cartItems, navigate, fromOrderOnline]);

//   return <div id="fawaterkDivId"></div>;
// };

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderCode, hasedKey, openFawaterkDialog, cartItems, fromOrderOnline } = location.state || {};

//   useEffect(() => {
//     // إضافة Console Logs للتحقق من البيانات الواردة
//     console.log("location.state", location.state);
//     console.log("fromOrderOnline", fromOrderOnline);
//     console.log("sessionStorage.fromOrderOnline", sessionStorage.getItem("fromOrderOnline"));
//     console.log("cartItems", cartItems);

//     // التحقق من fromOrderOnline في location.state أو sessionStorage
//     const fromOrderOnlineSession = sessionStorage.getItem("fromOrderOnline");
//     if (!fromOrderOnline && !fromOrderOnlineSession) {
//       console.log("Redirecting to home: No valid fromOrderOnline");
//       navigate("/"); // لو مش جاي من /order-online، يرجع للهوم
//       return;
//     }

//     // إزالة علامة sessionStorage بعد التحقق
//     if (fromOrderOnlineSession) {
//       sessionStorage.removeItem("fromOrderOnline");
//     }

//     // إضافة مستمع popstate عشان نتحكم في Back/Forward
//     const handlePopState = () => {
//       window.history.replaceState(null, "", "/");
//       navigate("/");
//     };
//     window.addEventListener("popstate", handlePopState);

//     if (openFawaterkDialog && hasedKey && orderCode) {
//       // التحقق من cartItems قبل المعالجة
//       if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//         console.error("Invalid cartItems:", cartItems);
//         navigate("/"); // لو cartItems مش صالح، يرجع للهوم
//         return;
//       }

//       let attempts = 0;
//       const maxAttempts = 50;
//       const interval = setInterval(() => {
//         const div = document.getElementById("fawaterkDivId");

//         if (div || attempts >= maxAttempts) {
//           clearInterval(interval);
//           if (div) {
//             const loadFawaterkScript = () => {
//               return new Promise((resolve, reject) => {
//                 if (window.fawaterkCheckout) {
//                   resolve();
//                   return;
//                 }
//                 const script = document.createElement("script");
//                 script.src =
//                   "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
//                 script.async = true;
//                 script.onload = () => resolve();
//                 script.onerror = () =>
//                   reject(new Error("Failed to load Fawaterk script"));
//                 document.body.appendChild(script);
//               });
//             };

//             loadFawaterkScript()
//               .then(() => {
//                 if (window.fawaterkCheckout) {
//                   const cartTotal = cartItems.reduce((sum, item) => {
//                     // التحقق من وجود totalPrice
//                     if (!item.totalPrice) {
//                       console.error("Missing totalPrice in item:", item);
//                       return sum;
//                     }
//                     return sum + item.totalPrice;
//                   }, 0);

//                   const FormatCartItem = cartItems.map((item) => {
//                     if (!item.name_en && !item.name_ar) {
//                       console.error("Missing name in item:", item);
//                     }
//                     return {
//                       name: item.name_en || item.name_ar || "Unknown Item",
//                       price: (item.totalPrice || 0).toFixed(2),
//                       quantity: item.quantity.toString(),
//                     };
//                   });

//                   // إضافة علامة fromPayment
//                   console.log("Setting fromPayment in sessionStorage");
//                   sessionStorage.setItem("fromPayment", "true");

//                   window.pluginConfig = {
//                     envType: "test",
//                     hashKey:
//                       "81aa60fe261ced7171c356a9c16fa7a3c6f18016a91f53e2a18391ac4d3c2f87", // تأكد من القيمة
//                     style: { listing: "horizontal" },
//                     version: "0",
//                     requestBody: {
//                       cartTotal: cartTotal.toFixed(2),
//                       currency: "EGP",
//                       customer: {
//                         first_name: "test",
//                         last_name: "fawaterk",
//                         email: "test@fawaterk.com",
//                         phone: "0123456789",
//                         address: "test address",
//                       },
//                       redirectionUrls: {
//                         successUrl: `https://chilis-egypt.com/order-online/payment/success/${orderCode}`,
//                         failUrl: `https://chilis-egypt.com/order-online/payment/fail/${orderCode}`,
//                         pendingUrl: `https://chilis-egypt.com/order-online/payment/failpending/${orderCode}`,
//                       },
//                       cartItems: FormatCartItem,
//                       payLoad: { custom_field1: "xyz", custom_field2: "xyz2" },
//                     },
//                   };

//                   console.log("Fawaterk config:", window.pluginConfig);
//                   window.fawaterkCheckout(window.pluginConfig);
//                 } else {
//                   console.error("Fawaterk Checkout not loaded");
//                 }
//               })
//               .catch((error) => {
//                 console.error("Error loading Fawaterk script:", error);
//               });
//           } else {
//             console.error("fawaterkDivId not found in DOM after max attempts");
//           }
//         }
//         attempts++;
//       }, 100);

//       return () => {
//         clearInterval(interval);
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [openFawaterkDialog, hasedKey, orderCode, cartItems, navigate, fromOrderOnline]);

//   return <div id="fawaterkDivId"></div>;
// };
export default Payment;
