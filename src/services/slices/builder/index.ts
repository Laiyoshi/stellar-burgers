import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

type ConstructorStateProps = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: ConstructorStateProps = {
  bun: null,
  ingredients: []
};

const slice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: v4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload?.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      console.log(state.ingredients[0].id, action.payload);

      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) {
      const ingredient = state.ingredients[action.payload.index];

      if (action.payload.upwards) {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = ingredient;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = ingredient;
      }
    }
  }
});

export const { setBun, addIngredient, removeIngredient, moveIngredient } =
  slice.actions;

export default slice.reducer;
