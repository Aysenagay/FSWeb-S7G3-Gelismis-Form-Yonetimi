import React from "react";

export default function KayitliKullanici(props) {
  const { kayitliKullanici } = props;
  return (
    <div className="RegisteredContainer">
      {kayitliKullanici.map((user) => (
        <ul className="Content">
          <li key="membername">Member Name: {user.name}</li>
          <li key="membername">Member Surname: {user.surname}</li>
          <li key="membermail">Member Email: {user.email}</li>
        </ul>
      ))}
    </div>
  );
}
