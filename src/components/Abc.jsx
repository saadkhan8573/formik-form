import React, { useMemo } from 'react'
import { useTable } from 'react-table';
import { COLUMNS } from './reactTable/COLUMNS';
import { useGetAllUsersQuery } from './services/usersdata';

const Abc = () => {
    const userData = useGetAllUsersQuery();
    console.log("dataaaaaa", userData);

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => userData.results, [])
    
    const tableInstance = useTable({
        columns,
        data
    })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <>
            {/* <form>
                <select>
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
                                        row.cells.map(cell => (
                                            <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table> */}
        </>
    )
}

export default Abc