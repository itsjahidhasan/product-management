import * as React from "react";
import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AxiosGet from "../../@Jahid/APIResource/AxiosAPIGet";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import {routes} from "../../@Jahid/Common/apiRoutes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface IProps {
  categoryId: number | null;
  onClose: () => void;
  openAddProduct: (cId:number|null) => void;
  refreshDataTable: () => void;
}
const CategoryDetails = ({ categoryId, refreshDataTable, ...props }: IProps) => {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    AxiosGet(routes.PRIVATE.CATEGORY_PRODUCTS(categoryId)).then((res) => {
      setProducts(res?.data);
    });
  }, []);
  const handleOnClick = () => {
    props.onClose();
    props.openAddProduct(categoryId);
  };
  return (
    <div>
      <Modal {...props} open={true}>
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Button
              variant="contained"
              sx={{ margin: "10px", float: "right" }}
              onClick={() => handleOnClick()}
            >
              Add
            </Button>
            <Table
              sx={{ minWidth: 700, marginTop: "10px" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell align="right">RAM</StyledTableCell>
                  <StyledTableCell align="center">ROM</StyledTableCell>
                  <StyledTableCell align="center">Processor</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((item: any) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item?.ram}</StyledTableCell>
                    <StyledTableCell align="right">{item?.rom}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.processor}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.price}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};
export default CategoryDetails;
