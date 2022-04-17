import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Edit() {
  const [data, setData] = useState(window.history.state.usr);
  const [loadData, setLoadData] = useState(false);
  const responseDataEvent = (response) => {
    alert(response.data.message);
    response.status === 200 && setLoadData(true);
  };
  const submit = (event) => {
    event.preventDefault();

    axios
      .put(
        `http://localhost:3001/pets/${window.history.state.usr.pet_id}`,
        data
      )
      .then((res) => responseDataEvent(res));
  };
  return (
    <div style={{ display: "block" }}>
      <form onSubmit={submit} id="form">
        <label>
          İsim:
          <input
            onChange={(e) => {
              setData({ ...data, pet_name: e.target.value });
            }}
            defaultValue={window.history.state.usr?.pet_name}
            type="text"
          />
        </label>
        <label>
          Tür:
          <input
            onChange={(e) => {
              setData({ ...data, pet_genus: e.target.value });
            }}
            defaultValue={window.history.state.usr?.pet_genus}
            type="text"
          />
        </label>
        <label>
          Cinsiyet:
          <input
            onChange={(e) => {
              setData({ ...data, pet_sex: e.target.value });
            }}
            defaultValue={window.history.state.usr?.pet_sex}
            type="text"
          />
        </label>
        <label>
          Ağırlık:
          <input
            onChange={(e) => {
              setData({ ...data, pet_weight: e.target.value });
            }}
            defaultValue={window.history.state.usr?.pet_weight}
            type="text"
          />
        </label>
        <label>
          Yaş:
          <input
            onChange={(e) => {
              setData({ ...data, pet_age: e.target.value });
            }}
            defaultValue={window.history.state.usr?.pet_age}
            type="text"
          />
        </label>
        <label>
          İç Parazit Aşısı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineIP: !data.vaccineIP });

            }}
            checked={data.vaccineIP}
            type="checkbox"
          />
        </label>
        <label>
          Dış Parazit Aşısı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineEP: !data.vaccineEP });
            }}
            checked={data.vaccineEP}
            type="checkbox"
          />
        </label>
        <label>
          Karma Aşı:
          <input
            onChange={(e) => {
              setData({ ...data, vaccineMixed: !data.vaccineMixed});
            }}
            checked={data.vaccineMixed}
            type="checkbox"
          />
        </label>
        <button
        form = "form"
          className="button submit"
          onClick={() => submit()}
          style={{ cursor: "pointer" }}
        >
          Kaydet
          {loadData &&  <Navigate replace to="/" />}
        </button>
      </form>
    </div>
  );
}

export default Edit;
