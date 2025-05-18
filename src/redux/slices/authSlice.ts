import { snakeObject } from '../../utils/common';
import { Message } from '../../enums/message.enum';
import { createAppSlice } from '../createAppSlice';
import { transformerObject } from '../transformer';
import { MESSAGE } from '../../constants/message.constant';
import {
  ErrorPayload,
  LoginCredentials,
  MessageType,
  SignupCredentials,
  User
} from '../../types';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: User;
  message?: MessageType;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: undefined,
  message: undefined
};

const clearAuthState = (state: AuthState) => {
  state.isLoading = false;
  state.isAuthenticated = false;
  state.user = undefined;
  localStorage.removeItem('access_token');
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    login: create.asyncThunk(
      async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
        try {
          const response = await apiService.post('auth/login', credentials);
          localStorage.setItem('access_token', response.data.access_token);
          await dispatch(getUserProfile()).unwrap();
          return response.data;
        } catch (error) {
          return rejectWithValue((error as { data: ErrorPayload }).data);
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
          state.message = undefined;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGIN_SUCCESS,
            description: action.payload.message
          };
        }
      }
    ),

    signup: create.asyncThunk(
      async (credentials: SignupCredentials, { dispatch, rejectWithValue }) => {
        try {
          const snakeCredentials = snakeObject(credentials);
          const response = await apiService.post(
            'auth/signup',
            snakeCredentials
          );
          localStorage.setItem('access_token', response.data.access_token);
          await dispatch(getUserProfile()).unwrap();
          return response.data;
        } catch (error) {
          return rejectWithValue((error as { data: ErrorPayload }).data);
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
          state.message = undefined;
        },
        fulfilled: (state) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.SIGNUP_SUCCESS
          };
        }
      }
    ),

    logout: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          await apiService.post('auth/logout');
          localStorage.removeItem('access_token');
          return null;
        } catch (error) {
          return rejectWithValue((error as { data: ErrorPayload }).data);
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
          state.message = undefined;
        },
        fulfilled: (state) => {
          clearAuthState(state);
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGOUT_SUCCESS
          };
        }
      }
    ),

    getUserProfile: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await apiService.get<User>('me');
          return response.data;
        } catch (error) {
          return rejectWithValue((error as { data: ErrorPayload }).data);
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
          state.message = undefined;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = transformerObject(action.payload);
        }
      }
    )
  }),

  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, action) => {
        clearAuthState(state);
        state.message = {
          type: Message.ERROR,
          message: MESSAGE.LOGIN_FAILED,
          description:
            (action.payload as ErrorPayload)?.message || MESSAGE.LOGIN_INVALID
        };
      })
      .addCase(signup.rejected, (state, action) => {
        clearAuthState(state);
        state.message = {
          type: Message.ERROR,
          message: MESSAGE.SIGNUP_FAILED,
          description:
            (action.payload as ErrorPayload)?.message || MESSAGE.SIGNUP_FAILED
        };
      })
      .addCase(logout.rejected, (state, action) => {
        clearAuthState(state);
        state.message = {
          type: Message.ERROR,
          message: MESSAGE.LOGOUT_FAILED,
          description:
            (action.payload as ErrorPayload)?.message || MESSAGE.LOGOUT_FAILED
        };
      })
      .addCase(getUserProfile.rejected, (state) => {
        clearAuthState(state);
        // Optionally add error message if needed
        // state.message = {
        //   type: Message.ERROR,
        //   message: MESSAGE.PROFILE_FAILED,
        //   description: 'Failed to fetch user profile',
        // };
      });
  },

  selectors: {
    selectUser: (state: AuthState) => state.user,
    selectAuthState: (state: AuthState) => state,
    selectAuthMessage: (state: AuthState) => state.message,
    selectAuthLoading: (state: AuthState) => state.isLoading,
    selectIsAuthenticated: (state: AuthState) => state.isAuthenticated
  }
});

export const {
  selectUser,
  selectAuthState,
  selectAuthMessage,
  selectAuthLoading,
  selectIsAuthenticated
} = authSlice.selectors;

export const { login, signup, logout, getUserProfile } = authSlice.actions;
