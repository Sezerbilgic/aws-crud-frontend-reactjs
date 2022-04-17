import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function List() {
  const [data, setData] = useState();
  const [redirectNew, setRedirectNew] = useState(false);
  const [redirectEdit, setRedirectEdit] = useState(false);
  const [navigateData, setNavigateData] = useState();

  useEffect(() => {
    getPets();
  }, []);

  const getPets = () => {
    axios.get(`http://localhost:3001/pets`).then((res) => {
      const pets = res.data;
      setData(pets);
    });
  };

  const remove = (id) => {
    axios.delete(`http://localhost:3001/pets/${id}`).then(() => getPets());
  };

  return (
    <div style={{ display: "block" }}>
      <table>
        <tr>
          <th>İsim</th>
          <th>Tür</th>
          <th>Cinsiyet</th>
          <th>Ağırlık</th>
          <th>Yaş</th>
          <th>İç Parazit Aşısı</th>
          <th>Dış Parazit Aşısı</th>
          <th>Karma Aşı</th>
          <th></th>
        </tr>
        {data?.data?.map((x) => (
          <tr>
            <td key={x.pet_id}>{x.pet_name}</td>
            <td key={x.pet_id}>{x.pet_genus}</td>
            <td key={x.pet_id}>{x.pet_sex}</td>
            <td key={x.pet_id}>{x.pet_weight}</td>
            <td key={x.pet_id}>{x.pet_age}</td>
            <td key={x.pet_id}><input type="checkbox" checked={x.vaccineIP}/></td>
            <td key={x.pet_id}><input type="checkbox" checked={x.vaccineEP}/></td>
            <td key={x.pet_id}><input type="checkbox" checked={x.vaccineMixed}/></td>
            <td>
              <div
                id={x.pet_id}
                onClick={(e) => {
                  setRedirectEdit(true);

                  setNavigateData(
                    data.data.find((y) => y.pet_id === e.target.id)
                  );
                }}
                className="button"
              >
                Düzenle
                {redirectEdit && (
                  <Navigate replace to="/edit" state={navigateData} />
                )}
              </div>
              <div
                id={x.pet_id}
                onClick={(e) => {
                  remove(
                    data.data.find((y) => y.pet_id === e.target.id).pet_id
                  );
                }}
                className="button"
              >
                Sil
              </div>
            </td>
          </tr>
        ))}
      </table>
      <div
        className="button submit"
        onClick={() => setRedirectNew(true)}
        style={{ cursor: "pointer" }}
      >
        Yeni Kayıt
        {redirectNew && <Navigate replace to="/new" state={navigateData} />}
      </div>
    </div>
  );
}

export default List;
