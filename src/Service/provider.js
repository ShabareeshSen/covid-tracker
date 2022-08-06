export var covidAPICall = async () => {
  let data = await fetch("https://data.covid19india.org/v4/min/data.min.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

//

export var covidDateFilterAPICall = async () => {
  let data = await fetch(
    "https://data.covid19india.org/v4/min/timeseries.min.json"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};
