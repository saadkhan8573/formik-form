import React, { useEffect, useMemo, useState } from 'react';
import { COLUMNS } from './COLUMNS';
import { useTable } from 'react-table';
import { useGetAllUsersQuery } from '../redux/postData';




const Table = () => {

    const userData = useGetAllUsersQuery();
    console.log(userData.data,"::::::: data first")
    const [tableList, settableList] = useState([]);
    const [genderVal, setgenderVal] = useState("");


    useEffect(() => {
        settableList(userData.data?userData.data.results:null);
    }, [userData])



    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tableList, [userData])



    // useEffect(() => {
    //     const filteredData = tableList.filter(val => val.gender === genderVal);
    //     console.log("filteredData", filteredData);
    //     settableList(filteredData);
    // }, [])



    
    const tableInstance = useTable({
        columns,
        data
    })



    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (

        <>
            <form>
                <select onChange={(e) => setgenderVal(e.target.value)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </form>
            <table {...getTableProps()}>

                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(columns => (
                                        <th {...columns.getHeaderProps()}>{columns.render('Header')}</th>
                                    ))
                                }

                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            console.log("Cell",cell)
                                            return(
                                                <td  {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </>
    )
}

export default Table