import axios from "axios";
import React, { useEffect, useState } from "react";
import EditModal from "./components/EditModal";

function App() {
  const [students, setStudents] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      studentNumber === "" &&
      name === "" &&
      surname === "" &&
      studentClass === ""
    ) {
      alert("Bütün alanlar doldurulmalıdır.");
      return;
    }
    const newStudent = {
      id: String(new Date().getTime()),
      studentsNumber: studentNumber,
      name: name,
      surname: surname,
      studentsClass: studentClass,
    };
    axios
      .post("http://localhost:3004/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent]);
        console.log(students);
        setStudentNumber("");
        setName("");
        setSurname("");
        setStudentClass("");
      })
      .catch((error) => {
        console.log("Yeni öğrenci ekleme hatası:", error);
      });
  };

  const handleDelete = (studentID) => {
    axios
      .delete(`http://localhost:3004/students/${studentID}`)
      .then((response) => {
        const filteredStudents = students.filter(
          (student) => student.id !== studentID
        );
        setStudents(filteredStudents);
        console.log(filteredStudents);
      })
      .catch((error) => {
        console.log("Öğrenci Silme Hatası", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Sayfa ilk yüklenirken verileri çekme hatası", error);
      });
  }, [didUpdate]);

  if (students === null) {
    return <h1>Loading...</h1>;
  }

  var filteredStudents = [];
  filteredStudents = students.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <nav
          className="navbar bg-primary text-white my-1 p-3 rounded-3 mb-5 w-75 m-auto justify-content-center "
          data-bs-theme="dark"
        >
          ÖĞRENCİ KAYIT SİSTEMİ
        </nav>
      </div>
      <div className="d-flex justify-content-center">
        {showForm === true && (
          <form onSubmit={handleSubmit} className="w-50">
            <div className="mb-3">
              <label htmlFor="studentsNumber" className="form-label">
                Student Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="studentsNumber"
                value={studentNumber}
                onChange={(event) => setStudentNumber(event.target.value)}
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
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
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
                value={studentClass}
                onChange={(event) => setStudentClass(event.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                type="button"
                className="btn btn-danger"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
      <div>
        <input
          class="form-control w-25"
          type="text"
          placeholder="find student..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Student Number</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Class</th>
              <th scope="col">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <th scope="row">{student.studentsNumber}</th>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.studentsClass}</td>
                <td>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setSelectedStudent(student);
                    }}
                    className="btn btn-sm btn-success"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-sm btn-primary my-3"
          >
            ADD STUDENT
          </button>
        </div>
      </div>
      <div>
        {showEditForm === true && (
          <EditModal
            selectedStudent={selectedStudent}
            setShowEditForm={setShowEditForm}
            didUpdate={didUpdate}
            setDidUpdate={setDidUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
