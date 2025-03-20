import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [], // Default to an empty array
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.bookId === action.payload.bookId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            const { bookId, change } = action.payload;
            const item = state.find(item => item.bookId === bookId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    return state.filter(item => item.bookId !== bookId);
                }
            }
            return state;
        },
        clearCart: () => {
            return [];
        }
    }
});

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;