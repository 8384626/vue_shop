import axios from "axios";

axios.defaults.baseURL='http://www.ysqorz.top:8888/api/private/v1',
axios.defaults.timeout = 5000;

//请求数据拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//接收响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (
      response.data.status == 200 ||
      response.data.status == 201 ||
      response.data.status == 204 
    ) {
      return response.data;
    } else if (response.data.status == 401) {
      // 缺少授权信息
      sessionStorage.setItem("token", "");
      axios
        .post("/login")
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          setTimeout(() => {
            location.reload();
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    return response.data;
  },
  function (error) {
    let response = error.response;
    if (response) {
      const status = error.response.status;
      switch (status) {
        case 404:
          this.$message.error("请求地址不存在！");
          break;
        default:
          this.$message.error("服务异常！");
          break;
      }
    }
    return Promise.reject(error);
  }
);

let http = {
  get: (url, data) => {
    return new Promise((resolve, reject) => {
      if (typeof data === "object") {
        /*it goes in here when the user has added a data param when calling the get method*/
        axios({
          method: "GET",
          url,
          params: {
            ...data,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios({
          method: "GET",
          url,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      if (typeof data === "object") {
        /*it goes in here when the user has added a data param when calling the get method*/
        axios({
          method: "POST",
          url,
          data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios({
          method: "POST",
          url,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  put:(url, data) =>{
    return new Promise((resolve,reject)=>{
      if (typeof data === "object") {
        /*it goes in here when the user has added a data param when calling the get method*/
        axios({
          method: "PUT",
          url,
          data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios({
          method: "PUT",
          url,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    })
  },
  delete:(url, data) =>{
    return new Promise((resolve,reject)=>{
      if (typeof data === "object") {
        /*it goes in here when the user has added a data param when calling the get method*/
        axios({
          method: "DELETE",
          url,
          data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios({
          method: "DELETE",
          url,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    })
  }
  // upload: (url, data) => {
  //   return new Promise((resolve, reject) => {
  //     let file = new FormData();
  //     file.append("multipartFile", data);
  //     axios
  //       .post(url, file, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
};

export default http;