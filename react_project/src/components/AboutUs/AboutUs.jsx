// import { Stack, Typography } from "@mui/material";
// import img from "../Main/main.jpg";
// function AboutUs() {
//   return (
//     <Stack direction={"row"} alignItems={"center"}>
//       <img
//         src={img}
//         width="400px"
//         height="400px"
//         alt="img"
//         className="aboutUsImg"
//       />
//       <Typography
//         sx={{ fontSize: "2rem", color: "#000", fontWeight: "bold", m: "1rem " }}
//       >
//         As one of the country's longest-standing international restaurant
//         chains, Chili's has been part of the Egyptian dining scene for over 30
//         years. In addition to serving American and Tex-Mex cuisine, Chili's has
//         become a cherished part of the community, known for its warm atmosphere
//         and memorable moments. Having been in business for three decades,
//         Chili's hasn't only provided quality food but has also become a
//         cherished part of the community. Chili's Egypt's menu reflects the
//         global brand's commitment to quality and flavor. More than just a
//         restaurant, Chili's Egypt is a place where people meet and celebrate
//         life's small and big moments. As a result of the friendly and dedicated
//         staff at Chili's, every visit to the restaurant is memorable and
//         enjoyable. Chili's remains committed to serving quality food in a lively
//         environment as it continues to grow and evolve. The Chili's Egypt
//         restaurant is the perfect choice for a flavorful adventure, whether you
//         are looking for a casual lunch, a family dinner, or a night out with
//         friends. A new era in Egypt has begun with Elite line holding company
//         since 2024. Join us at Chili's Egypt and discover why we've been a
//         favorite for 30 incredible years. Welcome to Chili's, where every meal
//         is a celebration of good times and great food.
//       </Typography>
//     </Stack>
//   );
// }

// export default AboutUs;

import { Stack, Typography, Box } from "@mui/material";
import img from "../Main/main.jpg";

function AboutUs() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: "2rem" }}>
      <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={4}>
        <Box
          component="img"
          src={img}
          alt="img"
          sx={{
            width: { xs: "300px", md: "400px" },
            height: { xs: "300px", md: "400px" },
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", md: "1.8rem" },
            color: "#333",
            fontWeight: "bold",
            lineHeight: "1.6",
            textAlign: { xs: "center", md: "left" },
            maxWidth: "600px",
          }}
        >
          As one of the country's longest-standing international restaurant chains, Chili's has been part of the Egyptian
          dining scene for over 30 years. In addition to serving American and Tex-Mex cuisine, Chili's has become a
          cherished part of the community, known for its warm atmosphere and memorable moments. Having been in business
          for three decades, Chili's hasn't only provided quality food but has also become a cherished part of the
          community. Chili's Egypt's menu reflects the global brand's commitment to quality and flavor. More than just a
          restaurant, Chili's Egypt is a place where people meet and celebrate life's small and big moments. As a result
          of the friendly and dedicated staff at Chili's, every visit to the restaurant is memorable and enjoyable.
          Chili's remains committed to serving quality food in a lively environment as it continues to grow and evolve.
          The Chili's Egypt restaurant is the perfect choice for a flavorful adventure, whether you are looking for a
          casual lunch, a family dinner, or a night out with friends. A new era in Egypt has begun with Elite line
          holding company since 2024. Join us at Chili's Egypt and discover why we've been a favorite for 30 incredible
          years. Welcome to Chili's, where every meal is a celebration of good times and great food.
        </Typography>
      </Stack>
    </Box>
  );
}

export default AboutUs;
