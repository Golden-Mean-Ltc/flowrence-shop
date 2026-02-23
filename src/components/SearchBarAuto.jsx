import { useEffect, useState } from "react"
import "../styles/searchbar-auto.css"
import fakeApi from "../_api/fakeApi"

const SearchBarAuto = () => {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    // keyboard navigation 
    const [selectedItem, setSelectedItem] = useState(-1)
    const data = []  // books.json

    const handleChange = e => {
        setSearch(e.target.value)
    }
    const handleClose = () => {
        setSearch("")
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
                window.open(searchData[selectedItem].show.url)
            }
        } else {
            setSelectedItem(-1)
        }
    }

    useEffect(() => {
        if (search !== "" && search.length>1) {
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
                    console.log(res.data)
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
        <section className='search_section m-5'>
            <div className='search_input_div'>
                <input
                    type='text'
                    className='search_input'
                    placeholder='Search...'
                    autoComplete='off'
                    onChange={handleChange}
                    value={search}
                    onKeyDown={handleKeyDown}
                />
                <div className='search_icon'>
                    {search === '' ? <i className="fas fa-search" />
                        : <i className="fas fa-times" onClick={handleClose}></i>}
                </div>
            </div>
            <div className='search_result'>
                {searchData && <>
                    {
                        searchData.slice(0, 10).map((item, index) => {
                            return <a
                                // href={item.show.url}
                                key={index}
                                target="_blank"
                                //  className="search_suggestion_line">
                                className={selectedItem === index
                                    ? "search_suggestion_line active"
                                    : "search_suggestion_line"}
                            >
                                {/* {item.show.name} */}
                                {item.productTitle.substring(0, 40)}
                            </a>
                        })
                    }
                </>}

                <a href='#' target='_blank' className='search_suggestion_line'>
                    This is suggestion line.
                </a>
            </div>
        </section>
    )
}

export default SearchBarAuto