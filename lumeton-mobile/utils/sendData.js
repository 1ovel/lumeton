import axios from "axios";

const sendPhoto = async (photo) => {
  const form = new FormData();
  form.append("file", photo);
  try {
    const photoUrl = await axios.post("127.0.0.1:8000/api/image", form);

    return photoUrl;
  } catch (e) {
    console.log(e.message);
  }
  // return photourl;
};

const sendLoca = async (loca) => {
  return await axios.post("127.0.0.1:8000/api/loca", loca);
};

export { sendPhoto, sendLoca };
