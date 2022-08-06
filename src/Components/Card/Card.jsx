import React, { useState } from "react";
import "./card.css";
import { listContentValue } from "../../Service/constants";
import { useNavigate } from "react-router-dom";

function Card({ displayData }) {
  // useEffect(() => {
  //   setDistrict(true);
  // }, []);
  const [content, setContent] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [setDistrict, setSetDistrict] = useState(true);
  const [selectedDistrict, setselectedDistrict] = useState("");

  if (displayData && displayData[1] && displayData[1]["districts"]) {
    let tmp = Object.keys(displayData[1]["districts"]);
    if (setDistrict) {
      setDistrictOptions(tmp);
      setSetDistrict(false);
    }
  } 


  // increment- counter
  const incrementcounter = () => {
    let value = content < 2 ? content + 1 : content;
    setContent(value);
  };
  //decrement - counter
  const decrementCounter = () => {
    let value = content > 0 ? content - 1 : content;
    setContent(value);
  };
  //clearSelecteddistrict
  const clearSelecteddistrict = () => {
    setselectedDistrict("");
  };
  let navigate = useNavigate();

  //  const routeChange = (e) => {
  //    let path = `/search/${e}`;
  //    navigate(path);
  //  };
  //callState
  const callState = () => {
    // setStateClicked(displayData[0]);
    let path = `/detail/${displayData[0]}`;
    navigate(path);
  };

  return (
    <div className="card">
      <div className={"grid-card"}>
        <div className={"state-name"}>{displayData[0]}</div>
        <div
          className={selectedDistrict ? "close-btn" : "close-btn hide"}
          onClick={clearSelecteddistrict}
        >
          X
        </div>
        <div className={"district-name"}>
          <select
            className="select-dist"
            value={selectedDistrict}
            onChange={(e) => {
              setselectedDistrict(e?.target?.value);
              // setLimitConvertedDataFlag(true);
            }}
          >
            <option value="" disabled selected>
              Select District to Filter
            </option>
            {districtOptions?.map((e, i) => {
              return (
                <option name={e} key={i}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={"content"} onClick={callState}>
        <p className={"content-heading"}>
          {listContentValue[content] ? listContentValue[content] : ""}
        </p>
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={"icon-pack"}
            >
              <path
                d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 
          480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 
          172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 
          247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"
              />
            </svg>
            Confirmed :{" "}
            {selectedDistrict
              ? displayData[1]?.["districts"]?.[selectedDistrict]?.[
                  listContentValue[content]
                ]?.confirmed || " - "
              : displayData[1]?.[listContentValue[content]]?.confirmed || " - "}
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={"icon-pack"}
            >
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM164.1 325.5C158.3 318.8 148.2 318.1 141.5 323.9C134.8 329.7 134.1 339.8 139.9 346.5C162.1 372.1 200.9 400 255.1 400C311.1 400 349.8 372.1 372.1 346.5C377.9 339.8 377.2 329.7 370.5 323.9C363.8 318.1 353.7 318.8 347.9 325.5C329.9 346.2 299.4 368 255.1 368C212.6 368 182 346.2 164.1 325.5H164.1zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z" />
            </svg>
            Recovered :{" "}
            {selectedDistrict
              ? displayData[1]?.["districts"]?.[selectedDistrict]?.[
                  listContentValue[content]
                ]?.recovered || " - "
              : displayData[1]?.[listContentValue[content]]?.recovered || " - "}
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={"icon-pack"}
            >
              <path d="M288 167.2V139.1c-28.25-36.38-47.13-79.29-54.13-125.2C231.7 .4054 214.8-5.02 206.1 5.481C184.1 30.36 168.4 59.7 157.2 92.07C191.4 130.3 237.2 156.7 288 167.2zM400 63.97c-44.25 0-79.1 35.82-79.1 80.08l.0014 59.44c-104.4-6.251-193-70.46-233-161.7C81.48 29.25 63.76 28.58 58.01 40.83C41.38 75.96 32.01 115.2 32.01 156.6c0 70.76 34.11 136.9 85.11 185.9c13.12 12.75 26.13 23.27 38.88 32.77L12.12 411.2c-10.75 2.75-15.5 15.09-9.5 24.47c17.38 26.88 60.42 72.54 153.2 76.29c8 .25 15.99-2.633 22.12-7.883l65.23-56.12l76.84 .0561c88.38 0 160-71.49 160-159.9l.0013-160.2l31.1-63.99L400 63.97zM400 160.1c-8.75 0-16.01-7.259-16.01-16.01c0-8.876 7.261-16.05 16.01-16.05s15.99 7.136 15.99 16.01C416 152.8 408.8 160.1 400 160.1z" />
            </svg>
            Deceased :{" "}
            {selectedDistrict
              ? displayData[1]?.["districts"]?.[selectedDistrict]?.[
                  listContentValue[content]
                ]?.deceased || " - "
              : displayData[1]?.[listContentValue[content]]?.deceased || " - "}
          </li>
        </ul>
        <button
          className={content === 0 ? "btn-cr left hide" : "btn-cr left"}
          onClick={(e) => {
            decrementCounter();
            e.stopPropagation();
          }}
        >
          {"<"}
        </button>
        <button
          className={content === 2 ? "btn-cr right hide" : "btn-cr right"}
          onClick={(e) => {
            incrementcounter();
            e.stopPropagation();
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Card;
