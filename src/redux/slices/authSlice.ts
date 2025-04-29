import { MESSAGE } from '../../constants/message.constant';
import { Message } from '../../enums/message.enum';
import { createAppSlice } from '../createAppSlice';

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
      async (credentials: {
        displayName: string;
        userPrincipalName: string;
      }) => {
        const response = await apiService.post('auth/login', credentials);
        localStorage.setItem('access_token', response.data.access_token);

        return response.data;
      },
      {
        pending: (state) => {
          state.loading = true;
          state.message = undefined;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGIN_SUCCESS
          };
        },
        rejected: (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = undefined;
          state.message = {
            type: Message.ERROR,
            message: MESSAGE.LOGIN_FAILED
          };
        }
      }
    ),
    logout: create.asyncThunk(
      async () => {
        await apiService.get('auth/logout');
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
          state.message = {
            type: Message.SUCCESS,
            message: MESSAGE.LOGOUT_SUCCESS
          };
        },
        rejected: (state) => {
          state.loading = false;
          state.message = {
            type: Message.ERROR,
            message: MESSAGE.LOGOUT_FAILED
          };
        }
      }
    ),
    getUserProfile: create.asyncThunk(
      async () => {
        const response = await apiService.get('user');
        return response.data;
      },
      {
        pending: (state) => {
          state.profileLoading = true;
          state.message = undefined;
        },
        fulfilled: (state, action) => {
          state.profileLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        },
        rejected: (state) => {
          state.profileLoading = false;
          state.isAuthenticated = false;
          state.user = undefined;
        }
      }
    )
  }),

  selectors: {
    watchUser: (auth) => auth.user,
    watchAuthState: (auth) => auth,
    watchAuthMessage: (auth) => auth.message,
    watchAuthLoading: (auth) => auth.loading,
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

export const { login, logout, getUserProfile } = authSlice.actions;
