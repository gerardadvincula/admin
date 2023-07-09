/* eslint no-eval: 0 */
import "./ProductJson.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../../contextApi/useFetch";
import SidePanel from "../../../components/sidepanel/SidePanel";
import TopBar from "../../../components/topBar/TopBar";
import axios from "axios";
import logo from "../../../assets/images/logo.png";

const ProductsJson = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [orderJson, setOrderJson] = useState([]);
  const [userData, setUserData] = useState({});

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${data.email}`
      );
      setUserData(res.data);
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    setOrderJson(data?.orderJsonList);
  }, [data.orderJsonList]);

  const stringToJson = eval(orderJson);

  console.log("ito yon", userData);

  const handlePrintReceipt = () => {
    // Construct the receipt content
    let receiptContent = `
      <style>
        .imagereceipt {
          max-width: 100%;
          height: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
        }
      </style>
      <h1>Beauty Avenue</h1>
      <h1>Receipt</h1>
      <p>Order ID: ${id}</p>
      <p>Customer Name: ${data.userFullName}</p>
      <p>Address: ${userData.blockNLot} ${userData.street} ${userData.barangay} ${userData.municipality} ${userData.city} ${userData.postalCode}</p>
      <p>Contact Number: ${userData.contactNumber}</p>
      <h2>Products Ordered:</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
    `;

    // Add the product details to the receipt content
    stringToJson?.forEach((arrayItem, index) => {
      receiptContent += `
        <tr>
          <td>${arrayItem.productName || arrayItem.name}</td>
          <td>${arrayItem.productDes || arrayItem.description}</td>
          <td>${arrayItem.name ? "1" : arrayItem.quantity}</td>
          <td>₱ ${arrayItem.productPrice || arrayItem.price}</td>
        </tr>
      `;
    });

    // Add the total price to the receipt content
    receiptContent += `
      </table>
      <p><strong>Total Price:</strong> ₱ ${data.totalPrice}</p>
    `;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Write the receipt content to the new window
    printWindow.document.open();
    printWindow.document.write(receiptContent);
    printWindow.document.close();

    // Print the window
    printWindow.print();
  };

  return (
    <div className="productJson">
      <SidePanel />
      <div className="productJsonContainer">
        <TopBar />
        <h1 style={{ marginLeft: "10px", fontWeight: "500" }}>
          Product Ordered
        </h1>
        <div className="orderItem">
          <h1 style={{ float: "left", paddingLeft: "10px" }}>
            Order ID: {data.id}
          </h1>
          <h1 className="orderStatus">{data.status}</h1>
          <div className="orderHorizontalLine"></div>
          {stringToJson?.map((arrayItem, key) => {
            return (
              <div key={key}>
                <div className="productJsonOrderContainer">
                  <div className="orderProductImageContainer">
                    <img
                      src={arrayItem.imgUrl || arrayItem.imageUrl}
                      alt="productImage"
                      className="orderImg"
                    />
                  </div>
                  <div className="orderDetailsContainer">
                    <h1 className="orderProductName">
                      <i>Product Name:</i>{" "}
                      {arrayItem.productName || arrayItem.name}
                    </h1>
                    <span className="orderQuanitty">
                      <i>Quantity: </i>
                      {arrayItem.name ? "1" : arrayItem.quantity}
                    </span>
                  </div>
                  <span className="orderProductPrice">
                    <i>Price:</i> ₱ {arrayItem.productPrice || arrayItem.price}
                  </span>
                </div>
                <div className="orderHorizontalLineInside"></div>
              </div>
            );
          })}
          <div>
            <h1 className="orderTotalPrice">
              <i>Order Total:</i> ₱ {data.totalPrice}
            </h1>
          </div>
        </div>
        <button
          className="order-actionbtn"
          style={{ backgroundColor: "blue" }}
          onClick={handlePrintReceipt}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ProductsJson;
