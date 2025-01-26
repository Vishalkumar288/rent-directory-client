import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { Close, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  background: "#FFFFFF !important"
}));

const DropDown = ({
  label,
  placeholder,
  helperText,
  name,
  control,
  options,
  renderComponentOptions,
  renderComponentValue,
  disabled = false,
  startIcon: StartIcon,
  isLoading = false,
  multiple = false,
  setValue,
  onRemove,
  mandatoryField = false,
  filterCount = 0,
  availUnselect = false,
  unSelectText = "",
  allowSearch = false,
  sx = {},
  filterStyle = {}
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options?.filter(
    ({ displayName }) =>
      typeof displayName === "string" &&
      displayName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ""}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth disabled={disabled}>
          {label && (
            <InputLabel shrink htmlFor={name} sx={filterStyle}>
              {label}
              {mandatoryField && <span style={{ color: "#F05454" }}> *</span>}
              {Boolean(filterCount) && (
                <span style={{ color: "#027AFF" }}>{` (${filterCount})`}</span>
              )}
            </InputLabel>
          )}
          <Select
            {...field}
            sx={sx}
            inputProps={{
              id: name
            }}
            multiple={multiple}
            error={!!error}
            IconComponent={
              isLoading ? CircularProgress : KeyboardArrowDownOutlined
            }
            displayEmpty
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            startAdornment={
              StartIcon && (
                <InputAdornment position="start">
                  <StartIcon />
                </InputAdornment>
              )
            }
            renderValue={(value) => {
              if (renderComponentValue) {
                return renderComponentValue;
              } else if (Array.isArray(value)) {
                return (
                  <Typography fontSize="14px" color="text.disabled">
                    {placeholder}
                  </Typography>
                );
              } else {
                const item = options?.find((item) => item.name === value);
                return field.value !== "" ? (
                  item?.displayName
                ) : (
                  <Typography fontSize="14px" color="text.disabled">
                    {placeholder}
                  </Typography>
                );
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 5 + 8,
                  maxWidth: 200
                }
              }
            }}
            onClose={() => setSearchTerm("")}
          >
            {allowSearch && (
              <Box
                px={1}
                py={1}
                position="sticky"
                top={0}
                zIndex={1}
                bgcolor="white"
              >
                <InputBase
                  autoFocus
                  sx={sx}
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </Box>
            )}
            {availUnselect && <MenuItem value="">{unSelectText}</MenuItem>}
            {renderComponentOptions
              ? renderComponentOptions?.map((component, index) => (
                  <CustomMenuItem key={index} value={undefined}>
                    {component}
                  </CustomMenuItem>
                ))
              : allowSearch
              ? filteredOptions?.map(({ displayName, name }) => (
                  <MenuItem key={name} value={name}>
                    {displayName}
                  </MenuItem>
                ))
              : options?.map(({ displayName, name }) => (
                  <MenuItem key={name} value={name}>
                    {displayName}
                  </MenuItem>
                ))}
          </Select>
          {multiple && field.value.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9, mt: 2 }}>
              {field.value.map((value, index) => {
                const item = options?.find((item) => item.name === value);
                return (
                  <Chip
                    key={value}
                    disabled={disabled}
                    label={item?.displayName}
                    sx={{
                      backgroundColor: "#D4E3FF80",
                      padding: "6px",
                      fontSize: 14,
                      fontWeight: 500
                    }}
                    onDelete={(e) => {
                      e.preventDefault();
                      const updatedValues = field.value.filter(
                        (item) => item !== value
                      );
                      if (setValue) {
                        setValue(name, updatedValues);
                      }
                      if (onRemove) {
                        onRemove(value, index);
                      }
                    }}
                    deleteIcon={
                      <Close
                        fontSize="small"
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
                );
              })}
            </Box>
          )}
          {helperText && (
            <FormHelperText sx={{ letterSpacing: "0.1em" }}>
              {helperText}
            </FormHelperText>
          )}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default DropDown;
