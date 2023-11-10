import React, { useState } from "react";
import "../assets/css/EditModal.css";
import axios from "axios";

const EditModal = ({
  selectedStudent,

  setShowEditForm,
  didUpdate,
  setDidUpdate,
}) => {
  const [stdNumber, setStdNumber] = useState(selectedStudent.studentsNumber);
  const [stdName, setStdName] = useState(selectedStudent.name);
  const [stdSurname, setStdSurname] = useState(selectedStudent.surname);
  const [stdClass, setStdClass] = useState(selectedStudent.studentsClass);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      stdNumber === "" ||
      stdName === "" ||
      stdSurname === "" ||
      stdClass === ""
    ) {
      alert("Bütün alanlar zorunludur.");
      return;
    }

    const updatedStudent = {
      ...selectedStudent,
      id: stdNumber,
      name: stdName,
      surname: stdSurname,
      studentsClass: stdClass,
    };
    axios
      .put(
        `http://localhost:3004/students/${selectedStudent.id}`,
        updatedStudent
      )
      .then((response) => {
        setShowEditForm(false);
        setDidUpdate(!didUpdate);
      })
      .catch((error) => {
        console.log("Öğrenci Güncelleme Hatası", error);
      });
  };

  return (
    <div className="main">
      <div className="modalMain">
        <h4>Edit Modal</h4>
        <form onSubmit={handleSubmit} className="w-50">
          <div className="mb-3">
            <label htmlFor="studentsNumber" className="form-label">
              Student Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="studentsNumber"
              value={stdNumber}
              onChange={(event) => setStdNumber(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={stdName}
              onChange={(event) => setStdName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Surname:
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              value={stdSurname}
              onChange={(event) => setStdSurname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="class" className="form-label">
              Class:
            </label>
            <input
              type="text"
              className="form-control"
              id="class"
              value={stdClass}
              onChange={(event) => setStdClass(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setShowEditForm(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
