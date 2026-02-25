import { useEffect, useState } from "react"
import "../../styles/searchbar-auto.css" 
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import fakeApi from "../../_api/fakeApi"

const SearchBarAuto = () => {

    const [ earchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    // keyboard navigation 
    const [selectedItem, setSelectedItem] = useState(-1)
    // const data = []  // books.json

    const handleChange = e => {
        setSearch(e.target.value)
    }
    const handleClear = () => {
        setSearch("")
        setSearchData([])
        setSelectedItem(-1)
    }
    const handleClose = () => { 
        setSearchData([])
        setSelectedItem(-1)
    }

    // # handle keyboar navigation by arrow keys
    const handleKeyDown = e => {
        // console.log(e.key)
        if (selectedItem < searchData.length) {
            if (e.key === "ArrowUp" && selectedItem > 0) {
                setSelectedItem(prev => prev - 1)
            }
            else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
                setSelectedItem(prev => prev + 1)
            } else if (e.key === "Enter" && selectedItem >= 0) {
                // window.open(searchData[selectedItem].show.url)
            }
        } else {
            setSelectedItem(-1)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('submit form..')
        if (search) {
            setSearchParams((prev) => ({ ...prev, q: search.trim() }))
            navigate(`/search?q=${search.trim()}`)
            // console.log(search) 
            // handleClose()
        }
    }

    useEffect(() => {
        if (search !== "" && search.length > 1) {
            /*
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
                .then((res) => res.json())
                // .then(data=> console.log(data))
                .then(data => setSearchData(data))
                // data = books.json
               const newFilterData =  data.filter(book=> {
                    return book.title.toLowerCase().includes(search.toLowerCase())
                })
                setSearchData(newFilterData)
                */
            fakeApi('/products', { keyword: search }).then(
                (res) => {
                    // console.log(res)  // {data: {…}}
                    // console.log(res.data)
                    setSearchData(res.data.products)
                }
            )
            // .then(data=> console.log(data))
            // .then(data => setSearchData(data))
            // console.log(res)  // Promise {<pending>}

        } else {
            setSearchData([])
        }
    }, [search]);

    return (
        <section className='search_section'>
            <form className='search_input_form' onSubmit={handleFormSubmit}>
                <input
                    type='text'
                    className='search_input'
                    placeholder='Search...'
                    autoComplete='off'
                    onChange={handleChange}
                    value={search}
                    onKeyDown={handleKeyDown}
                    onSubmit={handleFormSubmit}
                />
                <div className='search_icon'>
                    {search === '' ? <i className="fas fa-search" />
                        : <i className="fas fa-times" onClick={handleClear}></i>}
                </div>
            </form>
            <div className='search_result'>
                {searchData && <>
                    {
                        searchData.slice(0, 10).map((item, index) => {
                            return <Link
                                // href={item.show.url}
                                to={`/product/${item.asin}`}
                                onClick={()=>handleClose()}
                                key={index}
                                // target="_blank"  // open in new browser tab 
                                //  className="search_suggestion_line">
                                className={selectedItem === index
                                    ? "search_suggestion_line active"
                                    : "search_suggestion_line"}
                            >
                                {/* {item.show.name} */}
                                {item.productTitle.substring(0, 40)}
                            </Link>
                        })
                    }
                </>}

                {/* <a href='#' target='_blank' className='search_suggestion_line'>
                    This is suggestion line.
                </a> */}
            </div>
        </section>
    )
}

export default SearchBarAuto