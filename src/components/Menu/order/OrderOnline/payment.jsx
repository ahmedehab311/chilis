import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
    const navigate = useNavigate();
  const { orderCode, hasedKey, openFawaterkDialog } = location.state || {};
useEffect(() => {
  const url = new URL(window.location.href);
  const isPaymentSuccess = url.pathname.includes("/order-online/payment") && url.searchParams.get("status") === "success";

  if (isPaymentSuccess && orderCode) {
    navigate(`/order-online/payment/success/${orderCode}`);
  }
}, []);
   useEffect(() => {
    console.log("openFawaterkDialog:", openFawaterkDialog);
    console.log("hasedKey:", hasedKey, "orderCode:", orderCode);

    if (openFawaterkDialog && hasedKey && orderCode) {
      let attempts = 0;
      const maxAttempts = 50;
      const interval = setInterval(() => {
        const div = document.getElementById("fawaterkDivId");
        console.log(`fawaterkDivId exists? (attempt ${attempts + 1})`, !!div);

        if (div || attempts >= maxAttempts) {
          clearInterval(interval);
          if (div) {
            const loadFawaterkScript = () => {
              return new Promise((resolve, reject) => {
                if (window.fawaterkCheckout) {
                  console.log("fawaterkCheckout already loaded");
                  resolve();
                  return;
                }
                console.log("Loading Fawaterk script...");
                const script = document.createElement("script");
                script.src =
                  "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
                script.async = true;
                script.onload = () => {
                  console.log("Fawaterk script loaded successfully");
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
                console.log(
                  "Fawaterk Checkout loaded:",
                  window.fawaterkCheckout
                );
                if (window.fawaterkCheckout) {
                  console.log("Defining pluginConfig...");
                  window.pluginConfig = {
                    envType: "test",
                    hashKey: "81aa60fe261ced7171c356a9c16fa7a3c6f18016a91f53e2a18391ac4d3c2f87",
                    style: { listing: "horizontal" },
                    version: "0",
                    requestBody: {
                      cartTotal: "50",
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
                        failUrl: `${window.location.origin}/order-online/payment/fail/${orderCode}`,
                        pendingUrl: `${window.location.origin}/order-online/payment/failpending/${orderCode}`,
                      },

                      cartItems: [
                        {
                          name: "this is test oop 112252",
                          price: "25",
                          quantity: "1",
                        },
                        {
                          name: "this is test oop 112252",
                          price: "25",
                          quantity: "1",
                        },
                      ],
                      payLoad: { custom_field1: "xyz", custom_field2: "xyz2" },
                    },
                  };
                  console.log("pluginConfig defined:", window.pluginConfig);
                  console.log("Calling window.fawaterkCheckout...");
                  window.fawaterkCheckout(window.pluginConfig);
                  console.log("window.fawaterkCheckout called successfully");
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

export default Payment;
