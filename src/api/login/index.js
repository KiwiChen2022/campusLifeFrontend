import request from "../../utils/request.js";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data: data,
  });
}
