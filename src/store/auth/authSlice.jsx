import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
	user: user ? user : null,
	isAuthenticated: user ? true : false ,
	isError: false,
	succeeded: false,
	loading: false, // when register action is pending
	message: '',
	likedProducts: [],
	orders : []
}

// Register new user
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {

	try {
		const x = await authService.login(user)
		// console.log(x)  // {...user}
		// return x
		return { ...x, token: x._id }
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.loading = false
			state.error = false
			state.succeeded = false
			state.message = ''
			state.likedProducts = []
		},
		// Action to add a new product to liked products
		addProductToLiked: (state, action) => {
			console.log(action.payload) // { _id: '123', name: 'Product 1', liked: true }
			// Use Immer internally, so we can "mutate" the state
			state.likedProducts.push(action.payload);
		},
		// Action to delete a product from liked products by ID
		deleteProductFromLiked: (state, action) => {
			state.likedProducts = state.likedProducts.filter((product) => product._id !== action.payload);
		},
		// Action to toggle a product's liked status (example for a todo app)
		// toggleProductLiked: (state, action) => {
		// 	const product = state.likedProducts.find(product => product._id === action.payload);
		// 	if (product) {
		// 		product.liked = !product.liked;
		// 	}
		// },
		addOrder: (state, action) => {
			state.orders.push(action.payload)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.loading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false
				state.succeeded = true
				state.user = action.payload
				state.isAuthenticated = true
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.error = true
				state.message = action.payload
				state.user = null
				state.isAuthenticated = false
			})
			.addCase(login.pending, state => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.succeeded = true
				state.user = action.payload
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = true
				state.message = action.payload
				state.user = null
				state.isAuthenticated = false
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
				state.likedProducts = []
				state.isAuthenticated = false
			})

	},
})

export const { reset, addProductToLiked, deleteProductFromLiked , addOrder} = authSlice.actions
export default authSlice.reducer
