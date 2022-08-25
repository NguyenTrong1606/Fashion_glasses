import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toastError, toastSuccess } from "../../Toast/Toast";
export const loadAccountOrders = createAsyncThunk(
  "account/orders/fetch",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/orders/my-order`
      );
      if (response.status === 200) {
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const loadOrdersHandle = createAsyncThunk(
  "orders/handle/fetch",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/orders/all`
      );
      if (response.status === 200) {
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const loadOrdersComplete = createAsyncThunk(
  "orders/complete/fetch",
  async ({ year, month }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/orders/year/${year}/month/${month}`
      );
      if (response.status === 200) {
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id_order) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/orders/${id_order}`
      );
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_order: id_order,
        };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const customerUpdateOrder = createAsyncThunk(
  "order/update/customer",
  async (id_order) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/orders/customer/${id_order}/update`
      );
      if (response.status === 200) {
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/add",
  async ({ id_voucher, address, history }) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/orders`, {
        id_voucher,
        address,
      });
      if (response.status === 200) {
        history.push("/account/my-order");
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/update",
  async ({ id_order, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/orders/${id_order}/${status}`
      );
      if (response.status === 200) {
        return await { ...response.data, status: response.status };
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { message: error.message };
    }
  }
);

const Orders = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    myorders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountOrders.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.myorders = action.payload.data;
        } else {
          toastError(action.payload.message);
        }
      })
      .addCase(loadOrdersHandle.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.orders = action.payload.data;
        } else {
          toastError(action.payload.message);
        }
      })

      .addCase(loadOrdersComplete.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.orders = action.payload.data;
        } else {
          toastError(action.payload.message);
        }
      })

      .addCase(customerUpdateOrder.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          console.log(action.payload.data.id_order);
          state.myorders = state.myorders.map((order) => {
            if (order.id_order === action.payload.data.id_order) {
              return action.payload.data;
            } else {
              return order;
            }
          });
          toastSuccess(action.payload.message);
        } else {
          toastError(action.payload.message);
        }
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          if (action.payload.data.status === 4) {
            state.orders = state.orders.filter(
              (order) => order.id_order !== action.payload.data.id_order
            );
          } else {
            state.orders = state.orders.map((order) => {
              if (order.id_order === action.payload.data.id_order) {
                return action.payload.data;
              } else {
                return order;
              }
            });
          }
        } else {
          toastError(action.payload.message);
        }
      })

      .addCase(addOrder.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          toastSuccess(action.payload.message);
        } else {
          toastError(action.payload.message);
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.myorders = state.myorders.filter(
            (order) => order.id_order !== action.payload.id_order
          );

          toastSuccess(action.payload.message);
        } else {
          toastError(action.payload.message);
        }
      });
  },
});

const ordersReducer = Orders.reducer;
export const myOrdersSelector = (state) => state.ordersReducer.myorders;
export const ordersSelector = (state) => state.ordersReducer.orders;

export default ordersReducer;
