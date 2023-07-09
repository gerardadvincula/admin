import "./Settings.css";
import SidePanel from "../../components/sidepanel/SidePanel";
import useFetch from "../../contextApi/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [courierInfo, setCourierInfo] = useState({
    courierName: "",
    courierWebsite: "",
  });
  const [courierList, setCourierList] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/courier/list`
  );

  console.log(data);

  const handleAddCourier = async () => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/courier/create`,
      courierInfo
    );
    toast("Successfully added the courier!", {
      type: "success",
      position: "top-center",
      autoClose: 2000,
    });
    setCourierInfo({
      courierName: "",
      courierWebsite: "",
    });
    setTimeout(() => window.location.reload(), 2000);
  };

  const handleUpdateCourier = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/courier/update/${
          selectedCourier.id
        }`,
        {
          courierName: courierInfo.courierName,
          courierWebsite: courierInfo.courierWebsite,
        }
      );
      toast("Successfully updated the courier!", {
        type: "success",
        position: "top-center",
        autoClose: 2000,
      });
      setCourierInfo({
        courierName: "",
        courierWebsite: "",
      });
      setSelectedCourier(null);
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCourier = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/courier/delete/${
          selectedCourier.id
        }`
      );
      toast("Successfully deleted the courier!", {
        type: "success",
        position: "top-center",
        autoClose: 2000,
      });
      setSelectedCourier(null);
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCourierList(data);
  }, [data]);

  const handleCourierChange = (e) => {
    const selectedId = e.target.value;
    const selectedCourier = courierList.find(
      (courier) => courier.id === selectedId
    );
    setSelectedCourier(selectedCourier);
    setCourierInfo({
      courierName: selectedCourier.courierName,
      courierWebsite: selectedCourier.courierWebsite,
    });
  };

  return (
    <div className="settings">
      <SidePanel />
      <div className="settings-container">
        <h1>Add your Courier here</h1>
        <select className="courier-list" onChange={handleCourierChange}>
          <option value="">Select a courier</option>
          {courierList?.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.courierName}
              </option>
            );
          })}
        </select>

        <section className="add-courier-container">
          <input
            className="add-courier-input"
            type="text"
            placeholder="Courier Name"
            value={courierInfo.courierName}
            onChange={(e) => {
              setCourierInfo((data) => ({
                ...data,
                courierName: e.target.value,
              }));
            }}
          />
          <input
            className="add-courier-input"
            placeholder="Courier Website"
            type="text"
            value={courierInfo.courierWebsite}
            onChange={(e) => {
              setCourierInfo((data) => ({
                ...data,
                courierWebsite: e.target.value,
              }));
            }}
          />
          <button className="add-courier-submit-btn" onClick={handleAddCourier}>
            Add Courier
          </button>
          {selectedCourier && (
            <>
              <button
                className="add-courier-submit-btn"
                onClick={handleUpdateCourier}
              >
                Edit Courier
              </button>
              <button
                className="add-courier-submit-btn"
                onClick={handleDeleteCourier}
              >
                Delete Courier
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Settings;
