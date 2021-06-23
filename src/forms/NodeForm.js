import '../App.css';
import { Field } from "formik";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import NodeType from "../NodeType";
import TextField from "../TextFieldWrapper";
import Button from "@material-ui/core/Button";

const fields = {
  NAME: "name",
  TYPE: "type",
};

const initialValues = {
  [fields.NAME]: "",
  [fields.TYPE]: "",
};

const NodeForm = ({ removeNode, form }) => (
    <div className="form" >
      <div className="fieldContainer">
        <Field component={TextField} fullWidth label="Name" name={fields.NAME} required variant="outlined"/>
      </div>
      <div className="fieldContainer">
        <Field component={TextField} fullWidth label="Type" name={fields.TYPE} required select variant="outlined">
          <MenuItem value={""} />
          {Object.values(NodeType).map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Field>
      </div>
      <div className="fieldContainer">
        <Button type="submit" variant="contained" color="primary" style={{ width: "75%", borderRadius: "15px" }}>
          Create
        </Button>
      </div>
      <div className="fieldContainer">
        <Button onClick={() => removeNode(form.values[fields.NAME], form.values[fields.TYPE])} variant="contained" color="primary" style={{ width: "75%", borderRadius: "15px" }}>
          Delete
        </Button>
      </div>
    </div>
);

NodeForm.initialValues = initialValues;
export default NodeForm;