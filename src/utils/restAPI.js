/* eslint-disable class-methods-use-this */
import axios from 'axios';

class EasyAxios {
  getUserInAuth = () =>
  localStorage.getItem('accessToken') !== undefined
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null;

  getHeader = () => {
    const userInAuth = this.getUserInAuth();
    return {
      'Content-type': 'application/json',
      authorization: userInAuth ? `Bearer ${userInAuth}` : null,
    };
  };

  getHeaderImg = () => {
    const userInAuth = this.getUserInAuth();
    return {
      'Content-Type': `multipart/form-data`,
      authorization: userInAuth ? `Bearer ${userInAuth}` : null,
    };
  };

  // make a http get request
  async get(url) {
    const get = await axios.get(url, {
      headers: this.getHeader(),
    });
    return get;
  }

  // make a http post request
  async post(url, data) {
    const post = await axios.post(url, data, { headers: this.getHeader() });
    return post;
  }
  
  async postImg(url, data) {
    const post = await axios.post(url, data, { headers: this.getHeaderImg() });
    return post;
  }

  // Make an http PUT Request
  async put(url, data) {
    const put = await axios.put(url, data, { headers: this.getHeader() });
    return put;
  }
  
  async patch(url, data) {
    const patch = await axios.patch(url, data, { headers: this.getHeader() });
    return patch;
  }
  
  async putImg(url, data) {
    const put = await axios.put(url, data, { headers: this.getHeaderImg() });
    return put;
  }

  //make a http Patch Request
  // async patch(url, data) {
  //   console.log("data for updating",url)
  //   try{

  //     const patch = await axios.patch(url, data, { headers: this.getHeader() });
  //     return patch;
  //   }
  //   catch(e){
  //     console.log("error updating",e)
  //   }
  // }

  // delete request
  async delete(url) {
    const deleteReq = await axios.delete(url, { headers: this.getHeader() });
    return deleteReq;
  }
}

const http = new EasyAxios();
export default http;
