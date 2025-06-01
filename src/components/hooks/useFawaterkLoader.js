// src/hooks/useFawaterkLoader.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useFawaterkLoader = ({ openFawaterkDialog, hasedKey, orderCode }) => {
  const location = useLocation();
  const isPaymentPage = location.pathname === "/order-online/payment";

  useEffect(() => {
    if (!isPaymentPage) return; // ✅ حمّله بس لو في صفحة الدفع

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
                script.onload = () => resolve();
                script.onerror = () =>
                  reject(new Error("Failed to load Fawaterk script"));
                document.body.appendChild(script);
              });
            };

            loadFawaterkScript()
              .then(() => {
                if (window.fawaterkCheckout) {
                  window.pluginConfig = {
                    envType: "test",
                    hashKey: hasedKey,
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
                        failUrl: `https://chilis-egypt.com/order-online/payment/fail/${orderCode}`,
                        pendingUrl: `https://chilis-egypt.com/order-online/payment/failpending/${orderCode}`,
                      },
                      cartItems: [
                        { name: "this is test oop 112252", price: "25", quantity: "1" },
                        { name: "this is test oop 112252", price: "25", quantity: "1" },
                      ],
                      payLoad: { custom_field1: "xyz", custom_field2: "xyz2" },
                    },
                  };

                  window.fawaterkCheckout(window.pluginConfig);
                }
              })
              .catch((error) => {
                console.error("Error loading Fawaterk script:", error);
              });
          }
        }

        attempts++;
      }, 100);

      return () => {
        clearInterval(interval);

        const div = document.getElementById("fawaterkDivId");
        if (div) {
          div.innerHTML = "";
        }

        const script = document.querySelector(
          'script[src*="fawaterkPlugin.min.js"]'
        );
        if (script) {
          script.remove();
        }
      };
    }
  }, [isPaymentPage, openFawaterkDialog, hasedKey, orderCode]);
};

export default useFawaterkLoader;
