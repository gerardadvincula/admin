import SidePanel from "../../../../components/sidepanel/SidePanel";
import TopBar from "../../../../components/topBar/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineUpload, MdOutlineDownloadDone } from "react-icons/md";
import useFetch from "../../../../contextApi/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Confirmation from "../../../../components/confirmationDialog/Confirmation";
import Modal from "react-modal";

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

const UpdateProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/product/list/${id}`
  );

  const [ImageFile, setImageFile] = useState("");
  const [info, setInfo] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setInfo({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    });
  }, [data.name, data.description]);

  console.log(info);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (ImageFile === "") {
        const url = data.imageUrl;
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/product/update/${id}`,
          {
            ...info,
            imageUrl: url,
          }
        );
        navigate("/products");
        console.log("success");
      } else {
        const data = new FormData();
        data.append("file", ImageFile);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
          data
        );
        const { url } = uploadRes.data;
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/product/update/${id}`,
          {
            ...info,
            imageUrl: url,
          }
        );
        navigate("/products");
        console.log("success");
      }
    } catch (err) {}
  };

  const toggleModalCategory = (e) => {
    e.preventDefault();
    setIsOpenModal(!isOpenModal);
  };

  const fileTypeChecking = (e) => {
    var fileInput = document.getElementById("file-upload");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <div className="addCategory">
      <SidePanel />
      <div className="addCategoryContainer">
        <TopBar />
        <div className="addCategoryTitle">
          <h1>Update Product</h1>
        </div>
        <div className="addCatLeftRightContainer">
          <div className="addCategoryLeft">
            <img
              src={
                ImageFile
                  ? window.URL.createObjectURL(ImageFile)
                  : data.imageUrl
              }
              alt="AddImage"
            />
          </div>
          <div className="addCategoryRight">
            <form className="addCategoryForm">
              <div className="addCategoryItemImage">
                <label htmlFor="file-upload" className="imageInputLabel">
                  <MdOutlineUpload /> Upload your image here
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={fileTypeChecking}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <div className="addCategoryItem">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="addCategoryInput"
                  defaultValue={data.name}
                  onChange={(e) => {
                    setInfo((data) => ({
                      ...data,
                      name: e.target.value.toUpperCase(),
                    }));
                  }}
                />
              </div>

              <div className="addCategoryItem">
                <textarea
                  className="addCategoryInput"
                  defaultValue={data.description}
                  placeholder="description"
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    setInfo((data) => ({
                      ...data,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <div className="addVariationNumber">
                <div style={{ marginRight: "5px" }}>
                  <label>
                    Price: <br />
                  </label>
                  <input
                    type="number"
                    defaultValue={data.price}
                    className="variationPrice"
                    onChange={(e) => {
                      setInfo((data) => ({
                        ...data,
                        price: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label>
                    Quantity: <br />
                  </label>
                  <input
                    type="number"
                    className="variationPrice"
                    defaultValue={data.quantity}
                    onChange={(e) => {
                      setInfo((data) => ({
                        ...data,
                        quantity: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <button className="addCategoryBtn" onClick={toggleModalCategory}>
                <MdOutlineDownloadDone /> Update Products
              </button>
              <Modal
                isOpen={isOpenModal}
                onRequestClose={toggleModalCategory}
                contentLabel="My dialog"
                style={customStyles}
              >
                <Confirmation
                  action="update"
                  whatItem="product"
                  btnConfirm={handleUpdate}
                  closeModal={toggleModalCategory}
                />
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
