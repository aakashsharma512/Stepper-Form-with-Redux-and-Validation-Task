import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { savePlanInfo, prevStep } from '../redux/formSlice';
import SuccessModal from './SuccessModal';

const plans = {
  monthly: {
    gold: 50,
    titanium: 100,
  },
  yearly: {
    gold: 500,
    titanium: 1000,
  },
};

const Step3 = () => {
  const dispatch = useDispatch();
  const planInfo = useSelector((state) => state.form.planInfo);

  // Initialize states based on Redux store
  const [selectedPlan, setSelectedPlan] = useState(planInfo.selectedPlan || '');
  const [planType, setPlanType] = useState('monthly');
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      startPlanDate: planInfo.startPlanDate || '',
    },
    validationSchema: Yup.object({
      startPlanDate: Yup.date().required('Required'),
    }),
    onSubmit: (values) => {
      const finalPlan = {
        ...values,
        selectedPlan,
      };
      dispatch(savePlanInfo(finalPlan));
      
      formik.resetForm();
      setSelectedPlan('');
      setShowModal(true);
    },
  });

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    return plans[planType][selectedPlan];
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Start Plan Date:
          <input
            type="date"
            name="startPlanDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startPlanDate}
          />
        </label>
        {formik.touched.startPlanDate && formik.errors.startPlanDate ? (
          <div className="error-message">{formik.errors.startPlanDate}</div>
        ) : null}

        <h3>Select a Plan</h3>
        <div>
          <label>
            <input
              type="radio"
              name="plan"
              value="gold"
              checked={selectedPlan === 'gold'}
              onChange={() => handlePlanChange('gold')}
            />
            Gold (${plans[planType].gold})
          </label>
          <label>
            <input
              type="radio"
              name="plan"
              value="titanium"
              checked={selectedPlan === 'titanium'}
              onChange={() => handlePlanChange('titanium')}
            />
            Titanium (${plans[planType].titanium})
          </label>
        </div>

        <h4>Total Price: ${calculatePrice()}</h4>

        <button type="button" onClick={() => {
          dispatch(savePlanInfo({ ...formik.values, selectedPlan })); // Save current values before going back
          dispatch(prevStep());
        }}>
          Previous
        </button>
        <button type="submit">Submit</button>
      </form>

      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Step3;
