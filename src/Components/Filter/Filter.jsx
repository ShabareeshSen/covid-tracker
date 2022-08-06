import React, { useContext, useEffect, useState } from "react";
import "./filter.css";
import { covidAPICall, covidDateFilterAPICall } from "../../Service/provider";
import { options } from "../../Service/constants";
import {
  dataToDisplay,
  objToArr,
  dateFilterApply,
  stateSearch,
} from "../../Service/functions";

import { displayDataContext } from "../../Context/context";
import { useParams } from "react-router-dom";

function Filter() {
  useEffect(() => {
    covidAPICall().then((res) => {
      setCovidData(res);
    });
    covidDateFilterAPICall().then((res) => {
      setDateFilteredData(res);
    });
  }, []);
  const { stateForDetail } = useParams();

  const [covidData, setCovidData] = useState();

  const [states, setStates] = useState();
  const [selectedStatetemp, setselectedStatetemp] = useState("");
  const [initiateStates, setInitiateStates] = useState(true);
  const [selectedState, setSelectedState] = useState("");

  const [selectedSortKey, setSelectedSortKey] = useState("");

  // const [convertedData, setconvertedData] = useState([]);
  const [limitConvertedDataFlag, setLimitConvertedDataFlag] = useState(true);
  const [limitConvertedDataDetailFlag, setLimitConvertedDataDetailFlag] =
    useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [dateFilteredData, setDateFilteredData] = useState();
  const { setconvertedData, setSelectedDistrict, selectedDistrict } =
    useContext(displayDataContext);

  const [districtOptions, setDistrictOptions] = useState([]);
  const [initiateDistrict, setinitiateDistrict] = useState(true);
  if (covidData) {
    //stateForDetail-options-dropdown
    let temp = Object.keys(covidData);
    if (temp !== states && initiateStates) {
      setStates(temp);
      setInitiateStates(false);
    }
    if (stateForDetail && initiateDistrict) {
      setDistrictOptions(Object.keys(covidData[stateForDetail]["districts"]));
      setinitiateDistrict(false);
    }
    if (stateForDetail && selectedDistrict && limitConvertedDataDetailFlag) {
      let sel = covidData[stateForDetail]["districts"][selectedDistrict];
      // console.log(sel);
      setconvertedData(sel);
      setLimitConvertedDataDetailFlag(false);
    }
    if (stateForDetail && limitConvertedDataDetailFlag && !selectedDistrict) {
      // detail page stateForDetail filtered with no other filters
      let tmp = objToArr(dateFilteredData)?.filter((e) => {
        return e[0] === stateForDetail;
      });
      if (tmp) {
        let tmp1 = objToArr(tmp[0][1]);
        if (tmp1) {
          let tmp2 = objToArr(tmp1[0][1]);
          if (tmp2) {
            setconvertedData(tmp2);
            setLimitConvertedDataDetailFlag(false);
          }
        }
      }
    }
    // detail page stateForDetail filtered with only date filters
    if (
      stateForDetail &&
      limitConvertedDataDetailFlag &&
      selectedDate &&
      !selectedDistrict
    ) {
      let tmp = objToArr(dateFilteredData)?.filter((e) => {
        return e[0] === stateForDetail;
      });
      if (tmp) {
        let tmp1 = objToArr(tmp[0][1]);
        if (tmp1) {
          let tmp2 = objToArr(tmp1[0][1]);
          let dateFiltered1 = tmp2.filter((e) => {
            return e[0] === selectedDate;
          });
          setconvertedData(dateFiltered1);
          setLimitConvertedDataDetailFlag(false);
        }
      }
    }

    // detail page stateForDetail filtered with only sort filters
    if (
      stateForDetail &&
      limitConvertedDataDetailFlag &&
      selectedSortKey &&
      !selectedDistrict
    ) {
      let tmp = objToArr(dateFilteredData)?.filter((e) => {
        return e[0] === stateForDetail;
      });
      if (tmp) {
        let tmp1 = objToArr(tmp[0][1]);
        if (tmp1) {
          setconvertedData(
            dataToDisplay(selectedSortKey, objToArr(tmp1[0][1]), false)
          );
          setLimitConvertedDataDetailFlag(false);
        }
      }
    }

    //detail page stateForDetail with date and sort
    if (
      stateForDetail &&
      limitConvertedDataDetailFlag &&
      selectedSortKey &&
      selectedDate &&
      !selectedDistrict
    ) {
      let tmp = objToArr(dateFilteredData)?.filter((e) => {
        return e[0] === stateForDetail;
      });
      if (tmp) {
        let tmp1 = objToArr(tmp[0][1]);
        if (tmp1) {
          let dateFiltered1 = objToArr(tmp1[0][1])?.filter((e) => {
            return e[0] === selectedDate;
          });
          setconvertedData(
            dataToDisplay(selectedSortKey, dateFiltered1, false)
          );
          setLimitConvertedDataDetailFlag(false);
        }
      }
    }

    //if stateForDetail or date not filtered with or without sort
    if (
      limitConvertedDataFlag &&
      !selectedDate &&
      !selectedState &&
      !stateForDetail
    ) {
      setconvertedData(
        dataToDisplay(selectedSortKey, objToArr(covidData), false)
      );
      setLimitConvertedDataFlag(false);
    }
    //if stateForDetail is filtered without date
    if (
      limitConvertedDataFlag &&
      !selectedDate &&
      selectedState &&
      !stateForDetail
    ) {
      setconvertedData(stateSearch(objToArr(covidData), selectedState));
      setLimitConvertedDataFlag(false);
    }
  }
  //if date filter applied with or with out sort and without stateForDetail
  if (
    dateFilteredData &&
    selectedDate &&
    limitConvertedDataFlag &&
    !stateForDetail
  ) {
    setconvertedData(
      dataToDisplay(
        selectedSortKey,
        dateFilterApply(objToArr(dateFilteredData), selectedDate),
        true
      )
    );
    setLimitConvertedDataFlag(false);
  }
  //if date filter applied with or with out sort and with stateForDetail
  if (
    dateFilteredData &&
    selectedDate &&
    limitConvertedDataFlag &&
    selectedState &&
    !stateForDetail
  ) {
    setconvertedData(
      stateSearch(
        dateFilterApply(objToArr(dateFilteredData), selectedDate),
        selectedState
      )
    );
    setLimitConvertedDataFlag(false);
  }
  //clearSelectedState
  const clearSelectedState = () => {
    setSelectedState("");
    setselectedStatetemp("");
    setLimitConvertedDataFlag(true);
  };

  //clearDateState
  const clearSelectedDate = () => {
    setSelectedDate("");
    if (stateForDetail) {
      setLimitConvertedDataDetailFlag(true);
    } else {
      setLimitConvertedDataFlag(true);
    }
  };
  //clearSelectedSortKey
  const clearSelectedSortKey = () => {
    setSelectedSortKey("");
    if (stateForDetail) {
      setLimitConvertedDataDetailFlag(true);
    } else {
      setLimitConvertedDataFlag(true);
    }
  };
  //clearSelectedDistrict
  const clearSelectedDistrict = () => {
    setSelectedDistrict("");
    setLimitConvertedDataDetailFlag(true);
  };

  //buttonClickedState
  const buttonClickedState = () => {
    setSelectedState(selectedStatetemp);
    setLimitConvertedDataFlag(true);
  };
  return (
    <div>
      <div className="header-input">
        {stateForDetail ? (
          <b>{stateForDetail}</b>
        ) : (
          <div className="filter-input">
            <select
              className="select-ind"
              value={selectedStatetemp}
              onChange={(e) => {
                setselectedStatetemp(e?.target?.value);
              }}
            >
              <option value="" disabled selected>
                Select your option
              </option>
              {states?.map((e, i) => {
                return (
                  <option name={e} key={i}>
                    {e}
                  </option>
                );
              })}
            </select>
            <button
              className="header-button-search"
              onClick={buttonClickedState}
            >
              Search
            </button>
            <div
              className={selectedState ? "close-btnI" : "close-btn hide"}
              onClick={clearSelectedState}
            >
              X
            </div>
          </div>
        )}

        <div className="filter-input">
          <label>Filter by Date : </label>

          <input
            type="date"
            value={selectedDate}
            min="2020-01-01"
            max={new Date().toISOString().split("T")[0]}
            onChange={(date) => {
              setSelectedDate(date?.target?.value);
              if (stateForDetail) {
                setLimitConvertedDataDetailFlag(true);
              } else {
                setLimitConvertedDataFlag(true);
              }
            }}
          ></input>
          <div
            className={selectedDate ? "close-btnI" : "close-btn hide"}
            onClick={clearSelectedDate}
          >
            X
          </div>
        </div>
        <div className="filter-input">
          <label>
            <span className="icons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="sort-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
            </span>
            Sort By :
          </label>
          <select
            className={"select-ind sort"}
            value={selectedSortKey}
            onChange={(e) => {
              setSelectedSortKey(e?.target?.value);
              if (stateForDetail) {
                setLimitConvertedDataDetailFlag(true);
              } else {
                setLimitConvertedDataFlag(true);
              }
            }}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {options.map((e, i) => {
              return (
                <option name={i} key={i}>
                  {e}
                </option>
              );
            })}
          </select>
          <div
            className={selectedSortKey ? "close-btnI" : "close-btn hide"}
            onClick={clearSelectedSortKey}
          >
            X
          </div>
        </div>
        {stateForDetail && (
          <>
            <label>Districts :</label>
            <select
              className={"select-ind sort"}
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e?.target?.value);
                if (stateForDetail) {
                  setLimitConvertedDataDetailFlag(true);
                }
              }}
            >
              <option value="" disabled selected>
                Select District
              </option>
              {districtOptions?.map((e, i) => {
                return (
                  <option name={i} key={i}>
                    {e}
                  </option>
                );
              })}
            </select>
            <div
              className={selectedDistrict ? "close-btnI" : "close-btn hide"}
              onClick={clearSelectedDistrict}
            >
              X
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Filter;
