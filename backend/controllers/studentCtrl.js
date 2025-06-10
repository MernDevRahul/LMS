const Student = require('./../model/student');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');

// Function to generate student ID in format nameXXX (first 4 letters of name + 3 random numbers)
const generateStudentId = async (name) => {
    // Get first 4 letters of name, convert to uppercase, and pad with X if less than 4 chars
    const namePrefix = (name.replace(/[^a-zA-Z]/g, '').substring(0, 4) + 'XXXX').substring(0, 4).toUpperCase();
    
    // Generate a random 3 digit number
    let randomNum;
    let studentId;
    let existingStudent;
    
    // Keep trying until we find a unique combination
    do {
        randomNum = Math.floor(Math.random() * 900) + 100; // generates number between 100-999
        studentId = `${namePrefix}${randomNum}`;
        existingStudent = await Student.findOne({ studentId: studentId });
    } while (existingStudent);

    return studentId;
};

exports.createStudent = async(req,res)=>{
    // console.log(req.body);
    
    try {
        const email = req.body["Email id"]
        // console.log(email);
        
        const checkStudent = await Student.findOne({
            "Email id" : email
        })        
        if(checkStudent){
            res.status(409).send("student Already Exists");
            return;
        }

        // Generate unique student ID using student's name
        const studentId = await generateStudentId(req.body["Name"]);
        
        const {Password} = req.body;
        
        const salt = await bcrypt.genSalt(11);
        
        const hashedPassword = await bcrypt.hash(Password, salt);
        
        const studentToBeAdded = new Student({
            ...req.body,
            Password: hashedPassword,
            studentId: studentId
        })
        
        const student = await studentToBeAdded.save();
        
        res.status(200).send({student})
    } catch (error) {
        res.status(400).send(error)
    }
}

//--------------------------------------------------------------------------------
exports.getAllStudent = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            length: students.length,
            data: {
                students
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------

exports.getStudentById = async (req, res) => {
    try {
        const students = await Student.findOne()
        res.status(200).json({
            status: 'success',
            data: {
                students
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
};

//--------------------------------------------------------------------------------
exports.updateStudent = async (req, res) => {
    try {
        const testStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testStudent // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
}
//--------------------------------------------------------------------------------
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteStudent = await Student.findByIdAndDelete(id);
        if (!deleteStudent) {
          // If no students is found, respond with an error
          return res.status(404).json({ message: "students not found" });
        }
        // If the students is deleted, send a success response
        res.status(200).json({ message: "students deleted successfully", deleteStudent });
      } catch (error) {
        console.error("Error deleting students:", error);
        res.status(500).json({ message: "Failed to delete the students. Please try again." });
      }
}



exports.LoginStudent = async(req,res)=>{
    try {
        
      const student = await Student.findOne({"Email id":req.body['Email id']});
        // console.log(student);
        
      if(student){
        const verify = await bcrypt.compare(req.body['Password'],student.Password);
        if(verify){
            // console.log(verify);
            
            const token = jwt.sign({Email:student["Email id"], Role:student.Role},process.env.SECRET,{expiresIn:"10hr"})
            res.status(200).send({token,"Name":student["Name"],studentId:student["_id"]})
        }else{
          res.status(401).send("Wrong password")
        }
      }else{
        res.status(404).send("Student does not exists")
      }
    } catch (error) {
      console.log("Error is in Student login",error);
      
    }
}



// Add a batch ID to a student's batchIds array
exports.addBatchToStudent = async (req, res) => {
    try {
        const { studentId, batchId } = req.body; // Get student ID and batch ID from request body
        // console.log(req.body)

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if the batch ID already exists in batchIds
        if (student.batchIds.includes(batchId)) {
            return res.status(400).json({ message: "Batch ID already added" });
        }

        // Add the batch ID to the batchIds array
        student.batchIds.push(batchId);
        await student.save();

        res.status(200).json({ message: "Batch ID added successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// module.exports = { addBatchToStudent };

// const mongoose = require("mongoose");
// const Student = require("../models/Student");

exports.getStudentByBatchId = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if batchId is a valid ObjectId
        let objectIdBatchId;
        if (mongoose.Types.ObjectId.isValid(id)) {
            objectIdBatchId = new mongoose.Types.ObjectId(id);
        }

        // Find students where batchId exists in batchIds array (as ObjectId or String)
        const students = await Student.find({
            $or: [
                { batchIds: objectIdBatchId }, // If stored as ObjectId
                { batchIds: id } // If stored as String
            ]
        });
        
        // console.log(students);
        

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for this batch ID" });
        }

        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// module.exports = { getStudentsByBatchId };
