import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
	name: 'settings',
	initialState: {
		currency: 'usd', // [usd , gbp, eur, iqd , tl]
		language: 'arb', // eng, arb
		showCartModal : false ,
		showAuthModal : false ,
	},
	reducers: {
		currencyChanged(state, action) {
			state.currency = action.payload
		},
		languageChanged(state, action) {
			state.language = action.payload
		},
		setShowCartModal(state, action) {
			state.showCartModal = action.payload
		},
		setShowAuthModal(state, action) {
			state.showAuthModal = action.payload
		},
	},
})

export const {
	currencyChanged,
	languageChanged,
	setShowCartModal,
	setShowAuthModal,
	// completedTodosCleared,
	// todoAdded,
	// todoColorSelected,
	// todoDeleted,
	// todoToggled,
} = settingsSlice.actions

export default settingsSlice.reducer
