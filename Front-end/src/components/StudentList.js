import { useEffect, useState } from "react";
import studentService from "../service/student.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const StudentList = () => {

  const [students, setStudent] = useState([]);

  useEffect(()=>{
    init();

  }, [])

  //list students
  const init = () =>{
    studentService.getAll()
    .then(response =>{
      console.log('Printing the student ', response.data);
      setStudent(response.data);
    })
    .catch(error => {
      console.log('something went wrong', error);
    })
  }

  //delete btn
  const handleDelete = id =>{
    studentService.remove(id)
        .then(response =>{
            console.log('Printing the student data', response.data);
            // setStudent(response.data);
            init();
        })
        .catch(error =>{
            console.log('something went wrong', error);
        })
  }

  return ( 
    <div className="container">
    
      <h3 className="text-center">List of Students</h3>
      <hr/>
      <div className="text-center">
            <Link to="/add" className="btn btn-primary mb-2 ">Add Student</Link>

          <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <td>Name</td>
                  <td>Age</td>
                  <td>Email</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
              {
                students.map(student => (
                  <tr key={student.id}>
                    <td>{student.firstName + " "+ student.lastName} </td>
                    <td>{student.age}</td>
                    <td>{student.email}</td>
                    <td>
                        <Link className="btn btn-info" 
                                to={`/student/edit/${student.id}`}>Update</Link>
                        <button className="btn btn-danger ml-2"
                                onClick={(e) => {
                                    handleDelete(student.id)}}
                            >Delete</button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
              
          </table>
      </div>

    </div>
   );
}
 
export default StudentList;