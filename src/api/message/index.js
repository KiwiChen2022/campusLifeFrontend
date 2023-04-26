import request from "../../utils/request.js";

export function list(data) {
  return request({
    url: "/message/list",
    method: "get",
    params: data,
  });
}

export function addMessage(data) {
  return request({
    url: "/message/add",
    method: "post",
    data: data,
  });
}

export function addFile(data) {
  const formData = new FormData();
  formData.append("to", data.to);
  formData.append("file", data.file);
  formData.append("type", data.type);

  return request({
    url: "/message/addImg",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
