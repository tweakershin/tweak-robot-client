import axios from "services/defaultClient";

const SUPPLY_GROUP_URL = "supply/shop-group/";
const SUPPLY_SHOP_URL = "supply/shops/";

export const fetchSupplyGroup = async () => {
  return axios.get(SUPPLY_GROUP_URL).then(resp => {
    return resp.data;
  });
};

export const postSupplyGroup = async shopGroupName => {
  const requestBody = {
    name: shopGroupName
  };
  return axios.post(SUPPLY_GROUP_URL, requestBody).then(resp => {
    return resp.data;
  });
};

export const getSupplyShopList = async (page = 0) => {
  if (page === 0) {
    return axios.get(SUPPLY_SHOP_URL).then(resp => {
      return resp.data;
    });
  }
};

export const postSupplyShop = async (
  shopGroupId,
  shopName,
  shopDetail,
  shopUrl,
  shopCountryCode,
  shopSubdivisionCode
) => {
  const requestBody = {
    group: shopGroupId,
    name: shopName,
    detail: shopDetail,
    url: shopUrl,
    country: shopCountryCode,
    subdivision: shopSubdivisionCode
  };
  return axios.post(SUPPLY_SHOP_URL, requestBody).then(resp => {
    return resp.data;
  });
};
