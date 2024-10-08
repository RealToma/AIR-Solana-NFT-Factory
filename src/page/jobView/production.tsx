import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";

// table - start
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { getProduction } from "../../redux/actions/jobview";
import jwtDecode from "jwt-decode";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "500px",

  },
});

const Production = () => {
  // table start
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productionData, setProductionData] = useState<any>();

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      productionData && Object.keys(productionData).length - page * rowsPerPage
    );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // table end

  useEffect(() => {
    // const user1:any = localStorage.getItem('jwtToken');
    // const username:any =(jwtDecode(user1) as any).username;

    // if(username === undefined)
    // {
    //   return;
    // }
    // else{
    //   getProduction().then(res=>{
    //     setProductionData(res.production);
    //   });
    // }
    getProduction().then((res) => {
      setProductionData(res.production);
    });
  }, []);

  return (
    <StyledComponent>
      <Workflow>
        <TablePart01>
          <TableContainer className={classes.container}>
            <Table
              aria-label="custom pagination table"
              stickyHeader
              style={{ height: "100%", background: "white" }}
            >
              <TableHead style={{ minHeight: "60px" }}>
                <TableRow>
                  <TableCell width="5%">No</TableCell>
                  <TableCell width="5%">ID</TableCell>
                  <TableCell width="25%">Wallet Address</TableCell>
                  <TableCell width="20%">Production Name</TableCell>
                  <TableCell width="25%">Batch Name</TableCell>
                  <TableCell width="5%">Complete</TableCell>
                  <TableCell width="15%">Last Action Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "auto" }}>
                {productionData &&
                  (rowsPerPage > 0
                    ? productionData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : productionData
                  ).map((each: any, index: any) => (
                    <TableRow key={index} hover>
                      <TableCell width="5%">
                        {productionData.length < rowsPerPage
                          ? index + 1
                          : page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell width="5%">{each.production_id}</TableCell>
                      <TableCell width="25%">{each.wallet_address}</TableCell>
                      <TableCell width="20%">{each.production_name}</TableCell>
                      <TableCell width="25%">{each.batch_name}</TableCell>
                      <TableCell width="5%">{each.completed}</TableCell>
                      <TableCell width="15%">{each.created_date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{  minHeight: "60px" }}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={7}
            count={productionData ? Object.keys(productionData).length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TablePart01>
      </Workflow>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 50px 150px 50px 150px;
  box-sizing: border-box;
`;

const Workflow = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #176180;
  overflow-y: auto;
  padding: 50px;
  box-sizing: border-box;
`;

const TablePart01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  .MuiTableCell-stickyHeader {
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableBody-root {
    background-color: white;
  }
  .MuiTableCell-body {
    color: #176180;
    font-size: 1.2rem;
  }
  .MuiTableCell-root {
    border-bottom: 1px solid grey;
  }
  .MuiTableFooter-root {
    background: #54c3e7;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }
  .MuiTableContainer-root {
    box-shadow: none;
    border: none;
  }
  .MuiTableRow-root {
    &:hover {
      transition: 0.2s;
      background-color: rgba(0, 0, 0, 0.08) !important;
    }
  }
  .MuiTablePagination-root {
    background: #54c3e7;
  }
`;

export default Production;
