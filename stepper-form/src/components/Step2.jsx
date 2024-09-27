import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveCompanyInfo, nextStep, prevStep } from '../redux/formSlice';

const Step2 = () => {
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.form.companyInfo);

  const formik = useFormik({
    initialValues: {
      fields: companyInfo.fields || [],
      employeeCount: companyInfo.employeeCount || '',
      wfhPolicy: companyInfo.wfhPolicy || '',
    },
    validationSchema: Yup.object({
      fields: Yup.array().min(1, 'Select at least one field'),
      employeeCount: Yup.string().required('Required'),
      wfhPolicy: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(saveCompanyInfo(values));
      dispatch(nextStep());
    },
  });

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const currentIndex = formik.values.fields.indexOf(value);
    const newFields = [...formik.values.fields];

    if (currentIndex === -1) {
      newFields.push(value);
    } else {
      newFields.splice(currentIndex, 1);
    }

    formik.setFieldValue('fields', newFields);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h3>Your company is working on which field?</h3>
        <label>
          <input
            type="checkbox"
            value="Tech"
            checked={formik.values.fields.includes("Tech")}
            onChange={handleCheckboxChange}
          />
          Tech
        </label>
        <label>
          <input
            type="checkbox"
            value="Finance"
            checked={formik.values.fields.includes("Finance")}
            onChange={handleCheckboxChange}
          />
          Finance
        </label>
        <label>
          <input
            type="checkbox"
            value="Health"
            checked={formik.values.fields.includes("Health")}
            onChange={handleCheckboxChange}
          />
          Health
        </label>
        <label>
          <input
            type="checkbox"
            value="Education"
            checked={formik.values.fields.includes("Education")}
            onChange={handleCheckboxChange}
          />
          Education
        </label>
      </div>
      <select
        name="employeeCount"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.employeeCount}
      >
        <option value="" label="Select Employee Count" />
        <option value="1-10" label="1-10" />
        <option value="10-20" label="10-20" />
        <option value="20-30" label="20-30" />
        <option value="40+" label="40+" />
      </select>

      <div>
        <h3>Does your company have a WFH policy?</h3>
        <label>
          <input
            type="radio"
            name="wfhPolicy"
            value="Yes"
            checked={formik.values.wfhPolicy === "Yes"}
            onChange={formik.handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="wfhPolicy"
            value="No"
            checked={formik.values.wfhPolicy === "No"}
            onChange={formik.handleChange}
          />
          No
        </label>
      </div>

      <button type="button" onClick={() => {
        dispatch(prevStep());
        dispatch(saveCompanyInfo(formik.values));
      }}>
        Previous
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2;
