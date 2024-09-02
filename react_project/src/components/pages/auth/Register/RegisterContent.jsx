// /* eslint-disable react/prop-types */
// import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// function RegisterContent({
//   registerUser,
//   register,
//   errors,
//   setEmail,
//   emailOnBlurHandler,
//   emailAvailabilityStatus,
//   setFirst_name,
//   setPassword,
//   setPhone,
//   handleEmailBlur,
//   onChangeEmail
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         backgroundColor: "#f5f5f5",
//         padding: "20px",
//       }}
//     >
//       <Stack
//         direction={{ xs: "column", md: "row" }}
//         spacing={4}
//         sx={{ width: "100%", maxWidth: "800px" }}
//       >
//         <Box
//           component="form"
//           onSubmit={registerUser}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             backgroundColor: "#fff",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: 1,
//             flex: 1,
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
//           >
//             Sign Up
//           </Typography>
//           <Stack>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: "1.3rem", fontWeight: "600" }}
//             >
//               First Name
//             </Typography>
//             <TextField
//               placeholder="Enter Name"
//               {...register("firstName")}
//               error={!!errors.firstName}
//               helperText={errors.firstName?.message}
//               variant="outlined"
//               onBlur={emailOnBlurHandler}
//               fullWidth
//               requiredx
//               onChange={(e) => setFirst_name(e.target.value)}
//               sx={{
//                 "& .MuiInputBase-input": {
//                   fontSize: "1.3rem",
//                   color: "gray",
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontSize: "1.2rem",
//                 },
//               }}
//             />
//           </Stack>
//           <Stack>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: "1.3rem", fontWeight: "600" }}
//             >
//               Email Address
//             </Typography>
//             <TextField
//               // placeholder="Enter Your Email Address"
//               // {...register("email")}
//               // onBlur={emailOnBlurHandler}
//               // error={!!errors.email}
//               // helperText={errors.email?.message}
//               // fullWidth
//               // required
//               // onChange={(e) => setEmail(e.target.value)}
//               // sx={{
//               //   "& .MuiInputBase-input": {
//               //     fontSize: "1.3rem",
//               //     color: "gray",
//               //   },
//               //   "& .MuiInputLabel-root": {
//               //     fontSize: "1.2rem",
//               //   },
//               // }}
//               placeholder="Enter Your Email Address"
//               {...register("email")}
//               onBlur={handleEmailBlur}
//               onChange={onChangeEmail}
//               variant="outlined"
//               fullWidth
//               required
//               error={!!errors.email}
//               helperText={errors.email?.message}
//               sx={{
//                 "& .MuiInputBase-input": {
//                   fontSize: "1.3rem",
//                   color: "gray",
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontSize: "1.2rem",
//                 },
//                 "& .MuiFormHelperText-root": {
//                   fontSize: "1.1rem", // تغيير حجم النص في رسالة الخطأ
//                   color: "red", // تغيير لون النص في رسالة الخطأ
//                 },
//               }}
//             />
//           </Stack>
//           <Stack>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: "1.3rem", fontWeight: "600" }}
//             >
//               Password
//             </Typography>
//             <TextField
//               placeholder="Enter Password"
//               type="password"
//               {...register("password")}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               variant="outlined"
//               fullWidth
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{
//                 "& .MuiInputBase-input": {
//                   fontSize: "1.3rem",
//                   color: "gray",
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontSize: "1.2rem",
//                 },
//               }}
//             />
//           </Stack>
//           <Stack>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: "1.3rem", fontWeight: "600" }}
//             >
//               Phone
//             </Typography>
//             <TextField
//               placeholder="Enter Your Phone Number"
//               type="text"
//               {...register("phone")}
//               error={!!errors.phone}
//               helperText={errors.phone?.message}
//               variant="outlined"
//               fullWidth
//               required
//               onChange={(e) => setPhone(e.target.value)}
//               sx={{
//                 "& .MuiInputBase-input": {
//                   fontSize: "1.3rem",
//                   color: "gray",
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontSize: "1.2rem",
//                 },
//               }}
//             />
//           </Stack>
//           <Button
//             type="submit"
//             disabled={emailAvailabilityStatus === "checking"}
//             variant="contained"
//             color="error"
//             sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
//           >
//             Sign Up
//           </Button>
//           <Typography
//             variant="body2"
//             align="center"
//             sx={{ mt: 2, fontSize: "18px" }}
//           >
//             <Link component={RouterLink} to="/login" color={"#000"}>
//               <Typography
//                 variant="h6"
//                 sx={{ fontSize: "1.5rem", fontWeight: "600" }}
//               >
//                 Already have an account? Sign in
//               </Typography>
//             </Link>
//           </Typography>
//         </Box>
//       </Stack>
//     </Box>
//   );
// }

// export default RegisterContent;

import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function RegisterContent({
  registerUser,
  register,
  errors,
  setEmail,
  emailOnBlurHandler,
  emailAvailabilityStatus,
  setFirst_name,
  setPassword,
  setPhone,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%", maxWidth: "800px" }}
      >
        <Box
          component="form"
          onSubmit={registerUser}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 1,
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
          >
            Sign Up
          </Typography>

          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
            >
              First Name
            </Typography>
            <TextField
              placeholder="Enter Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setFirst_name(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1.1rem",
                  color: "red",
                },
              }}
            />
          </Stack>

          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
            >
              Email Address
            </Typography>
            <TextField
              placeholder="Enter Your Email Address"
              {...register("email")}
              onBlur={emailOnBlurHandler}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1.1rem",
                  color: "red",
                },
              }}
            />
          </Stack>

          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
            >
              Password
            </Typography>
            <TextField
              placeholder="Enter Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1.1rem",
                  color: "red",
                },
              }}
            />
          </Stack>

          {/* <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.3rem", fontWeight: "600" }}
            >
              Phone
            </Typography>
            <TextField
              placeholder="Enter Your Phone Number"
              // type="text"
              {...register("phone")}
              type="tel"
        inputMode="numeric" // Use numeric mode for numeric keyboards on mobile
        pattern="[0-9]*" // Restrict input to numbers only
              error={!!errors.phone}
              helperText={errors.phone?.message}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                  color: "gray",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1.1rem",
                  color: "red",
                },
              }}
            />
          </Stack> */}
          <Stack>
      <Typography variant="h6" sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
        Phone
      </Typography>
      <TextField
        placeholder="Enter Your Phone Number"
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Please enter a valid phone number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        variant="outlined"
        fullWidth
        required
        onChange={(e) => {
          // Ensure only numeric values are set
          const value = e.target.value.replace(/\D/g, '');
          setPhone(value);
        }}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.3rem",
            color: "gray",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "1.1rem",
            color: "red",
          },
        }}
        inputProps={{
          maxLength: 10, // Limit input length if needed (e.g., 10 digits for phone numbers)
        }}
      />
    </Stack>

          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Sign Up
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: "18px" }}
          >
            <Link component={RouterLink} to="/login" color={"#000"}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Already have an account? Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default RegisterContent;
