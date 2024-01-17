// features/sales/HeaderSection.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHeader } from "../features/sales/salesSlice";

const HeaderSection = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.sales.headerData);

  // Define required fields for validation
  const requiredFields = ["vr_no", "vr_date", "ac_name", "ac_amt", "status"];

  // Local state to manage input values
  const [localValues, setLocalValues] = useState({
    vr_no: headerData.vr_no || "",
    vr_date: headerData.vr_date || "",
    ac_name: headerData.ac_name || "",
    ac_amt: headerData.ac_amt || 0,
    status: headerData.status || "",
  });

  // State for tracking validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const handleHeaderChange = (fieldName, value) => {
    // Validate numeric input for ac_amt
    if (fieldName === "ac_amt") {
      // Check if the value is not numeric
      if (isNaN(value)) {
        // Handle non-numeric input, set an error and return
        setValidationErrors({
          ...validationErrors,
          [fieldName]: "Account Amount must be a number",
        });
        return;
      }
    }

    // Update the local state
    setLocalValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    // Validate the input
    const errors = validateHeaderField(fieldName, value);
    setValidationErrors({ ...validationErrors, [fieldName]: errors });

    // Check if all required fields are filled
    const allFieldsFilled = requiredFields.every((field) => {
      const fieldValue = localValues[field];
      return (
        fieldValue !== undefined &&
        fieldValue !== null &&
        (typeof fieldValue !== "string" || fieldValue.trim() !== "")
      );
    });

    // Dispatch the action to update the Redux store
    if (!errors && allFieldsFilled) {
      dispatch(updateHeader({ ...localValues }));
    }
  };

  // Function to validate individual header fields
  const validateHeaderField = (fieldName, value) => {
    switch (fieldName) {
      case "vr_no":
        return value === "" ? "Voucher Number is required" : null;
      case "vr_date":
        return value === "" ? "Voucher Date is required" : null;
      case "ac_name":
        return value === "" ? "Account Name is required" : null;
      case "ac_amt":
        return isNaN(value) ? "Account Amount must be a number" : null;
      case "status":
        return value === "" ? "Status is required" : null;
      default:
        return null;
    }
  };

  // Function to check if there are any validation errors
  const hasValidationErrors = () => {
    return Object.values(validationErrors).some((error) => error !== null);
  };

  return (
    <div>
      {/* Header section UI */}
      <label>Voucher Number</label>
      <input
        type="text"
        value={localValues.vr_no}
        onChange={(e) => handleHeaderChange("vr_no", e.target.value)}
      />
      {validationErrors.vr_no && (
        <div className="error">{validationErrors.vr_no}</div>
      )}

      <label>Voucher Date</label>
      <input
        type="date"
        value={localValues.vr_date}
        onChange={(e) => handleHeaderChange("vr_date", e.target.value)}
      />
      {validationErrors.vr_date && (
        <div className="error">{validationErrors.vr_date}</div>
      )}

      <label>Account Name</label>
      <input
        type="text"
        value={localValues.ac_name}
        onChange={(e) => handleHeaderChange("ac_name", e.target.value)}
      />
      {validationErrors.ac_name && (
        <div className="error">{validationErrors.ac_name}</div>
      )}

      <label>Account Amount</label>
      <input
        type="text"
        value={localValues.ac_amt}
        onChange={(e) => handleHeaderChange("ac_amt", e.target.value)}
      />
      {validationErrors.ac_amt && (
        <div className="error">{validationErrors.ac_amt}</div>
      )}

      <label>Status</label>
      <select
        value={localValues.status}
        onChange={(e) => handleHeaderChange("status", e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="A">Active</option>
        <option value="I">Inactive</option>
      </select>
      {validationErrors.status && (
        <div className="error">{validationErrors.status}</div>
      )}

      {/* Add a general validation error message */}
      {hasValidationErrors() && (
        <div className="error">Please fix the errors before submitting.</div>
      )}
    </div>
  );
};

export default HeaderSection;
