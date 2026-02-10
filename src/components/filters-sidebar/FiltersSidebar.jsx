import   { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { general_filters,cellphone_filters, laptop_filters } from '../../constants/laptop_filters'
// import { filterChanged } from '../../store/filters/filtersSlice'
import FilterItem from './FilterItem'
import { 
	// setBrand, setCategory, 
	setFilter } from '../../store/filters/filtersSlice'

const FiltersSidebar = ({ category }) => {
	const dispatch = useDispatch()

	const [filters, setFilters] = useState([])

	useEffect(() => {
		// console.log(category)  // laptops, cellphones
		if (category === 'Laptops') {
			setFilters(laptop_filters)
		} else if (category === 'Cell-Phones') {
			setFilters(cellphone_filters)
		} else {
			setFilters(general_filters)
		}
	}, [category]) 

	const renderFilters = () => {
		console.log(filters)
		return filters.map((filter, index) => (
			<div key={index} className='mb-2 pb-3 border-bottom'>
				<h6 className='widget-title capitalize'>{filter.name}</h6>
				{filter.options.map(opt => (
					<FilterItem
						key={opt}
						name={opt}  // msi, apple, etc
						label={opt}
						onChange={(filterValue, changeType) =>{
							console.log('Filter changed:', filter.name, filterValue, changeType) 
							// dispatch(filterChanged(filterValue, changeType, filter.group))
							dispatch(setFilter({  filterName: filter.name, filterValue: filterValue.toLowerCase(), changeType }))
						}}
					/>
				))}
			</div>
		))
	}

	return (
		<aside className='filters-sidebar'>
			<div className='mb-3'>{renderFilters()}</div>
		</aside>
	)
}

export default FiltersSidebar
