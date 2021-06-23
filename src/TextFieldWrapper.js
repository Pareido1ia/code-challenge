import MUITextField from "@material-ui/core/TextField";
import React from "react";

const TextField = ({children, field, form, format, fullWidth, label, required, ...props}) => {

  return (
      <MUITextField
          {...field}
          fullWidth={fullWidth}
          label={label}
          required={required}
          {...props}
      >
        {children}
      </MUITextField>
  );
};

export default TextField;