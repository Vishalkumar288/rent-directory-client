import "react-datepicker/dist/react-datepicker.css";

import {
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel
} from "@mui/material";

import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

const DateInput = ({
  label,
  placeholder,
  helperText,
  name,
  control,
  disabled = false,
  endIcon: EndIcon,
  startIcon: StartIcon,
  selectsRange = false,
  format = "dd MMMM, yy",
  showTimeSelect = false,
  showTimeSelectOnly = false,
  timeIntervals = 15,
  showYearPicker = false,
  mandatoryField = false,
  popperPlacement = "",
  minDate = new Date(new Date().valueOf() + 1000 * 3600 * 24),
  maxDate = "",
  sx = {},
  filterStyle = {}
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRangeField = (dates, field) => {
    const [start, end] = dates;
    setStartDate(start instanceof Date && !isNaN(start) ? start : null);
    setEndDate(end instanceof Date && !isNaN(end) ? end : null);
    field.onChange(dates);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectsRange ? [null, null] : ""}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="standard" fullWidth disabled={disabled}>
          {label && (
            <InputLabel shrink htmlFor={name} sx={filterStyle}>
              {label}
              {mandatoryField && <span style={{ color: "#F05454" }}> *</span>}
            </InputLabel>
          )}
          <ReactDatePicker
            selected={selectsRange ? startDate : field.value}
            onChange={
              selectsRange
                ? (dates) => handleRangeField(dates, field)
                : field.onChange
            }
            id={name}
            autoComplete="off"
            placeholderText={placeholder}
            selectsRange={selectsRange}
            startDate={startDate || field?.value ? field?.value[0] : null}
            endDate={endDate || field?.value ? field?.value[1] : null}
            dateFormat={format}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            showYearPicker={showYearPicker}
            timeIntervals={timeIntervals}
            minDate={minDate}
            maxDate={maxDate}
            popperPlacement={popperPlacement ?? "top"}
            popperClassName="custom-popper"
            customInput={
              <InputBase
                sx={sx}
                error={!!error}
                startAdornment={
                  StartIcon && (
                    <StartIcon
                      fontSize="15"
                      sx={{ ml: "12px", cursor: "pointer", color: "#607088" }}
                    />
                  )
                }
                endAdornment={
                  EndIcon && (
                    <EndIcon
                      sx={{
                        fontSize: { xs: "13px", md: "15px" },
                        mr: "12px",
                        cursor: "pointer",
                        color: "#607088"
                      }}
                    />
                  )
                }
              />
            }
            className=""
            disabled={disabled}
          />
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

export default DateInput;
