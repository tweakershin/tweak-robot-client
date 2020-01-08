import axios from "services/defaultClient";

const SUPPLY_GROUP_URL = "supply/shop-group/";

export const fetchSupplyGroup = async () => {
  return axios.get(SUPPLY_GROUP_URL).then(resp => {
    console.log("fetchsupply");
    console.log(resp);
    const data = resp.data;
    console.log(data);
    console.log("fetchsupply End");
    return data;
  });
};

export const postSupplyGroup = async shopGroupName => {
  const requestBody = {
    name: shopGroupName
  };
  return axios.post(SUPPLY_GROUP_URL, requestBody).then(resp => {
    console.log(resp);
    console.log(resp.data);
    return resp.data;
  });
};
