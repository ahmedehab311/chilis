/* eslint-disable react/prop-types */
import { Button, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function DiaolgLabels({
  handleSelectLabel,
  handleBlur,
  errors,
  customLabel,
  setCustomLabel,
}) {
  const { t } = useTranslation();
  const [showInput, setShowInput] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const handleSelect = (label) => {
    if (label === "Other") {
      setShowInput(true);
      setSelectedLabel(label);
    } else {
      setShowInput(false);
      handleSelectLabel(label);
      setCustomLabel("");
      setSelectedLabel(label);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCustomLabel(value);
    handleSelectLabel(value);
  };

  return (
    <Stack
      spacing={1}
      mt={2}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontSize: "1.1rem",
        justifyContent: "center",
        "@media (max-width: 700px)": {
          flexWrap: "wrap !important",
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSelect("Home")}
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            border:
              selectedLabel === t("address.labels.home")
                ? "2px solid #d32f2f"
                : "",
          }}
        >
          {t("address.labels.home")}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSelect("Work")}
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            border:
              selectedLabel === t("address.labels.work")
                ? "2px solid #d32f2f"
                : "",
          }}
        >
          {t("address.labels.work")}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSelect("Other")}
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            border:
              selectedLabel === t("address.labels.other")
                ? "2px solid #d32f2f"
                : "",
          }}
        >
          {t("address.labels.other")}
        </Button>
      </Stack>

      {showInput && (
        <TextField
          placeholder={t("address.labels.EnterAddressName")}
          variant="outlined"
          value={customLabel}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={!!errors.customLabel}
          helperText={errors.customLabel}
          fullWidth
          InputProps={{
            style: { fontSize: "1.3rem" },
          }}
        />
      )}
    </Stack>
  );
}

export default DiaolgLabels;
