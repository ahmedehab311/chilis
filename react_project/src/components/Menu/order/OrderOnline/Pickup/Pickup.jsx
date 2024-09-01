import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, setSelectedBranch } from "../../../../../rtk/slices/BranchesSlice"; // إضافة setSelectedBranch
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";

function Pickup() {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branches);
  const selectedBranchId = useSelector((state) => state.branches.selectedBranchId);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleChange = (event) => {
    const selectedBranchId = event.target.value;
    dispatch(setSelectedBranch(selectedBranchId)); // تخزين الـ ID في Redux

    // طباعة الـ ID في الكونسول (اختياري)
    console.log("Selected Branch ID:", selectedBranchId);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <Typography sx={{
          fontSize: "1.6rem",
          textAlign: "center",
          mb:".5rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          color: "#000",
        }}>Select Branch</Typography>
        <Select
          id="branch-select"
          value={selectedBranchId || ""}
          onChange={handleChange}
          sx={{ minWidth: 300 }}
        >
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
      </FormControl>
    </div>
  );
}

export default Pickup;
