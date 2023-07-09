import { useState } from "react";
import SidePanel from "../../../../components/sidepanel/SidePanel";
import TopBar from "../../../../components/topBar/TopBar";
import "./AddCategory.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineUpload, MdOutlineDownloadDone } from "react-icons/md";
import Confirmation from "../../../../components/confirmationDialog/Confirmation";
import Modal from "react-modal";
import { toast } from "react-toastify";

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

const AddCategory = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ImageFile, setImageFile] = useState("");
  const [info, setInfo] = useState({});

  const navigate = useNavigate();

  const handleAddCat = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", ImageFile);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        data
      );
      const { url } = uploadRes.data;

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/category/create`,
        {
          ...info,
          imageUrl: url,
        }
      );
      toast.success("A new category has been added!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/category");
      }, 2000);
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
          <h1>Add Category</h1>
        </div>
        <div className="addCatLeftRightContainer">
          <div className="addCategoryLeft">
            <img
              src={
                ImageFile
                  ? URL.createObjectURL(ImageFile)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  placeholder="Category Name"
                  className="addCategoryInput"
                  onChange={(e) => {
                    setInfo((data) => ({
                      ...data,
                      categoryName: e.target.value.toUpperCase(),
                    }));
                  }}
                />
              </div>

              <div className="addCategoryItem">
                <textarea
                  className="addCategoryInput"
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
              <button className="addCategoryBtn" onClick={toggleModalCategory}>
                <MdOutlineDownloadDone /> Add Category
              </button>
              <Modal
                isOpen={isOpenModal}
                onRequestClose={toggleModalCategory}
                contentLabel="My dialog"
                style={customStyles}
              >
                <Confirmation
                  action="add"
                  whatItem="category"
                  btnConfirm={handleAddCat}
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

export default AddCategory;
