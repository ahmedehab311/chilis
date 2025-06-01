import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCleanFawaterkStyles = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/order-online/payment") {
   
      document.body.style = "";

      // لو في كلاس اتحقن في body
      document.body.className = document.body.className
        .split(" ")
        .filter((cls) => !cls.includes("fawaterk")) // امسح أي class متعلق بالـ fawaterk
        .join(" ");

      // لو في ستايلات اتحقنت من السكريبت وعايز تشيلها
      const injectedStyles = document.querySelectorAll("style, link[rel='stylesheet']");
      injectedStyles.forEach((node) => {
        if (node.innerHTML.includes("fawaterk") || node.href?.includes("fawaterk")) {
          node.remove();
        }
      });
    }
  }, [location.pathname]);
};

export default useCleanFawaterkStyles;
