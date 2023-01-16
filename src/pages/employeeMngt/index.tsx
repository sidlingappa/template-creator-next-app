import GPSTable from "../../components/table";
import React, { useEffect, useState } from "react";
import theme from "../../styles/theme/theme";
import NavBar from "../../components/navbar";
import { Grid, Box, MuiThemeProvider } from "@mui/material";
import { NextPage, NextPageContext } from "next";
import MUIDataTable from "mui-datatables";
import useSWR from "swr";
import {
  columns,
  options,
  theme as bulkTableTheme,
} from "../../config/employees-table";
export interface TableData {
  firstName: string;
  lastName: string;
  error?: string;
}
export interface EmployeeInfo {
  id: bigint;
  noOfServiceYears: bigint;
  noOfServiceMonth: bigint;
  employeeId: string;
  nationality: string;
  citizenship: string;
  weekDayOff: string;
  gender: string;
  dob: Date;
  nric: string;
  empType: string;
  cpfContribution: string;
  empName: string;
}
const EmployeeMngt: NextPage & { auth?: boolean } = () => {
  // const [data, setData] = useState<TableData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [employees, setEmployees] = useState<any>([["Loading Data..."]]);
  const getEmpInfo = async () => {
    const result = await fetch(`/api/employees/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `cd05f2b8-b222-4068-a78d-749fffeced76`,
      },
    });
    const data = await result.json();
    if (result.ok) {
      let empData = [];
      data["response"]["results"]?.map((emp) => {
        let e = [];
        e.push(emp.employee.id);
        e.push(emp.employee.empName);
        e.push(emp.employee.employeeId);
        e.push(emp.employee.nationality);
        e.push(emp.employee.citizenship);
        e.push(emp.employee.weekDayOff);
        e.push(emp.employee.gender);
        e.push(emp.employee.dob);
        e.push(emp.employee.empType);
        e.push(emp.employee.cpfContribution);
        e.push(emp.employee.workshift.title);
        empData.push(e);
      });
      console.log(empData);
      setEmployees(empData);
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    getEmpInfo();
  }, []);
  const toptions = {
    filterType: "checkbox",
  };
  const search = (
    searchTerm: string,
    perPage: number,
    page: number,
    filters: any,
    sort: any
  ) => {
    setRequest({
      ...request,
      limit: perPage,
      page: page,
      term: searchTerm,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sort && { sort: JSON.stringify(sort) }),
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar></NavBar>
      <Grid item sx={{ margin: 10 }}>
        <MUIDataTable
          title="Employee Management"
          data={employees}
          columns={columns}
          options={options}
        />
      </Grid>
    </Box>
  );
};
EmployeeMngt.auth = true;
export default EmployeeMngt;
