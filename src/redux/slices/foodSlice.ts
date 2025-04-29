import type { Food } from '../../types/food.d.ts';
import { createAppSlice } from '../createAppSlice';

interface FoodSliceState {
  loading: boolean;
  error: string | null;
  data: Food[];
}

const initialState: FoodSliceState = {
  loading: false,
  error: null,
  data: []
};

export const foodSlice = createAppSlice({
  name: 'food',
  initialState,
  reducers: (create) => ({
    analyzeImage: create.asyncThunk(
      async (base64Image: string) => {
        const response = await apiService.post('food/analyze', {
          image: base64Image
        });
        return response.data;
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
    ),
    searchFoods: create.asyncThunk(async (filters: { searchTerm: string }) => {
      const response = await apiService.get('food/search', {
        params: filters
      });
      return response.data;
    })
  }),
  selectors: {
    selectFoodData: (state) => state.data,
    selectFoodLoading: (state) => state.loading,
    selectFoodError: (state) => state.error
  }
});

export const { analyzeImage, searchFoods } = foodSlice.actions;
export const { selectFoodData, selectFoodLoading, selectFoodError } =
  foodSlice.selectors;
