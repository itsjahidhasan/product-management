import * as React from "react";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import AxiosPost from "../../@Jahid/APIResource/AxiosAPIPost";
import { Grid } from "@mui/material";
import {routes} from "../../@Jahid/Common/apiRoutes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  onClose: () => void;
  refreshDataTable: () => void;
}

const CategoryAddEdit = ({ refreshDataTable, ...props }: IProps) => {
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().trim().required().label("Name"),
      discription: yup.string().trim().required().label("Email"),
    });
  }, []);
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await AxiosPost(data, routes.PRIVATE.CATEGORY_AP);
      props.onClose();
      refreshDataTable();
    } catch (e) {
      alert("Something went wrong!Please try again");
      console.log("errors", e);
    }
  };
  return (
    <div>
      <Modal
        {...props}
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Category Name"
              autoComplete="name"
              autoFocus
              // helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              margin="normal"
              fullWidth
              id="discription"
              label="discription"
              autoComplete="discription"
              autoFocus
              // helperText={errors.discription?.message}
              {...register("discription")}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={props.onClose}
                  variant={"outlined"}
                  sx={{ mt: 3, mb: 2, float: "right" }}
                >
                  Close
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default CategoryAddEdit;
