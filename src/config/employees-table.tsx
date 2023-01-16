import startCase from "lodash/startCase";
import { Typography } from "@mui/material";
const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const columns = [
  {
    label: "id",
    name: "id",
    options: {
      display: false,
      searchable: false,
      filter: false,
      download: false,
      print: false,
      viewColumns: false,
      customBodyRender: (v: any) => {
        const value = v ? v : "";
        return (
          <Typography component={"span"} variant="inherit">
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "170px", maxWidth: "170px" } }),
    },
  },
  {
    label: "Employee Name",
    name: "empName",
    searchable: true,
    filter: true,
    options: {
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toUpperCase()) : "";
        return (
          <Typography component={"span"} variant="inherit">
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "170px", maxWidth: "170px" } }),
    },
  },
  {
    label: "Employee Id",
    name: "employeeId",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Nationality",
    name: "nationality",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Citizenship",
    name: "citizenship",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Week Day Off",
    name: "weekDayOff",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? daysInWeek[v] : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Gender",
    name: "gender",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Date of birth",
    name: "dob",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Employee Type",
    name: "empType",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "CPF Contribution",
    name: "cpfContribution",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Work Shift",
    name: "workshift",
    options: {
      searchable: true,
      filter: true,
      customBodyRender: (v: any) => {
        const value = v ? startCase(v.toLowerCase()) : "";
        return (
          <Typography
            component={"span"}
            variant="inherit"
            className={`${value.toLowerCase()} status`}
          >
            {value}
          </Typography>
        );
      },
      setCellProps: () => ({ style: { width: "110px", maxWidth: "110px" } }),
    },
  },
  {
    label: "Error",
    name: "error",
    options: {
      display: false,
      searchable: false,
      filter: false,
      download: false,
      print: false,
      viewColumns: false,
      customBodyRender: (v: any) => {
        const value = v ? v : "- -";
        return (
          <Typography component={"span"} variant="inherit">
            {value}
          </Typography>
        );
      },
    },
  },
];

export const options = {
  print: true,
  download: true,
  filter: true,
  search: true,
  viewColumns: true,
  tableBodyMaxHeight: "100%",
};

export const theme = {
  overrides: {
    MUIDataTable: {
      paper: {
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 0,
      },
      tableRoot: {
        "& .status": {
          fontWeight: "bold",
        },
        "& .success": {
          color: "#ACACAC",
        },
        "& .failure": {
          color: "red",
        },
      },
    },
    MuiTableCell: {
      head: {
        backgroundColor: "#324048 !important",
        color: "#FFF",
      },
    },
    MUIDataTableHeadCell: {
      data: {
        color: "#FFF !important",
      },
      sortAction: {
        "& span svg": {
          color: "#FFF !important",
        },
      },
    },
  },
};
