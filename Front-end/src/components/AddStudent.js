import { useState, useEffect } from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import studentService from "../service/student.service";
const AddStudent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    

    const saveStudent = (e)=>{
        e.preventDefault();
        const student = {firstName, lastName, age, email, id};

        if(id){
            
            //update records
            studentService.update(id, student)
                .then(response =>{
                    console.log('Student updated successfully', response.data);
                    navigate('/');
                })
                .catch(error =>{
                    console.log('something went wrong', error);
                });
        }else{
            // create new record
            studentService.create(student)
            .then(response =>{
                console.log('Student added successfully', response.data)
                navigate('/');
            })
            .catch(error => {
                console.log('something went wrong', error);
            });
        }

    }

    //get id
    useEffect(() =>{
        // if(id){
            studentService.getById(id)
                .then((response) =>{
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setAge(response.data.age);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.log('something went wrong23', error.response);
                });
        // }
    });

    //changing title
    const title=()=>{
        if(id){
            return <h3 className="text-center">Update New Student</h3>
        }else{
            return <h3 className="text-center">Add New Student</h3>
        }
    }

    return ( 
        <div className="container  ">
            <div className="row">
                 
                {
                    title()
                }
                <hr/>
                <div className="col-lg-6 col-md-6 col-sm-6 container justify-content-center ">
                    <form>
                        <div className="mb-3">
                            <input type = 'text'
                                    className="form-control col-6"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter FirstName"/>
                        </div>
                        <div className="mb-3">
                            <input type = 'text'
                                    className="form-control col-4"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter LastName"/>
                        </div>
                        <div className="mb-3">
                            <input type = 'number'
                                    className="form-control col-4"
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Enter Age"/>
                        </div>
                        <div className="mb-3">
                            <input type = 'email'
                                    className="form-control col-4"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email"/>

                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    onClick={(e) => saveStudent(e)}>
                                ADD</button>
                        </div>
                    </form>
                    <Link to="/">Back to List</Link>
                </div>
            </div>
            
            
            
        </div>
     );
}
 
export default AddStudent;