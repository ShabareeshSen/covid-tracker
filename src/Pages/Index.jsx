import React, { useContext } from "react";
import Card from "../Components/Card/Card";
import Filter from "../Components/Filter/Filter";
import Header from "../Components/Header/Header";
import { displayDataContext } from "../Context/context";
function Index() {
  const { convertedData } = useContext(displayDataContext);

  return (
    <div>
      <Header />
      <Filter />
      <div className="card-container">
        {convertedData &&
          convertedData.map((value, index) => {
            return <Card displayData={value} />;
          })}
      </div>
    </div>
  );
}

export default Index;
