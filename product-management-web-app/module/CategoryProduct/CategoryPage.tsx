import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AxiosGet from "../../@Jahid/APIResource/AxiosAPIGet";
import { useCallback, useEffect, useState } from "react";
import CategoryAddEdit from "./CategoryAddEdit";
import CategoryDetails from "./CategoryDetails";
import AddProduct from "./AddProduct";
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

const CategoryPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenProductAddModal, setIsOpenProductAddModal] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  useEffect(() => {
    AxiosGet(routes.PRIVATE.CATEGORY_AP).then((res) => {
      setProducts(res?.data);
    });
  }, [isToggleTable]);
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const openDetailsModal = useCallback((itemId: number | null = null) => {
    setCategoryId(itemId);
    setIsOpenDetailsModal(true);
  }, []);

  const closeProductAddModal = useCallback((itemId: number | null = null) => {
    setIsOpenProductAddModal(false);
  }, []);

  const openProductAddModal = useCallback((itemId: number | null = null) => {
    setCategoryId(itemId);
    setIsOpenProductAddModal(true);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);

  return (
    <>
      <TableContainer component={Paper}>
        <Button
          onClick={() => openAddEditModal()}
          variant="contained"
          sx={{ margin: "10px", float: "right" }}
        >
          Add
        </Button>
        <Table
          sx={{ minWidth: 700, marginTop: "10px" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item: any) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.discription}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant={"contained"}
                      onClick={() => openDetailsModal(item.id)}
                    >
                      Products
                    </Button>
                    <Button
                      variant={"contained"}
                      onClick={() => openProductAddModal(item.id)}
                    >
                      Add Products
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {isOpenAddEditModal && (
        <CategoryAddEdit
          onClose={closeAddEditModal}
          refreshDataTable={refreshDataTable}
        />
      )}

      {isOpenDetailsModal && (
        <CategoryDetails
          categoryId={categoryId}
          onClose={closeDetailsModal}
          openAddProduct={openProductAddModal}
          refreshDataTable={refreshDataTable}
        />
      )}
      {isOpenProductAddModal && (
        <AddProduct
          catagoryId={categoryId}
          onClose={closeProductAddModal}
          refreshDataTable={refreshDataTable}
        />
      )}
    </>
  );
};
export default CategoryPage;
