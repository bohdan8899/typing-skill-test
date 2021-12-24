import { createSlice } from '@reduxjs/toolkit'
import {DURATION_OPTIONS, TYPING_TEXT_OPTIONS} from '../../constants';

const initialState = {
  duration: DURATION_OPTIONS[0].value,
  text: TYPING_TEXT_OPTIONS[0].value,
  started: false,
  accuracy: 100,
  speed: 0,
  completed: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    start: (state, action) => {
      state.started = true;
      state.duration = action.payload.duration;
      state.text = action.payload.text;
    },
    complete: (state, action) => {
      state.completed = true;
      state.speed = (action.payload.typedCount/action.payload.seconds);
      state.accuracy = (1 - (action.payload.wrongCount/action.payload.typedCount)) * 100;
    },
    reset: (state) => {
      state = initialState;
    },
    restart: (state) => {
      state.completed = false;
      state.accuracy = 100;
      state.speed = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { start, reset, complete, restart } = mainSlice.actions

export default mainSlice.reducer
