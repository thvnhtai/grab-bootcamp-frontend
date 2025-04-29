import { Restaurant } from '../../types/restaurant';
import { createAppSlice } from '../createAppSlice.ts';
import { transformerObject } from '../transformer.ts';

interface RestaurantSliceState {
  loading: boolean;
  error: string | null;
  data: Restaurant[];
}

const initialState: RestaurantSliceState = {
  loading: false,
  error: null,
  data: []
};

export const restaurantSlice = createAppSlice({
  name: 'restaurant',
  initialState,
  reducers: (create) => ({
    analyzeImage: create.asyncThunk(
      async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiService.post(
          'image_search/search-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json'
            }
          }
        );

        console.log(transformerObject(response.results));

        return transformerObject(response.results);
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.data = action.payload;
        },
        rejected: (state) => {
          state.loading = false;
          state.error = 'Analysis failed';
        }
      }
    )
  }),
  selectors: {
    selectRestaurantData: (state) => state.data,
    selectRestaurantLoading: (state) => state.loading,
    selectRestaurantError: (state) => state.error
  }
});

export const { analyzeImage } = restaurantSlice.actions;
export const {
  selectRestaurantData,
  selectRestaurantLoading,
  selectRestaurantError
} = restaurantSlice.selectors;
