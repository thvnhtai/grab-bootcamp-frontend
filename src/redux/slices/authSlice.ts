import { MESSAGE } from '../../constants/message.constant';
import { Message } from '../../enums/message.enum';
import { createAppSlice } from '../createAppSlice';
import { snakeObject } from '../../utils/common';

export type AuthSliceState = {
  loading: boolean;
  profileLoading: boolean;
  isAuthenticated: boolean;
  user?: User;
  message?: MessageType;
};

const initialState: AuthSliceState = {
  loading: false,
  profileLoading: true,
  isAuthenticated: false
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    login: create.asyncThunk(
      async (
        credentials: { email: string; password: string },
        { dispatch }
      ) => {
        const response = await apiService.post<{ access_token: string }>(
          'auth/login',
          credentials
        );
        localStorage.setItem('access_token', response.data.access_token);
        await dispatch(getUserProfile()).unwrap();
        return response;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.profileLoading = true;
          state.message = undefined;
        },
        fulfilled: (state) => {
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGIN_SUCCESS
          };
        },
        rejected: (state, action) => {
          state.loading = false;
          state.profileLoading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          localStorage.removeItem('access_token');
          state.message = {
            type: Message.ERROR,
            message: (action.error?.message as string) || MESSAGE.LOGIN_FAILED
          };
        }
      }
    ),
    signup: create.asyncThunk(
      async (
        credentials: {
          username: string;
          email: string;
          password: string;
          gender: 'MALE' | 'FEMALE';
          dateOfBirth: string;
        },
        { dispatch }
      ) => {
        const snakeCredentials = snakeObject(credentials);
        const response = await apiService.post<{ access_token: string }>(
          'auth/signup',
          snakeCredentials
        );
        localStorage.setItem('access_token', response.data.access_token);
        await dispatch(getUserProfile()).unwrap();
        return response;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.profileLoading = true;
          state.message = undefined;
        },
        fulfilled: (state) => {
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.SIGNUP_SUCCESS
          };
        },
        rejected: (state, action) => {
          state.loading = false;
          state.profileLoading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          localStorage.removeItem('access_token');
          state.message = {
            type: Message.ERROR,
            message: (action.error?.message as string) || MESSAGE.SIGNUP_FAILED
          };
        }
      }
    ),
    logout: create.asyncThunk(
      async () => {
        await apiService.post('auth/logout');
        localStorage.removeItem('access_token');
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          state.profileLoading = false;
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGOUT_SUCCESS
          };
        },
        rejected: (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          state.profileLoading = false;
          localStorage.removeItem('access_token');
          state.message = {
            type: Message.ERROR,
            message: MESSAGE.LOGOUT_FAILED
          };
        }
      }
    ),
    getUserProfile: create.asyncThunk(
      async () => {
        const response = await apiService.get<User>('auth/profile');
        return response;
      },
      {
        pending: (state) => {
          state.profileLoading = true;
          state.loading = true;
          state.message = undefined;
        },
        fulfilled: (state, action) => {
          state.profileLoading = false;
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data;
        },
        rejected: (state, action) => {
          state.profileLoading = false;
          state.loading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          localStorage.removeItem('access_token');
          state.message = {
            type: Message.ERROR,
            message:
              (action.error?.message as string) || 'Failed to fetch profile.'
          };
        }
      }
    )
  }),

  selectors: {
    watchUser: (auth) => auth.user,
    watchAuthState: (auth) => auth,
    watchAuthMessage: (auth) => auth.message,
    watchAuthLoading: (auth) => auth.loading || auth.profileLoading,
    watchProfileLoading: (auth) => auth.profileLoading,
    watchLoggedIn: (auth) => auth.isAuthenticated
  }
});

export const {
  watchUser,
  watchAuthState,
  watchAuthMessage,
  watchLoggedIn,
  watchAuthLoading,
  watchProfileLoading
} = authSlice.selectors;

export const { login, signup, logout, getUserProfile } = authSlice.actions;
