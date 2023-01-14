import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import MUIDataTable, {
  debounceSearchRender,
  MUIDataTableColumn,
  MUIDataTableColumnOptions,
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
  MUIDataTableToolbar,
  Responsive,
  SelectableRows,
  TableFilterList,
  TableToolbar,
} from "mui-datatables";
import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  TableHead,
} from "@mui/material";
import debounce from "lodash/debounce";
interface TableProps
  extends MUIDataTableProps,
    React.HtmlHTMLAttributes<HTMLDivElement> {
  data: any[];
  columns: TableColumn[];
  title: string;
  options?: MUIDataTableOptions;
  total?: number;
  rowsPerPage?: number;
  sortOrder?: any;
  onHeightChange?: (filterHeight: number, headerHeight: number) => void;
  search?: (
    searchText: string,
    perPage: number,
    page: number,
    filters: any,
    sort: any
  ) => void;
}
export interface TableColumn extends MUIDataTableColumn {
  idx?: number;
  options?: TableColumnOptions;
}
interface TableColumnOptions extends MUIDataTableColumnOptions {
  inExpand?: boolean;
}
const tableOptions = {
  responsive: "standard" as Responsive,
  selectableRows: "none" as SelectableRows,
  serverSide: true,
  search: true,
  enableNestedDataAccess: ".",
  elevation: 0,
  customSearchRender: debounceSearchRender(500),
  setFilterChipProps: () => ({
    color: "primary",
    variant: "outlined",
    style: { overflow: "hidden" },
  }),
} as MUIDataTableOptions;
const filterRef = React.createRef<HTMLDivElement>();
const toolbarRef = React.createRef<HTMLDivElement>();

const CustomFilterList = (props: any) => (
  <div ref={filterRef}>
    <TableFilterList {...props} />
  </div>
);
const CustomTableToolbar = (props: any) => (
  <div ref={toolbarRef}>
    <TableToolbar {...props} />
  </div>
);
const GPSTable = ({
  data,
  columns,
  title,
  options,
  total,
  rowsPerPage,
  sortOrder,
  search,
  onHeightChange,
  ...props
}: TableProps) => {
  const [cols, setColumns] = useState<TableColumn[]>(columns);
  const [exColumns, setExColumns] = useState<TableColumn[]>([]);
  const [opts, setOptions] = useState<MUIDataTableOptions>({
    ...tableOptions,
    ...options,
  });

  const buildColumns = () => {
    const newExColumns = [];
    const newColumns = [];
    cols.forEach((c: TableColumn, idx: number) => {
      if (c.options && c.options.inExpand) {
        c.options["display"] = "excluded";
        newExColumns.push({ ...c, idx: idx });
      }
      newColumns.push({ ...c, idx: idx });
    });
    setColumns(newColumns);
    setExColumns(newExColumns);
  };

  const addExpandableRowRenderer = () => {
    if (!exColumns.length) return;
    const myExpandableRowOptions = {};
    myExpandableRowOptions["expandableRows"] = true;
    myExpandableRowOptions["renderExpandableRow"] = (rowData: string[]) => {
      return (
        <tr>
          <td colSpan={1}></td>
          <td colSpan={Math.abs(columns.length - exColumns.length)}>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="simple table" style={{ minWidth: "650" }}>
                <TableHead>
                  <TableRow>
                    {exColumns.map((c: TableColumn) => (
                      <TableCell key={c.name}>{c.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {exColumns.map((c: TableColumn) => (
                      <TableCell key={c.name}>{rowData[c.idx]}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </td>
        </tr>
      );
    };
    setOptions({ ...opts, ...myExpandableRowOptions });
  };

  const onTableChange = (action: string, tableState: MUIDataTableState) => {
    const actionsWeCareAbout = [
      "search",
      "filterChange",
      "changeRowsPerPage",
      "changePage",
      "resetFilters",
      "sort",
    ];
    if (actionsWeCareAbout.includes(action) && search) {
      const filters = tableState.filterList.reduce((acc, f, idx) => {
        if (f && f.length) {
          acc[cols[idx].name] = f;
        }
        return acc;
      }, {});
      if (action === "filterChange" || action === "resetFilters") {
        handleHeightChange();
      }
      search(
        tableState.searchText ? tableState.searchText : "",
        tableState.rowsPerPage,
        tableState.page,
        filters,
        tableState.sortOrder
      );
    }
  };

  const handleHeightChange = () => {
    if (onHeightChange && filterRef.current && toolbarRef.current) {
      onHeightChange(
        filterRef.current.clientHeight,
        toolbarRef.current.clientHeight
      );
    }
  };

  useEffect(addExpandableRowRenderer, [exColumns]);
  useEffect(buildColumns, []);
  useEffect(() => {
    handleHeightChange();
    window.addEventListener("resize", debounce(handleHeightChange, 300));
    return () => window.removeEventListener("resize", handleHeightChange);
  }, [toolbarRef, filterRef]);

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={{ ...opts, count: total, rowsPerPage, sortOrder, onTableChange }}
      components={{
        TableFilterList: CustomFilterList,
        TableToolbar: CustomTableToolbar,
      }}
      {...props}
    />
  );
};
export default GPSTable;
