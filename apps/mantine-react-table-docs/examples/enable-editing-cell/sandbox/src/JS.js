import React, { useMemo, useState } from 'react';
import MantineReactTable from 'mantine-react-table';
import { Typography } from '@mui/material';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      }, //end
    ],
    [],
  );

  const [tableData, setTableData] = useState(() => data);

  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    tableData[cell.row.index][cell.column.id] = value;
    //send/receive api updates here
    setTableData([...tableData]); //re-render with new data
  };

  return (
    <MantineReactTable
      columns={columns}
      data={tableData}
      editingMode="cell"
      enableEditing
      mantineEditTextInputProps={({ cell }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
      renderBottomToolbarCustomActions={() => (
        <Typography
          sx={{ fontStyle: 'italic', padding: '0 1rem' }}
          variant="body2"
        >
          Double-Click a Cell to Edit
        </Typography>
      )}
    />
  );
};

export default Example;
