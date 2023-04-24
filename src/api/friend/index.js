import request from "../../utils/request.js";

export function getList() {
  return request({
    url: "/friend/list",
    method: "get",
  });
}

export function addApply(data) {
  return request({
    url: "/friend/add",
    method: "post",
    data: data,
  });
}

export function getApplys() {
  return request({
    url: "/friend/getApplications",
    method: "get",
  });
}

export function agreeFriend(data) {
  return request({
    url: "/friend/agree",
    method: "post",
    data: data,
  });
}
