// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchBranches, setSelectedBranch } from "../../../../../rtk/slices/BranchesSlice"; // إضافة setSelectedBranch
// // import {
// //   FormControl,
// //   Select,
// //   MenuItem,
// //   CircularProgress,
// //   FormHelperText,
// //   Typography,
// // } from "@mui/material";

// // function Pickup() {
// //   const dispatch = useDispatch();
// //   const { branches, loading, error } = useSelector((state) => state.branches);
// //   const selectedBranchId = useSelector((state) => state.branches.selectedBranchId);

// //   useEffect(() => {
// //     dispatch(fetchBranches());
// //   }, [dispatch]);

// //   const handleChange = (event) => {
// //     const selectedBranchId = event.target.value;
// //     dispatch(setSelectedBranch(selectedBranchId)); // تخزين الـ ID في Redux

// //     // طباعة الـ ID في الكونسول (اختياري)
// //     console.log("Selected Branch ID:", selectedBranchId);
// //   };

// //   return (
// //     <div>
// //       <FormControl fullWidth sx={{ mt: 2 }}>
// //         <Typography sx={{
// //           fontSize: "1.6rem",
// //           textAlign: "center",
// //           mb:".5rem",
// //           fontWeight: "bold",
// //           textTransform: "capitalize",
// //           color: "#000",
// //         }}>Select Branch</Typography>
// //         <Select
// //           id="branch-select"
// //           value={selectedBranchId || ""}
// //           onChange={handleChange}
// //           sx={{ minWidth: 300 }}
// //         >
// //           {loading && (
// //             <MenuItem disabled>
// //               <CircularProgress size={24} />
// //             </MenuItem>
// //           )}
// //           {error && (
// //             <MenuItem disabled>
// //               <FormHelperText>{error}</FormHelperText>
// //             </MenuItem>
// //           )}
// //           {!loading && !error && branches.length === 0 && (
// //             <MenuItem disabled>No branches available</MenuItem>
// //           )}
// //           {!loading &&
// //             !error &&
// //             branches.map((branch) => (
// //               <MenuItem key={branch.id} value={branch.id}>
// //                 {branch.name_en}
// //               </MenuItem>
// //             ))}
// //         </Select>
// //       </FormControl>
// //     </div>
// //   );
// // }

// // export default Pickup;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBranches,
//   setSelectedBranch,
// } from "../../../../../rtk/slices/BranchesSlice";
// import {
//   FormControl,
//   Select,
//   MenuItem,
//   CircularProgress,
//   FormHelperText,
//   Typography,
//   Alert,
// } from "@mui/material";

// function Pickup({ onBranchStatusChange }) {
//   const dispatch = useDispatch();
//   const { branches, loading, error } = useSelector((state) => state.branches);
//   const selectedBranchId = useSelector(
//     (state) => state.branches.selectedBranchId
//   );
//   const [branchClosed, setBranchClosed] = useState(false);

//   useEffect(() => {
//     console.log("Fetching branches from API...");
//     dispatch(fetchBranches());
//   }, [dispatch]);

//   const isBranchClosed = (branch) => {
//     const now = new Date();
//     const openTime = new Date();
//     const closeTime = new Date();
//     console.log("now",now);

//     const [openHour, openMinute, openSecond] = branch.open
//       .split(":")
//       .map(Number);
//     const [closeHour, closeMinute, closeSecond] = branch.close
//       .split(":")
//       .map(Number);

//     openTime.setHours(openHour, openMinute, openSecond);
//     closeTime.setHours(closeHour, closeMinute, closeSecond);

//     if (closeHour < openHour) {
//       closeTime.setDate(closeTime.getDate() + 1);
//     }
//     console.log("openTime", openTime);
//     console.log("closeTime", closeTime);
//     console.log(`Branch selected: ${branch.name_en}`);
//     console.log(`Current time: ${now.toTimeString().split(" ")[0]}`);
//     console.log(`Branch open time: ${branch.open}`);
//     console.log(`Branch close time: ${branch.close}`);

//     const closed = now < openTime || now > closeTime;
//     if (closed) {
//       console.log("The branch is currently closed.");
//     } else {
//       console.log("The branch is currently open.");
//     }

//     return closed;
//   };

//   const handleChange = (event) => {
//     const selectedBranchId = event.target.value;
//     const selectedBranch = branches.find(
//       (branch) => branch.id === selectedBranchId
//     );

//     if (selectedBranch) {
//       const closed = isBranchClosed(selectedBranch);
//       setBranchClosed(closed);
//       console.log(`Selected branch ID: ${selectedBranchId}`);
//       console.log(closed ? "Branch is closed." : "Branch is open.");

//       // تمرير حالة الفرع للأب
//       onBranchStatusChange(closed);
//     } else {
//       console.log("No branch selected or branch not found.");
//     }

//     dispatch(setSelectedBranch(selectedBranchId));
//   };

//   return (
//     <div>
//       <FormControl fullWidth sx={{ mt: 2 }}>
//         <Typography
//           sx={{
//             fontSize: "1.6rem",
//             textAlign: "center",
//             mb: ".5rem",
//             fontWeight: "bold",
//             textTransform: "capitalize",
//             color: "#000",
//           }}
//         >
//           Select Branch
//         </Typography>
//         <Select
//           id="branch-select"
//           value={selectedBranchId || ""}
//           onChange={handleChange}
//           sx={{ minWidth: 300 }}
//         >
//           {loading && (
//             <MenuItem disabled>
//               <CircularProgress size={24} />
//             </MenuItem>
//           )}
//           {error && (
//             <MenuItem disabled>
//               <FormHelperText>{error}</FormHelperText>
//             </MenuItem>
//           )}
//           {!loading && !error && branches.length === 0 && (
//             <MenuItem disabled>No branches available</MenuItem>
//           )}
//           {!loading &&
//             !error &&
//             branches.map((branch) => (
//               <MenuItem key={branch.id} value={branch.id}>
//                 {branch.name_en}
//               </MenuItem>
//             ))}
//         </Select>
//         {branchClosed && (
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             Sorry, this branch is currently closed.
//           </Alert>
//         )}
//       </FormControl>
//     </div>
//   );
// }

// export default Pickup;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranches,
  setSelectedBranch,
} from "../../../../../rtk/slices/BranchesSlice";
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

function Pickup({ onBranchStatusChange }) {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branches);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const [branchClosed, setBranchClosed] = useState(false);

  useEffect(() => {
    console.log("Fetching branches from API...");
    dispatch(fetchBranches());
  }, [dispatch]);

  const isBranchClosed = (branch) => {
    const now = new Date();
    const openTime = new Date();
    const closeTime = new Date();
    console.log("now", now);

    const [openHour, openMinute, openSecond] = branch.open
      .split(":")
      .map(Number);
    const [closeHour, closeMinute, closeSecond] = branch.close
      .split(":")
      .map(Number);

    openTime.setHours(openHour, openMinute, openSecond);
    closeTime.setHours(closeHour, closeMinute, closeSecond);

    if (closeHour < openHour) {
      closeTime.setDate(closeTime.getDate() + 1);
    }
    // console.log("openTime", openTime);
    // console.log("closeTime", closeTime);
    // console.log(`Branch selected: ${branch.name_en}`);
    // console.log(`Current time: ${now.toTimeString().split(" ")[0]}`);
    // console.log(`Branch open time: ${branch.open}`);
    // console.log(`Branch close time: ${branch.close}`);

    const closed = now < openTime || now > closeTime;
    if (closed) {
      console.log("The branch is currently closed.");
    } else {
      console.log("The branch is currently open.");
    }

    return closed;
  };

  const handleChange = (event) => {
    const selectedBranchId = event.target.value;
    const selectedBranch = branches.find(
      (branch) => branch.id === selectedBranchId
    );

    if (selectedBranch) {
      const closed = isBranchClosed(selectedBranch);
      setBranchClosed(closed);
      console.log(`Selected branch ID: ${selectedBranchId}`);
      console.log(closed ? "Branch is closed." : "Branch is open.");

      // تمرير حالة الفرع للأب
      onBranchStatusChange(closed);
    } else {
      console.log("No branch selected or branch not found.");
    }

    dispatch(setSelectedBranch(selectedBranchId));
  };

  return (
    <Stack>
      <FormControl fullWidth sx={{ mt: 2 }}>
        {/* <Typography
          sx={{
            fontSize: "1.6rem",
            textAlign: "center",
            mb: ".5rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#000",
          }}
        >
          Select Branch
        </Typography> */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{
            "@media (max-width: 700px)": {
              flexDirection: "column !important",
              
            },
          }}
        >
          <Select
            id="branch-select"
            value={selectedBranchId || ""}
            onChange={handleChange}
            sx={{ minWidth: 300 }}
            displayEmpty 
          >
            <MenuItem value="" disabled>
              Select Branch
            </MenuItem>
            {loading && (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            )}
            {error && (
              <MenuItem disabled>
                <FormHelperText>{error}</FormHelperText>
              </MenuItem>
            )}
            {!loading && !error && branches.length === 0 && (
              <MenuItem disabled>No branches available</MenuItem>
            )}
            {!loading &&
              !error &&
              branches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name_en}
                </MenuItem>
              ))}
          </Select>
          {branchClosed && (
            <Alert severity="warning" sx={{ ml: "1rem", fontSize: "1.1rem","@media (max-width: 700px)": {
             mt: "1rem"
              
            }, }}>
              Sorry, this branch is currently closed.
            </Alert>
          )}
        </Stack>
      </FormControl>
    </Stack>
  );
}

export default Pickup;
