import '../App.css';
import { Field } from "formik";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "../TextFieldWrapper";
import Button from "@material-ui/core/Button";

const fields = {
  MEMBER: "member",
  GROUP: "group",
};

const initialValues = {
  [fields.MEMBER]: "",
  [fields.GROUP]: "",
};

const GroupForm = ({ nodes, removeFromGroup, form }) => (
  <div className="form" >
    <div className="fieldContainer">
      <Field component={TextField} fullWidth label="Member" name={fields.MEMBER} required select variant="outlined">
        <MenuItem value={""} />
        {Object.entries(nodes).map((node) => (
          <MenuItem key={node[0]} value={node[0]}>{node[1]?.name}</MenuItem>
        ))}
      </Field>
    </div>
    <div className="fieldContainer">
      <Field component={TextField} fullWidth label="Group" name={fields.GROUP} required select variant="outlined">
        <MenuItem value={""} />
        {Object.entries(nodes).map((node) => node[1]?.type === "group" && (
          <MenuItem key={node[0]} value={node[0]}>{node[1]?.name}</MenuItem>
        ))}
      </Field>
    </div>
    <div className="fieldContainer">
      <Button type="submit" variant="contained" color="primary" style={{ width: "75%", borderRadius: "15px" }}>
        Create
      </Button>
    </div>
    <div className="fieldContainer">
      <Button
        onClick={() => removeFromGroup(form.values[fields.MEMBER], form.values[fields.GROUP])}
        variant="contained"
        color="primary"
        style={{ width: "75%", borderRadius: "15px" }}
      >
        Delete
      </Button>
    </div>
  </div>
);

GroupForm.initialValues = initialValues;
export default GroupForm;