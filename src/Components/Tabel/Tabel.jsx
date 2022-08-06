import React, { useContext } from "react";
import "./tabel.css";

import { displayDataContext } from "../../Context/context";
import NoresultFound from "../NoResultFound/NoresultFound";

function Tabel() {
  let { selectedDistrict, convertedData } = useContext(displayDataContext);
  console.log(selectedDistrict, convertedData);
  return (
    <div className="table-main">
      {convertedData.length===0 && <NoresultFound />}
      {convertedData.length!==0 && (
        <div className={"tabel-con"}>
          <tabel className={"tabel-state"}>
            <tr>
              <th>{selectedDistrict ? "District" : "Date"}</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deceased</th>
              <th>Delta</th>
              <th>Delta 7</th>
            </tr>
            {selectedDistrict && (
              <tr>
                <td>{selectedDistrict}</td>
                <td>{convertedData?.["total"]?.["confirmed"] || " - "}</td>
                <td>{convertedData?.["total"]?.["recovered"] || " - "}</td>
                <td>{convertedData?.["total"]?.["deceased"] || " - "}</td>
                <td>
                  confirmed: {convertedData?.["delta"]?.["deceased"] || " - "}
                  <br />
                  recovered: {convertedData?.["delta"]?.["recovered"] || " - "}
                  <br />
                  tested:{convertedData?.["delta"]?.["deceased"] || " - "}
                </td>
                <td>
                  confirmed: {convertedData?.["delta7"]?.["deceased"] || " - "}
                  <br />
                  recovered: {convertedData?.["delta7"]?.["recovered"] || " - "}
                  <br />
                  tested:{convertedData?.["delta7"]?.["deceased"] || " - "}
                </td>
              </tr>
            )}
          </tabel>
          {!selectedDistrict &&
            convertedData?.slice(0)?.map((e, i) => {
              return (
                <tr>
                  <td>{e[0]}</td>
                  <td>{e[1]?.["total"]?.["confirmed"] || " - "}</td>
                  <td>{e[1]?.["total"]?.["recovered"] || " - "}</td>
                  <td>{e[1]?.["total"]?.["deceased"] || " - "}</td>
                  <td>
                    confirmed: {e[1]?.["delta"]?.["deceased"] || " - "}
                    <br />
                    recovered: {e[1]?.["delta"]?.["recovered"] || " - "}
                    <br />
                    tested:{e[1]?.["delta"]?.["deceased"] || " - "}
                  </td>
                  <td>
                    confirmed: {e[1]?.["delta7"]?.["deceased"] || " - "}
                    <br />
                    recovered: {e[1]?.["delta7"]?.["recovered"] || " - "}
                    <br />
                    tested:{e[1]?.["delta7"]?.["deceased"] || " - "}
                  </td>
                </tr>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Tabel;
