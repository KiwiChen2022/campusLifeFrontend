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

export function updateUserImage(formData) {
  // const formData = new FormData();
  // formData.append("to", data.to);
  // formData.append("file", data.file);
  // formData.append("type", data.type);
  return request({
    url: "/user/image",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
