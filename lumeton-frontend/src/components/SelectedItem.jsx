import React from "react";
import { Icon } from "@iconify/react";

const SelectedItem = ({ selectedItem, setSelectedItem }) => {
  const imageUrl =
    "https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/655245-jrodav-gettyimages-541575344-72c6bf07c89e03947d92dc69cadd5fa6.jpg";
  return (
    <div className="overflowContainer">
      <h1>Weather Feedback</h1>
      {selectedItem && (
        <div className="itemContainer">
          <div className="wrapper">
            <h2>Feedback</h2>
            <h6>id: {selectedItem.feedback_id ?? selectedItem._id.$oid}</h6>
            <div className="row">
              <div className="itemProperty">
                <p className="propValue">{selectedItem.final_urgency ? String(selectedItem.final_urgency).slice(0,6) : "0.5"}</p>
                <p className="propTitle">Importance rating</p>
              </div>
              <div className="itemProperty">
                <p className="propValue">{selectedItem.snow_depth ?? selectedItem.snowDepth}</p>
                <p className="propTitle">
                  Snow <br /> depth
                </p>
              </div>
              <div className="itemProperty">
                <p className="propValue ">
                  {selectedItem.weatherConditions ??

										selectedItem.ice == "0" ? "No ice" : selectedItem.ice == "1" ? "Black ice" : "Hidden ice"}
								</p>
                <p className="propTitle"> Ice </p>
              </div>
            </div>
            <img src={selectedItem.imageUrl ?? imageUrl} className="image" />
            <p>
              <b>Description</b>
              <br />
              {selectedItem.description ?? selectedItem.feedback}
            </p>
            <div className="closeContainer" onClick={() => setSelectedItem(null)}>
              <Icon icon="maki:cross" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItem;
