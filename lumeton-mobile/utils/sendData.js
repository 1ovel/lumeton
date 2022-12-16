import axios from "axios";

const url = "https://mighty-spoons-cry-93-106-151-171.loca.lt"

const sendPhoto = async (uri, filename, type) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  let form = new FormData();
  form.append("file", { uri: uri, name: filename, type: type });

  try {
    const photoUrl = await axios.post(
      url + "/api/image",
      form,
      config
    );

    return photoUrl.data;
  } catch (e) {
    console.log(e.message);
  }
};

const sendLoca = async (loca) => {
  const config = { headers: { "content-type": "application/json" } };
  return await axios.post(
    url + "/api/loca",
    loca,
    config
  );
};

export { sendPhoto, sendLoca };
