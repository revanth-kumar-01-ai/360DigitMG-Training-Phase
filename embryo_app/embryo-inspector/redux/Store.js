// store 
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import userSignInReducer from './slice/userSingInSlice'
import uploadIMageReducer from './slice/uploadImgSlice'
import singlePatientReducer from './slice/singlePatientSlice'
import doctorDescriptionReducer from './slice/doctorDescriptionSlice'
import doctorPatientReducer from './slice/doctorPatientsSlice'

const reduxStore = configureStore({
    reducer: {
        userInfo: userReducer,
        userSignIn: userSignInReducer,
        userUploadUImage: uploadIMageReducer,
        single_patient: singlePatientReducer,
        doctorDescription: doctorDescriptionReducer,
        doctorPatientsData: doctorPatientReducer
    },
  });

export default reduxStore