import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderCode, hasedKey, openFawaterkDialog, cartItems, finalTotal } =
    location.state || {};

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
                  window.pluginConfig = {
                    envType: "live",
                    hashKey:
                      "46a65f1db425ecb8f2518a1ac65c638099aad72252ef48b8b865c0fc276235cb",
                    style: { listing: "horizontal" },
                    version: "0",
                    requestBody: {
                      cartTotal: finalTotal,
                      redirectOutIframe: true,
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
                        failUrl: `https://chilis-egypt.com/order-online/payment/fail`,
                        pendingUrl: `https://chilis-egypt.com/order-online/payment/failpending/${orderCode}`,
                      },

                      cartItems: [
                        {
                          name: "order total",
                          price: finalTotal,
                          quantity: 1,
                        },
                      ],
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
  }, [openFawaterkDialog, hasedKey, orderCode, finalTotal, navigate]);
  //

  return <div id="fawaterkDivId"></div>;
};

export default Payment;
