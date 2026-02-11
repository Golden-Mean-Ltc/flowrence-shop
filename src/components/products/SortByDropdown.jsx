
import { useDispatch } from 'react-redux'

const SortByDropdown = () => {
	const dispatch = useDispatch()

	// * Select options
	const options = [
		{
			value: 'featured_asc',
			text: 'Featured',
			key: 'featured'
		},
		{
			value: 'price_asc',
			order: 'asc',
			text: 'Price: Low to high',
			key: 'price',
		},
		{
			value: 'price_desc',
			order: 'desc',
			text: 'Price: High to low',
			key: 'price',
		},
		{
			value: 'newest_desc',
			order: 'desc',
			text: 'Newest Arrival',
			key: 'newest',
		},
		{
			value: 'newest_asc',
			order: 'asc',
			text: 'Oldest Arrival',
			key: 'newest',
		},
	]

	const handleChange = e => {
		// console.log(e.target) // <select />
		// console.log(e.target.value) // price_asc, price_desc, newest_asc, newest_desc
		console.log('Selected sort option:', e.target.value)

		const sortByArr = e.target.value.split('_')
		const key = sortByArr[0]
		const order = sortByArr[1]
		dispatch({ type: 'PRODUCT_LIST_SORT_BY', payload: { key, order } })
	}

	return (
		<div className='d-flex align-items-center flex-nowrap me-3 me-sm-4 pb-3'>
			<label
				className='text-nowrap fs-sm me-2 d-none d-sm-block mr-3'
				htmlFor='sorting-products'>
				Sort by
			</label>
			<select
				className='form-control btn-toolbar'
				id='sorting-products'
				onChange={handleChange}>
				{options.map((item, i) => (
					<option key={i} value={item.value}>
						{item.text}
					</option>
				))}
			</select>
		</div>
	)
}

export default SortByDropdown
