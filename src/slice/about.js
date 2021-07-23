import {
  createSlice,
} from "@reduxjs/toolkit";
import { About } from "../utils/namespace";

const aboutSlice = createSlice({
  name: About,
  initialState: {
    aboutList: []
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        aboutList: action.payload
      };
    }
  }
});

export const { fetchData } = aboutSlice.actions;

export default aboutSlice;