package com.example.demo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/student")
public class Controller {

	@Autowired
	private StudentRepository repo;
	

	@PostMapping("/add")
	public String save(@RequestBody Student s) {
		repo.save(s);
		return "Add Student with id " +s.getFirstName();
	}
	
	
	@GetMapping("/list")
	public ResponseEntity<List<Student>> listAll(){
		List<Student> listStudent = repo.findAll();
		
		if(listStudent.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<>(listStudent, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Student> getAccountById(@PathVariable("id") String id) {
		try {
			Student s = repo.findById(id).get();
			return new ResponseEntity<>(s, HttpStatus.OK);
			
		}catch(NoSuchElementException ex) {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<HttpStatus> deleteStudent (@PathVariable("id") String id){
		try {
			
			repo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			
		}catch(NoSuchElementException ex) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable("id") String id,  
												@RequestBody Student s){
							
		try {
			Student  updateStudent =  repo.findById(id).get();
			
			updateStudent.setFirstName(s.getFirstName());
			updateStudent.setLastName(s.getLastName());
			updateStudent.setAge(s.getAge());
			updateStudent.setEmail(s.getEmail());
			
			 repo.save(updateStudent);
			return ResponseEntity.ok(updateStudent);
		}catch(NoSuchElementException ex) {
			return ResponseEntity.notFound().build();
		}
		
	}
}
