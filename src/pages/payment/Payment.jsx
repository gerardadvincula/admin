import "./Payment.css";
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

const Payment = () => {
  const [list, setList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [payment, setPayment] = useState("");
  // const [orNumber, setOrNum] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paramsId, setParamsId] = useState("");

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list`
  );

  const toClaim = data?.filter((data) => data.status === "ToClaim");

  useEffect(() => {
    setList(data);
  }, [data]);

  // console.log(orNumber);
  console.log(selectedStatus);

  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/order/update/status/${id}`,
        {
          status: selectedStatus,
          // orNum: orNumber,
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
    setList(list.filter((item) => item.id !== id));
    setPayment(res.data);
  };

  let disable;

  // if (orNumber === "") {
  //   disable = true;
  // } else
  if (selectedStatus === "") {
    disable = true;
  } else {
    disable = false;
  }

  let classname;

  // if (orNumber === "") {
  //   classname = "actionButtonDisable";
  // } else

  if (selectedStatus === "") {
    classname = "actionButtonDisable";
  } else {
    classname = "actionButton";
  }

  let title;

  // if (orNumber === "") {
  //   title = "Please Update OR# and Status to make changes";
  // } else

  if (selectedStatus === "") {
    title = "Please Update OR# and Status to make changes";
  } else {
    title = "";
  }

  const toggleModalCategory = (id) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const orderColumn = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Student No.",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "userFullName",
      headerName: "Student Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    // {
    //   field: "quantity",
    //   headerName: "Quantity",
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "productDesc",
    //   headerName: "Description",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    // {
    //   field: "productVariation",
    //   headerName: "Variation",
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "orNum",
      headerName: "OR#",
      headerAlign: "center",
      align: "center",
      // renderCell: (params) => {
      //   return (
      //     <div>
      //       <input
      //         type="text"
      //         style={{
      //           height: "30px",
      //           border: "none",
      //           width: "80px",
      //           textAlign: "center",
      //         }}
      //         defaultValue={params.row.orNum}
      //         onChange={(e) => setOrNum(e.target.value)}
      //       />
      //     </div>
      //   );
      // },
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
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
              <option value="ToClaim" className="statusToClaim">
                ToClaim
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
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="actionButton"
              style={{ backgroundColor: "green" }}
              onClick={() => toggleModal(params.row.id)}
            >
              View
            </button>
            <button
              className={classname}
              title={title}
              disabled={disable}
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
                whatItem="payment"
                action="update"
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
        <h1 style={{ marginLeft: "20px" }}>Payment</h1>
        <p style={{ marginLeft: "20px", marginBottom: "10px" }}>
          List of ready for Payment
        </p>
        <DataGrid
          style={{ overflowX: "scroll", height: "700px" }}
          rows={toClaim}
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

export default Payment;
