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
