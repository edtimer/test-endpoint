const dataUrlToFile = (url, fileName) => {
    const [mediaType, data] = url.split(",");
  
    const mime = mediaType.match(/:(.*?);/)?.[0];
  console.log(mime)
    let n = data.length;
  
    const arr = new Uint8Array(n);
  
    while (n) {
        n-=1
      arr[n] = data.charCodeAt(n);
    }
  
    return new File([arr], fileName, { type: "image/png" });
  };
  export default dataUrlToFile