import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import img from "./main.jpg";
import "./Main.css";
import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate(); // استخدام navigate للتنقل

  const handleReadMore = () => {
    navigate("/about-us"); // الانتقال إلى صفحة "about-us"
  };
  return (
    <div id="about">
      <Container sx={{ display: "flex", alignItems: "center", mt: 4, ml: 0 }}>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src={img}
            width="500px"
            height="400px"
            alt="img"
            className="imgMain"
            
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="h2"
            className="text"
            sx={{
              mb: 2,
              textTransform: "capitalize",
              fontFamily: "cairo",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                // my: "3rem",
                color: "#000",
                // margin: "5px 0 5px 0 ",
                fontFamily: "cairo",
              }}
            >
              chilis{" "}
              <span style={{ color: "red", fontFamily: "cairo" }}>Egypt</span>
            </div>
            for getting real transparent
          </Typography>
          <Typography
            sx={{
              color: "#555",
              // mt: "1.5rem",
              letterSpacing: 5,
              fontSize: "18px",
              textTransform: "uppercase",
              my:"1rem"
            }}
            fontFamily={"Baskervville SC"}
          >
            discover our food
          </Typography>
          <div className="borderMain"></div>
          <Typography
 sx={{
              mt: "1.1rem",
              mb: 2,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              fontWeight: "600",
              color: "#333",
        
              fontFamily: "Uniform",
              lineHeight: 1.8, 
              maxWidth: "100%", 
            }}

          >
            As one of the country's longest-standing international restaurant
            chains, Chili's has been part of the Egyptian dining scene for over
            30 years. In addition to serving American and Tex-Mex cuisine,
            Chili's has become a cherished part of the community, known for its
            warm atmosphere and memorable moments. Having been in business for
            three decades, Chili's hasn't only provided quality food but has
            also become a cherished part of the community. 

          </Typography>
       
          <Button
            variant="outlined"
            color="error"
            sx={{
              textTransform: "uppercase",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onClick={handleReadMore}
            className="btn"
          >
            read more
          </Button>
          {/* <Stack> */}
        </Box>
      </Container>
    </div>
  );
}

export default Main;

// import { Box, Container, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import img from "./main.jpg";
// import "./Main.css";
// import { useNavigate } from "react-router-dom";

// function Main() {
//   const navigate = useNavigate(); // استخدام navigate للتنقل

//   const handleReadMore = () => {
//     navigate("/about-us"); // الانتقال إلى صفحة "about-us"
//   };

//   return (
//     <div id="about">
//       <Container
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" }, // صف للشاشات الكبيرة وعمود للشاشات الصغيرة
//           alignItems: "flex-start", // محاذاة المحتوى إلى اليسار
//           justifyContent: "flex-start", // وضع المحتوى على الشمال
//           mt: 4,
//           gap: 4, // إضافة فراغ بين العناصر
//         }}
//       >
//         {/* Box للصورة */}
//         <Box
//           sx={{
//             flexGrow: 0, // منع التمدد
//             display: "flex",
//             justifyContent: "center", // وضع الصورة في المنتصف داخل الـ Box
//             alignItems: "center",
//             maxWidth: "500px", // تحديد حجم أقصى للصورة
//           }}
//         >
//           <img
//             src={img}
//             width="100%"
//             height="auto"
//             alt="img"
//             className="imgMain"
//             style={{
//               borderRadius: "8px",
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           />
//         </Box>

//         {/* Box للنصوص والأزرار */}
//         <Box sx={{ ml: { xs: 0, md: 3 }, maxWidth: "600px" }}>
//           <Typography
//             variant="h2"
//             className="text"
//             sx={{
//               mb: 2,
//               textTransform: "capitalize",
//               fontFamily: "Cairo",
//               fontSize: { xs: "30px", md: "40px" },
//               fontWeight: "bold",
//             }}
//           >
//             chilis{" "}
//             <span style={{ color: "red", fontFamily: "Cairo" }}>Egypt</span> for
//             getting real transparent
//           </Typography>
          
//           <Typography
//             sx={{
//               color: "#555",
//               letterSpacing: 5,
//               fontSize: "18px",
//               textTransform: "uppercase",
//               my: "1rem",
//               fontFamily: "Baskervville SC",
//             }}
//           >
//             discover our food
//           </Typography>
//           <div className="borderMain"></div>

//           <Typography
//             sx={{
//               mt: "1.1rem",
//               mb: 2,
//               fontSize: "1.2rem",
//               fontWeight: "600",
//               color: "#000",
//               fontFamily: "Uniform",
//               lineHeight: 1.8, // تحسين المسافة بين الأسطر
//               maxWidth: "100%", // ملء المساحة المتاحة للنص
//             }}
//           >
//             As one of the country's longest-standing international restaurant
//             chains, Chili's has been part of the Egyptian dining scene for over
//             30 years. In addition to serving American and Tex-Mex cuisine,
//             Chili's has become a cherished part of the community, known for its
//             warm atmosphere and memorable moments. Having been in business for
//             three decades, Chili's hasn't only provided quality food but has
//             also become a cherished part of the community.
//           </Typography>

//           <Button
//             variant="outlined"
//             color="error"
//             sx={{
//               textTransform: "uppercase",
//               fontSize: "15px",
//               fontWeight: "bold",
//             }}
//             onClick={handleReadMore} // استدعاء الدالة عند الضغط
//             className="btn"
//           >
//             read more
//           </Button>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default Main;
