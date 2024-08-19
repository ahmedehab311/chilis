import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Coupun({ api_token }) {
  const [couponCode, setCouponCode] = useState(""); // حالة لتخزين قيمة الكوبون
  const [error, setError] = useState(""); // حالة لتخزين رسائل الخطأ
  const API_COUPON = `https://myres.me/chilis/api/coupon/validation?coupon=${couponCode}&api_token=${api_token}`;

  const handleApplyCoupon = async () => {
    if (couponCode.trim() === "") {
      setError("Please enter a coupon code.");
      return;
    }

    setError(""); // مسح رسالة الخطأ إذا كانت القيمة غير فارغة

    try {
      const response = await axios.get(`${API_COUPON}?code=${couponCode}`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });

      const couponData = response.data;
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Failed to apply coupon. Please try again.");
    }
  };
  return (
    <Stack
      className="middleOrder"
      sx={{ p: 2, borderBottom: "2px solid #ececec" }}
    >
      <Stack className="middleOrder" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: "1rem" }}>
          <TextField
            id="coupon-code-input"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            sx={{
              flex: 1,

              "& .MuiInputBase-input": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                padding: ".9rem 1rem !important",
                fontSize: "1.3rem",
                color: "gray",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "gray",
                fontSize: "1.3rem",
              },
            }}
          />
          <Stack>
            <Button
              variant="contained"
              color="error"
              sx={{
                p: "10px 16px !important",
                height: "100%",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
              onClick={handleApplyCoupon}
            >
              Apply
            </Button>
          </Stack>
        </Stack>
        <TextField
          className="formControl"
          id="outlined-basic"
          placeholder="Any notes? please enter it here."
          fullWidth
          multiline
          minRows={3}
          sx={{
            width: "100%",
            transition: ".5s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiInputBase-input": {
              fontSize: "1.5rem",
              color: "gray",
              // textAlign:"center",
              m: ".2rem",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
              fontSize: "1.3rem",
            },
          }}
          InputProps={{
            style: {
              textAlign: "center",
            },
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Coupun;
