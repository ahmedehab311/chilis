import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";

function Pickup() {
  const API_BRANCHES = `https://myres.me/happyjoes_test/api/branches/1`;
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    axios
      .get(API_BRANCHES)
      .then((response) => {
        const branchData = response.data.data?.branches;
        if (Array.isArray(branchData)) {
          setBranches(branchData);
          setLoading(false);
        } else {
          setError("Unexpected data format");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Error fetching branches");
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <Typography>Your Location</Typography>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedBranch}
          onChange={handleChange}
          // renderValue={(selected) => {
          //   const branch = branches.find((b) => b.id === selected);
          //   return branch ? branch.name_en : "";
          // }}
          sx={{ minWidth: 300 }} // Set the minimum width of the Select
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
                {branch.name_en}{" "}
                {/* استخدم name_en أو name_ar حسب اللغة التي تفضلها */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Pickup;
