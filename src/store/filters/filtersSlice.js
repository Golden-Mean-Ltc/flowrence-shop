import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
	All: 'all',
	Active: 'active',
	Completed: 'completed',
}

// const laptopFilters = {
// 	Brand: '',
// 	OS: '',
// 	Processor: '',
// }

const initialState = {
	status: StatusFilters.All,
	searchTerm: '',
	// category: 'all', 
	category: [], 
	brands: [], // apple, samsung, beats, sony
	opSystems: [], // operating systems (windows, mac os, chrome os)
	processors: [],
	screens: [], // 14, 15~15.9  , 16+
	colors: [],
	prices: [],
	// ...laptopFilters,
}

// const filtersSlice = createSlice({
// 	name: 'filters',
// 	initialState,
// 	reducers: {
// 		statusFilterChanged(state, action) {
// 			state.status = action.payload
// 		},
// 		brandFilterChanged: {
// 			reducer(state, action) {
// 				let { brand, changeType } = action.payload

// 				switch (changeType) {
// 					case 'added': {
// 						if (!state.brands.includes(brand)) {
// 							state.brands.push(brand)
// 						}
// 						break
// 					}
// 					case 'removed': {
// 						state.brands = state.brands.filter(
// 							existingColor => existingColor !== brand
// 						)
// 						break
// 					}
// 					default:
// 						return
// 				}
// 			},
// 			prepare(brand, changeType) {
// 				return {
// 					payload: { brand, changeType },
// 				}
// 			},
// 		},
// 		filterChanged: {
// 			reducer(state, action) {
// 				let { newFilter, changeType, group } = action.payload

// 				switch (changeType) {
// 					case 'added': {
// 						if (state[group] && !state[group].includes(newFilter)) {
// 							state[group].push(newFilter)
// 						} else {
// 							return
// 						}
// 						break
// 					}
// 					case 'removed': {
// 						if (state[group]) {
// 							state[group] = state[group].filter(
// 								existingFilter => existingFilter !== newFilter
// 							)
// 						}
// 						break
// 					}
// 					default:
// 						return
// 				}
// 			},
// 			prepare(newFilter, changeType, group) {
// 				return {
// 					payload: { newFilter, changeType, group },
// 				}
// 			},
// 		},
// 	},
// })

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Immer allows direct mutation
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
	setFilter: (state, action) => {
		console.log(  action.payload)
		const { filterName, filterValue, changeType } = action.payload;
		switch (changeType) {
			case 'added': {
				if (!state[filterName].includes(filterValue)) {
					state[filterName].push(filterValue);
				}
				break;
			}
			case 'removed': {
				state[filterName] = state[filterName].filter(
					existingFilter => existingFilter !== filterValue
				)
				break;
			}
			default:
				return
		}
	}
  },
});

export const { setSearchTerm, setCategory, setBrand, setFilter } = filtersSlice.actions;
// export const { brandFilterChanged, filterChanged } = filtersSlice.actions

export default filtersSlice.reducer
