import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 24,
  height: 24,
  backgroundColor: "#E3E7EB",
  "input:hover ~ &": {
    backgroundColor: "#C7CED4"
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "#EEF1F4"
  }
}));

const CustomIconChecked = styled(CustomIcon)(({ theme, ...props }) => ({
  backgroundColor: props?.color,
  "&:before": {
    display: "block",
    width: 24,
    height: 24,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""'
  },
  "input:hover ~ &": {
    backgroundColor: props?.color
  }
}));

const RadioButtonGroup = ({
  label,
  helperText,
  name,
  control,
  options,
  disabled = false,
  sx = {},
  RadioGroupSx = { },
  defaultValue = ""
}) => {
  const generateRadioOptions = (field) => {
    return options.map((option, index) => {
      return (
        <Grid item key={index} xs={6} sx={sx}>
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={option?.disabled}
            control={
              <Radio
                checkedIcon={<CustomIconChecked color={option.color}/>}
                icon={<CustomIcon />}
                disabled={option?.disabled}
                sx={{
                  "&.Mui-checked + span": {
                    color: `${option.color} !important`
                  }
                }}
                checked={field.value === option.value}
              />
            }
          />
        </Grid>
      );
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // Use defaultValue prop
      render={({ field, fieldState: { error } }) => (
        <FormControl
          disabled={disabled}
        >
          {label && (
            <FormLabel
              id={name}
              sx={{
                marginRight: { xs: "18px", md: "28px" },
                fontWeight: field.value && 500,
                marginBottom: "initial"
              }}
            >
              {label}
            </FormLabel>
          )}
          <RadioGroup
            {...field}
            aria-labelledby={name}
            name={name}
            row
            onChange={(e) => field.onChange(e.target.value)}
            sx={RadioGroupSx}
          >
            {generateRadioOptions(field)}
          </RadioGroup>
          {helperText && (
            <FormHelperText sx={{ letterSpacing: "0.1em" }}>
              {helperText}
            </FormHelperText>
          )}
          {error && (
            <FormHelperText
              error
              sx={{
                marginLeft: 0
              }}
            >
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default RadioButtonGroup;
