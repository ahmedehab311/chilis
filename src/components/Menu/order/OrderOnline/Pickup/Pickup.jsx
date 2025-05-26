/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
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
  Alert,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
function Pickup({ onBranchStatusChange }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branches);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );

  const [branchClosed, setBranchClosed] = useState(false);

  console.log("selectedBranchId", selectedBranchId);

  useEffect(() => {
    // console.log("Fetching branches from API...");
    dispatch(fetchBranches());
  }, [dispatch]);

  const isBranchClosed = (branch) => {
    const now = new Date();
    const openTime = new Date();
    const closeTime = new Date();

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
      console.log("selectedBranch", selectedBranch);
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
              {t("selectBranch")}
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
                  {i18n.language === "ar" ? branch.name_ar : branch.name_en}
                </MenuItem>
              ))}
          </Select>
          {branchClosed && (
            <Alert
              severity="warning"
              sx={{
                ml: "1rem",
                fontSize: "1.3rem",
                fontWeight: "600",
                "@media (max-width: 700px)": {
                  mt: "1rem",
                },
              }}
            >
              {t("branchClosed")}
            </Alert>
          )}
        </Stack>
      </FormControl>
    </Stack>
  );
}

export default Pickup;
