import request from "../../utils/request.js";

export function getUser() {
  return request({
    url: "/user",
    method: "get",
  });
}

export function getUserByUserName(data) {
  return request({
    url: "/user/getUserByUserName",
    method: "get",
    params: data,
  });
}

export function updateUser(data) {
  return request({
    url: "/user/updateInfo",
    method: "post",
    data,
  });
}
