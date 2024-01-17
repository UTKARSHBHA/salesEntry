// features/sales/DetailSection.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetail } from "../features/sales/salesSlice";

const DetailSection = () => {
  const dispatch = useDispatch();
  const vr_no = useSelector((state) => state.sales.headerData.vr_no);
  const detailData = useSelector((state) => state.sales.detailData);

  // Local state to manage detail table data
  const [localDetailData, setLocalDetailData] = useState(detailData);

  // State for tracking validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Function to add a new row to the detail table
  const addRow = () => {
    setLocalDetailData((prevData) => [
      ...prevData,
      {
        sr_no: prevData.length + 1,
        vr_no: vr_no,
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
      },
    ]);
  };

  // Function to remove a row from the detail table
  const removeRow = (index) => {
    setLocalDetailData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Function to handle changes in the input fields
  const handleDetailChange = (index, fieldName, value) => {
    // Validate numeric input for qty and rate
    if (fieldName === "qty" || fieldName === "rate") {
      const numericValue = ((value === "" ||isNaN(value)) ? "" : parseFloat(value));
      console.log(value , numericValue);
      setLocalDetailData((prevData) =>
        prevData.map((row, i) =>
          i === index ? { ...row, [fieldName]: numericValue } : row
        )
      );
    } else {
      setLocalDetailData((prevData) =>
        prevData.map((row, i) =>
          i === index ? { ...row, [fieldName]: value } : row
        )
      );
    }
  
    // Validate the input
    const errors = validateDetailField(index, fieldName, value);
    setValidationErrors({
      ...validationErrors,
      [`${index}_${fieldName}`]: errors,
    });
  };

  // Function to validate individual detail fields
  const validateDetailField = (index, fieldName, value) => {
    switch (fieldName) {
      case "item_code":
        return value === "" ? "Item Code is required" : null;
      case "item_name":
        return value === "" ? "Item Name is required" : null;
      case "description":
        return value === "" ? "Description is required" : null;
      case "qty":
        return isNaN(value) ? "Quantity must be a number" : null;
      case "rate":
        return isNaN(value) ? "Rate must be a number" : null;
      default:
        return null;
    }
  };

  // Function to check if all fields are filled in a row
  const allFieldsFilled = (row) => {
    return Object.values(row).every(
      (field) =>
        field !== undefined &&
        field !== null &&
        (typeof field !== "string" || field.trim() !== "")
    );
  };

  useEffect(() => {
    // Check if all rows have valid data
    const isValid = localDetailData.every(allFieldsFilled);

    // Dispatch the action to update the Redux store if all fields are filled
    if (isValid) {
      dispatch(updateDetail(localDetailData));
    }
  }, [dispatch, localDetailData]);

  return (
    <div>
      {/* Detail section UI */}
      {localDetailData.map((row, index) => (
        <div key={index}>
          <label>Item Code</label>
          <input
            type="text"
            value={row.item_code}
            onChange={(e) =>
              handleDetailChange(index, "item_code", e.target.value)
            }
          />
          {validationErrors[`${index}_item_code`] && (
            <div className="error">{validationErrors[`${index}_item_code`]}</div>
          )}

          <label>Item Name</label>
          <input
            type="text"
            value={row.item_name}
            onChange={(e) =>
              handleDetailChange(index, "item_name", e.target.value)
            }
          />
          {validationErrors[`${index}_item_name`] && (
            <div className="error">{validationErrors[`${index}_item_name`]}</div>
          )}

          <label>Description</label>
          <input
            type="text"
            value={row.description}
            onChange={(e) =>
              handleDetailChange(index, "description", e.target.value)
            }
          />
          {validationErrors[`${index}_description`] && (
            <div className="error">{validationErrors[`${index}_description`]}</div>
          )}

          <label>Quantity</label>
          <input
            type="text"
            value={row.qty}
            onChange={(e) => handleDetailChange(index, "qty", e.target.value)}
          />
          {validationErrors[`${index}_qty`] && (
            <div className="error">{validationErrors[`${index}_qty`]}</div>
          )}

          <label>Rate</label>
          <input
            type="text"
            value={row.rate}
            onChange={(e) => handleDetailChange(index, "rate", e.target.value)}
          />
          {validationErrors[`${index}_rate`] && (
            <div className="error">{validationErrors[`${index}_rate`]}</div>
          )}

          {/* Add a button to remove the row */}
          <button onClick={() => removeRow(index)}>Remove Row</button>
        </div>
      ))}

      {/* Add a button to add a new row */}
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default DetailSection;
