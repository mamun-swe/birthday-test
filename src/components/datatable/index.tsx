import React from 'react';
import ReactDataTable from 'react-data-table-component';
import { NoContent } from 'src/components/204';
import { generateArrayFromNumber } from 'src/utilities/helper';
import { IDataTable } from 'src/interfaces/datatable.interface';

export const DataTable: React.FC<IDataTable> = (
  props: IDataTable,
): JSX.Element => {
  const customStyles = {
    headCells: {
      style: {
        fontSize: '13px',
        fontWeight: '600',
      },
    },
    cells: {
      style: {
        paddingTop: '10px',
        paddingBottom: '10px',
      },
    },
  };

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  return (
    <ReactDataTable
      className="data-table-custom-class"
      columns={props.columns}
      data={props.data}
      progressPending={props.loading}
      progressComponent={<TableLoader />}
      customStyles={customStyles}
      noDataComponent={
        <NoContent message={props.noDataMessage || 'No data available yet.'} />
      }
      pagination={props.pagination}
      paginationServer={props.paginationServer}
      paginationTotalRows={props.totalRows}
      onChangeRowsPerPage={props.handlePerRowsChange}
      onChangePage={props.handlePageChange}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

/** Table data preloader */
const TableLoader: React.FC = (): JSX.Element => {
  return (
    <div className="p-4 lg:p-5 w-full mx-auto bg-white">
      <div className="animate-pulse">
        <div className="grid grid-cols-2 gap-4">
          {generateArrayFromNumber(10).map((i) => (
            <div key={i} className="h-2 bg-slate-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
