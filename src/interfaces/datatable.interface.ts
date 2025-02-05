export interface IDataTable {
  columns: any[];
  data: any[];
  loading: boolean;
  noDataMessage?: string;
  pagination: boolean;
  paginationServer: boolean;
  totalRows?: number;
  handlePerRowsChange?: (newPerPage: number, page: number) => Promise<void>;
  handlePageChange?: (data: any) => void;
}
