/* eslint no-eval: 0 */
import "./Orders.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useFetch from "../../contextApi/useFetch";
import SidePanel from "../../components/sidepanel/SidePanel";
import TopBar from "../../components/topBar/TopBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Confirmation from "../../components/confirmationDialog/Confirmation";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "40%",
    overflow: "hidden",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

Modal.setAppElement("#root");

const Orders = () => {
  const [list, setList] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [courier, setCourier] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [payment, setPayment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paramsId, setParamsId] = useState("");

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list`
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/courier/list`
      );
      setCourier(res.data);
    };
    fetchData();
    setList(data);
  }, [data]);

  // update
  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/order/update/status/${id}`,
        {
          status: selectedStatus,
          trackingNum: trackingNumber,
          courier: selectedCourier,
        }
      );
      setList(list.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const toggleModal = async (id) => {
    setIsOpen(!isOpen);
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`
    );
    setPayment(res.data);
  };

  const toggleModalCategory = (id) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const orderColumn = [
    {
      field: "id",
      headerName: "Order ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userFullName",
      headerName: "Customer Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "createdDate",
    //   headerName: "Order Date",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 200,
    // },
    {
      field: "proofPayment",
      headerName: "Proof of Payment",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.proofPayment}
              alt="no proof of payment"
              className="productImage"
            />
          </>
        );
      },
    },
    {
      field: "trackingNum",
      headerName: "Tracking Number",
      headerAlign: "center",
      width: 170,
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <input
              className="order-trackingnumber"
              defaultValue={params.row.trackingNum}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
        );
      },
    },
    {
      field: "courier",
      headerName: "Courier",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <select
              className="order-courierlist"
              defaultValue={params.row.courier}
              onChange={(e) => setSelectedCourier(e.target.value)}
            >
              <option value="">select courier name</option>
              {courier.map((item) => {
                return (
                  <option value={item.courierWebsite} key={item.id}>
                    {item.courierName}
                  </option>
                );
              })}
            </select>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <select
              className={`status${params.row.status}`}
              defaultValue={params.row.status}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Completed" className="statusCompleted">
                Completed
              </option>
              <option value="ToShip" className="statusToClaim">
                ToShip
              </option>
              <option value="Pending" className="statusPending">
                Pending
              </option>
              <option value="Cancelled" className="statusCancelled">
                Cancelled
              </option>
            </select>
          </div>
        );
      },
    },
    {
      field: "actionButton",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 280,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/productJson/${params.row.id}`}>
              <button
                className="order-actionbtn"
                style={{ backgroundColor: "green" }}
                // onClick={() => toggleModalJson(params.row.id)}
              >
                View Products Ordered
              </button>
            </Link>
            <button
              className="order-actionbtn"
              style={{ backgroundColor: "#0071c2" }}
              onClick={() => toggleModalCategory(params.row.id)}
            >
              Update
            </button>
            <Modal
              isOpen={isOpenModal}
              onRequestClose={toggleModalCategory}
              contentLabel="My dialog"
              style={customStyles}
            >
              <Confirmation
                action="update"
                whatItem="order"
                btnConfirm={() => handleUpdateStatus(paramsId)}
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
        <h1 style={{ marginLeft: "20px" }}>Orders</h1>
        <p style={{ marginLeft: "20px", marginBottom: "10px" }}>
          List of Orders
        </p>
        <DataGrid
          style={{ overflowX: "scroll", height: "700px" }}
          rows={data}
          columns={orderColumn}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
      >
        <h3 style={{ marginBottom: "10px" }}>Proof of Payment (Receipt)</h3>
        <img
          src={payment?.proofPayment}
          alt=""
          className="proofOfPaymentImage"
        />
        <button
          style={{
            border: "none",
            borderRadius: "10px",
            padding: "5px",
            width: "150px",
            fontSize: "20px",
            marginTop: "10px",
            backgroundColor: "#0071c2",
            color: "white",
            cursor: "pointer",
          }}
          onClick={toggleModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Orders;
