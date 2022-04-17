import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Create() {
  const [data, setData] = useState();
  const [file, setFile] = useState();
  const [loadImage, setLoadImage] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const responseImageEvent = (response) => {
    alert(response.data.message);
    response.status === 200 && setLoadImage(true);
  };
  const responseDataEvent = (response) => {
    alert(response.data.message);
    response.status === 200 && setLoadData(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    await axios
      .post("http://localhost:3001/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => responseImageEvent(res));
    await axios
      .post("http://localhost:3001/pets/data", {...data,pet_id:Math.floor(Math.random()*100).toString()})
      .then((res) => responseDataEvent(res));
  };
  const fileSelected = (event) => {
    const files = event.target.files[0];
    setFile(files);
  };
  return (
    <div style={{ display: "block" }}>
      <form onSubmit={submit} id="formCreate">
        <label>
          Resim:
          <input
            onChange={(e) => fileSelected(e)}
            type="file"
            accept="image/*"
          />
        </label>
        <label>
          İsim:
          <input
            onChange={(e) => {
              setData({ ...data, pet_name: e.target.value });
            }}
            type="text"
          />
        </label>
        <label>
          Tür:
          <input
            onChange={(e) => {
              setData({ ...data, pet_genus: e.target.value });
            }}
            type="text"
          />
        </label>
        <label>
          Cinsiyet:
          <input
            onChange={(e) => {
              setData({ ...data, pet_sex: e.target.value });
            }}
            type="text"
          />
        </label>
        <label>
          Ağırlık:
          <input
            onChange={(e) => {
              setData({ ...data, pet_weight: e.target.value });
            }}
            type="text"
          />
        </label>
        <label>
          Yaş:
          <input
            onChange={(e) => {
              setData({ ...data, pet_age: e.target.value });
            }}
            type="text"
          />
        </label>
        <label>
          İç Parazit Aşısı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineIP: !data.vaccineIP });
            }}
            checked={data?.vaccineIP}
            type="checkbox"
          />
        </label>
        <label>
          Dış Parazit Aşısı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineEP: !data.vaccineEP });
            }}
            checked={data?.vaccineEP}
            type="checkbox"
          />
        </label>
        <label>
          Karma Aşı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineMixed: !data.vaccineMixed });
            }}
            defaultValue={data?.vaccineMixed}
            type="checkbox"
          />
        </label>
        <button
          className="button sumbit"
          form="formCreate"
          style={{ cursor: "pointer" }}
        >
          Kaydet
          {loadData && loadImage && <Navigate replace to="/" />}
        </button>
      </form>
    </div>
  );
}

export default Create;
