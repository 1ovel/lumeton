import axios from "axios";

const sendPhoto = async (photo) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  let form = new FormData();
  form.append("file", photo);
	
  try {
    console.log(form._parts);
    const photoUrl = await axios.post(
      "https://silent-lemons-lick-93-106-187-207.loca.lt/api/image",
      form,
      config
    );

    return photoUrl;
  } catch (e) {
    console.log(e.message);
  }
  // return photourl;
};

const sendLoca = async (loca) => {
  return await axios.post(
    "https://silent-lemons-lick-93-106-187-207.loca.lt/api/loca",
    loca
  );
};

export { sendPhoto, sendLoca };
