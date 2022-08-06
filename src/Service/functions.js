import { SORT_OPTIONS } from "./constants";

export const objToArr = (covidData) => {
  if(covidData){
    return Object.entries(covidData);
  }
  
};
const confirmedCountAscending = (covidData) => {
  return covidData.sort((a, b) => {
    return a[1]?.total?.confirmed - b[1]?.total?.confirmed;
  });
};

const confirmedCountDescending = (covidData) => {
  return covidData
    .sort((a, b) => {
      return a[1]?.total?.confirmed - b[1]?.total?.confirmed;
    })
    .reverse();
};

const affectedPercentageAscending = (covidData) => {
  return covidData.sort((a, b) => {
    return (
      a[1]?.total?.confirmed / a[1]?.total?.tested -
      b[1]?.total?.confirmed / b[1]?.total?.tested
    );
  });
};

const affectedPercentageDescending = (covidData) => {
  return covidData
    .sort((a, b) => {
      return (
        a[1]?.total?.confirmed / a[1]?.total?.tested -
        b[1]?.total?.confirmed / b[1]?.total?.tested
      );
    })
    .reverse();
};

const vaccinatedPercentageAscending = (covidData) => {
  return covidData.sort((a, b) => {
    return a[1]?.total?.vaccinated2 - b[1]?.total?.vaccinated2;
  });
};

const vaccinatedPercentageDescending = (covidData) => {
  return covidData
    .sort((a, b) => {
      return a[1]?.total?.vaccinated2 - b[1]?.total?.vaccinated2;
    })
    .reverse();
};

export const dataToDisplay = (selectedSortKey, covidData, isDate) => {
  if (selectedSortKey) {
    if (selectedSortKey === SORT_OPTIONS.CONFIRMED1) {
      return confirmedCountAscending(covidData);
    } else if (selectedSortKey === SORT_OPTIONS.CONFIRMED2) {
      return confirmedCountDescending(covidData);
    } else if (selectedSortKey === SORT_OPTIONS.AFFECTED1) {
      return affectedPercentageAscending(covidData);
    } else if (selectedSortKey === SORT_OPTIONS.AFFECTED2) {
      return affectedPercentageDescending(covidData);
    } else if (selectedSortKey === SORT_OPTIONS.VACINATED1) {
      return vaccinatedPercentageAscending(covidData);
    } else if (selectedSortKey === SORT_OPTIONS.VACINATED2) {
      return vaccinatedPercentageDescending(covidData);
    }
  } else {
    return covidData;
  }
};

//DATE

export const dateFilterApply = (dateArray, selectedDate) => {
  let final = [];
  dateArray.map((e) => {
    let temp = [];
    temp.push(e[0]);
    temp.push(e[1]?.dates?.[selectedDate]);
    final.push(temp);
  });
  return final;
};

//state -search
export const stateSearch = (covidData, selectedState) => {
  let final = covidData.filter((e) => {
    return e[0] === selectedState;
  });
  return final;
};
