import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type NotificationMessage = {
  type: NotificationType;
  message: string;
  description?: string;
};
export interface AppSliceState {
  status: string;
  messages: NotificationMessage[];
}

const initialState: AppSliceState = {
  status: 'idle',
  messages: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    setStatus: create.reducer((state, action: PayloadAction<string>) => {
      state.status = action.payload;
    }),
    setMessages: create.reducer(
      (state, action: PayloadAction<NotificationMessage[]>) => {
        state.messages = action.payload;
      }
    )
  }),
  selectors: {
    watchStatus: (app) => app.status,
    watchMessages: (app) => app.messages
  }
});

export const { setStatus, setMessages } = appSlice.actions;

export const { watchStatus, watchMessages } = appSlice.selectors;
