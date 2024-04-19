import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/quantityCounter/counterSlice';
import cartReducer from '../features/cart/cartSlice';
import updateAddressReducer from '../features/updateAddress/updateAddressSlicer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    updateAddress: updateAddressReducer,
  },
});
