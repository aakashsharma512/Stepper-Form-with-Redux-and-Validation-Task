import React from 'react';
import { useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const StepperForm = () => {
  const step = useSelector((state) => state.form.step);

  return (
    <div className="stepper-form">
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
};

export default StepperForm;
