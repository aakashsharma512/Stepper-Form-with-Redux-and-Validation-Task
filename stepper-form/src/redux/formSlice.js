import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    step: 1,
    personalInfo: {},
    companyInfo: {},
    planInfo: {},
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    savePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    saveCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    savePlanInfo: (state, action) => {
      state.planInfo = action.payload;
    },
  },
});

export const { nextStep, prevStep, savePersonalInfo, saveCompanyInfo, savePlanInfo } = formSlice.actions;
export default formSlice.reducer;
