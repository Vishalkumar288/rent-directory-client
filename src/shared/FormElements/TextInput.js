import {
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel
} from "@mui/material";

import { Controller } from "react-hook-form";
import { useEffect, useRef } from "react";

const TextInput = ({
  label,
  placeholder,
  helperText,
  name,
  control,
  disabled = false,
  type = "text",
  endIcon: EndIcon,
  startIcon,
  multiline = false,
  mandatoryField = false,
  filterCount = 0,
  sx = {},
  onlyCaps = false,
  isOrderTypeFilter = false
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (type === "number") {
      inputRef.current.addEventListener("wheel", (event) => {
        event.preventDefault();
      });
    }
  }, [type]);

  const handleChange = (event, field) => {
    let value = event.target.value;

    if (onlyCaps) {
      value = value.toUpperCase();
    }

    if (isOrderTypeFilter) {
      const regex = /^[A-Za-z]{0,2}-?[0-9]{0,5}$/;
      if (value.length === 2 && /^[A-Za-z]{2}$/.test(value)) {
        value = `${value}-`;
      } else if (value.length > 2 && !regex.test(value)) {
        return;
      }
    }

    field.onChange(value);
  };

  const handleKeyDown = (event) => {
    const cursorPosition = event.target.selectionStart;
    const value = event.target.value;

    if (isOrderTypeFilter) {
      if (
        event.key === "Backspace" &&
        cursorPosition === 3 &&
        value[cursorPosition - 1] === "-"
      ) {
        event.preventDefault();
        event.target.value =
          value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
        event.target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="standard" fullWidth disabled={disabled}>
          {label && (
            <InputLabel shrink htmlFor={name}>
              {label}
              {mandatoryField && <span style={{ color: "#F05454" }}> *</span>}
              {Boolean(filterCount) && (
                <span style={{ color: "#027AFF" }}>{` (${filterCount})`}</span>
              )}
            </InputLabel>
          )}
          <InputBase
            {...field}
            id={name}
            ref={inputRef}
            placeholder={placeholder}
            error={!!error}
            type={type}
            startAdornment={startIcon}
            multiline={multiline}
            rows={1}
            sx={sx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => handleChange(e, field)}
            onKeyDown={handleKeyDown}
            endAdornment={
              EndIcon && (
                <EndIcon
                  fontSize="15"
                  sx={{ mr: "12px", cursor: "pointer", color: "#607088" }}
                  onClick={(e) => {
                    inputRef.current.click();
                  }}
                />
              )
            }
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

export default TextInput;
