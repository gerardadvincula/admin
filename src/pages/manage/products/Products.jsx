import "./Products.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useFetch from "../../../contextApi/useFetch";
import SidePanel from "../../../components/sidepanel/SidePanel";
import TopBar from "../../../components/topBar/TopBar";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Confirmation from "../../../components/confirmationDialog/Confirmation";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "450px",
    height: "250px",
    overflow: "hidden",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const Products = () => {
  const [list, setList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paramsId, setParamsId] = useState("");

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/product/list`
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/product/delete/${id}`
      );
      setList(list.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const toggleModalCategory = (id) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const productColumn = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Product Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "description",
      headerName: "Product Description",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "finalRating",
      headerName: "Rating",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sold",
      headerName: "No of Sold",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "imageUrl",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.imageUrl}
              alt="product"
              className="productImage"
            />
          </>
        );
      },
    },
    {
      field: "actionButton",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 230,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <button
                className="product-actionbtn"
                style={{ backgroundColor: "blue" }}
              >
                Update
              </button>
            </Link>
            <button
              className="product-actionbtn"
              style={{ backgroundColor: "red" }}
              onClick={() => toggleModalCategory(params.row.id)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenModal}
              onRequestClose={toggleModalCategory}
              contentLabel="My dialog"
              style={customStyles}
            >
              <Confirmation
                action="delete"
                whatItem="product"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleModalCategory}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="orders">
      <SidePanel />
      <div className="orderContainer">
        <TopBar />
        <h1 style={{ marginLeft: "20px" }}>Products</h1>
        <p style={{ marginLeft: "20px", marginBottom: "10px" }}>
          List of Products
        </p>
        <Link to="addProduct">
          <button className="productAddBtn">
            <MdAddCircle /> Add Product
          </button>
        </Link>
        <DataGrid
          style={{ overflowX: "scroll", height: "700px" }}
          rows={data}
          columns={productColumn}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </div>
  );
};

export default Products;
