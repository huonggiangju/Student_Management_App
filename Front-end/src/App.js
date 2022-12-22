import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./components/StudentList";
import NotFound from "./components/NotFound";
import AddStudent from "./components/AddStudent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'
function App(){
  return(
    <Router>
      <div>
       <Header></Header>
        <Routes>
          <Route exact path="/" element={<StudentList/>}></Route>
          <Route exact path="/add" element={<AddStudent/>}></Route>
          <Route exact path="/student/edit/:id" element={<AddStudent/>}></Route>
        
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  )
  
}
export default App;