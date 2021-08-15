import { useState } from "react";
import Select from 'react-select';
import "./Filter.scss"

function Filter({ callbackArrayFilters }) {

    const [optionsFilter] = useState([
        { value: 53, label: 'Thriller' },
        { value: 28, label: 'Action' },
        { value: 35, label: 'Comedy' },
        { value: 14, label: 'Fantasy' },
        { value: 10751, label: 'Family' },
        { value: 27, label: 'Horror' },
    ])

    function handleChangeFilter(e) {
        callbackArrayFilters(e)
    }

    return (
        <div className="search">

            <Select
                onChange={handleChangeFilter}
                placeholder={"Select genres..."}
                name="genre"
                isMulti
                options={optionsFilter}
            />
        </div>
    )
}

export default Filter;