import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { savePersonalInfo, nextStep } from '../redux/formSlice';

const Step1 = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.form.personalInfo);

  const formik = useFormik({
    initialValues: {
      firstName: personalInfo.firstName || '',
      lastName: personalInfo.lastName || '',
      email: personalInfo.email || '',
      companyName: personalInfo.companyName || '',
      companyWebsite: personalInfo.companyWebsite || '',
      state: personalInfo.state || '',
      zipCode: personalInfo.zipCode || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      companyName: Yup.string().required('Required'),
      companyWebsite: Yup.string().url('Invalid URL').required('Required'),
      state: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required').length(5, 'Must be 5 digits'),
    }),
    onSubmit: (values) => {
      dispatch(savePersonalInfo(values));
      dispatch(nextStep());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="error-message">{formik.errors.firstName}</div>
      ) : null}

      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="error-message">{formik.errors.lastName}</div>
      ) : null}

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error-message">{formik.errors.email}</div>
      ) : null}

      <input
        name="companyName"
        type="text"
        placeholder="Company Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.companyName}
      />
      {formik.touched.companyName && formik.errors.companyName ? (
        <div className="error-message">{formik.errors.companyName}</div>
      ) : null}

      <input
        name="companyWebsite"
        type="text"
        placeholder="Company Website"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.companyWebsite}
      />
      {formik.touched.companyWebsite && formik.errors.companyWebsite ? (
        <div className="error-message">{formik.errors.companyWebsite}</div>
      ) : null}

      <select
        name="state"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.state}
      >
        <option value="" label="Select State" />
        <option value="NY" label="New York" />
        <option value="CA" label="California" />
        <option value="TX" label="Texas" />
      
      </select>
      {formik.touched.state && formik.errors.state ? (
        <div className="error-message">{formik.errors.state}</div>
      ) : null}

      <input
        name="zipCode"
        type="text"
        placeholder="Zip Code"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.zipCode}
      />
      {formik.touched.zipCode && formik.errors.zipCode ? (
        <div className="error-message">{formik.errors.zipCode}</div>
      ) : null}

   
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;
