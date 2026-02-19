
// import { useDispatch } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters } from '../store/filters/filtersSlice'
import SortByDropdown from './products/SortByDropdown'

const Toolbar = ({ setViewMode }) => {
	const dispatch = useDispatch()

	const filterStatus = useSelector(state=>state.filters.status)

	return (
		<div className='d-flex justify-content-center justify-content-sm-between align-items-center pt-2 mb-3 border-bottom'>
			<div className='d-flex flex-wrap'>
				<SortByDropdown />
			</div>
		{filterStatus !== "cleared" && 	<div className="align-items-center pb-2 text-center">
				<span onClick={() => dispatch(clearFilters())} className="clickable text-decoration-underline">Clear filters</span>
			</div>}

			<div className='btn-group mr-2'>
				<button
					className='btn btn-sm btn-outline-secondary'
					onClick={() => setViewMode('grid')}>
					{' '}
					<i className='fas fa-th' />
				</button>
				<button
					className='btn btn-sm btn-outline-secondary'
					onClick={() => setViewMode('list')}>
					<i className='fas fa-list' />
				</button>
			</div>
		</div>
	)
}

export default Toolbar
