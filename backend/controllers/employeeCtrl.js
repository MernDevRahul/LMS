const Employee = require('./../model/employee');
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken");


// exports.createEmployee = async (req, res) => {   
//     try {
//         const testEmployee = await Employee.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 testEmployee
//             }
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: error.message
//         })
//     }
// };

exports.createEmployee = async (req, res) => {
    try {
      const checkEmployee = await Employee.findOne({
        Email: req.body.Email,
      });
      if (checkEmployee) {
        res.status(409).send("Email Already Exists");
        return;
      }
      const { Password } = req.body;
      const salt = await bcrypt.genSalt(11);
      const hashedPassword = await bcrypt.hash(Password, salt);
      const employeeToBeAdded = new Employee({
        ...req.body,
        Password: hashedPassword,
      });
      const employee = await employeeToBeAdded.save();
      res.send({ employee, msg: "Employee Created Successfully" });
    } catch (error) {
      console.log(error);
    }
  };


//--------------------------------------------------------------------------------
exports.getAllEmployee = async (req, res) => {
    try {
        const Employees = await Employee.find();
        res.status(201).json({
            status: 'success',
            length: Employees.length,
            data: {
                Employees
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getEmployee = async (req, res) => {

}
//--------------------------------------------------------------------------------

exports.updateEmployee = async (req, res) => {
  try {
      const { Password } = req.body;
      
      // If a password is provided, hash it before updating
      if (Password) {
          const salt = await bcrypt.genSalt(11); // Generate a salt
          const hashedPassword = await bcrypt.hash(Password, salt); // Hash the password

          // Update the password in the request body
          req.body.Password = hashedPassword;
      }

      // Update the employee with the new data
      // console.log(req.params.id);
      
      // console.log(req.body);
      
      const testEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body);
      // console.log(testEmployee);
      

      res.status(200).json({
          status: 'success',
          data: testEmployee // Return updated employee data
      });
  } catch (error) {
      res.status(400).json({
          status: 'fail',
          message: error.message // Send the error message in case of failure
      });
  }
};
//--------------------------------------------------------------------------------
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteEmployee = await Employee.findByIdAndDelete(id);
        if (!deleteEmployee) {
          // If no Employee is found, respond with an error
          return res.status(404).json({ message: "Employee not found" });
        }
        // If the Employee is deleted, send a success response
        res.status(200).json({ message: "Employee deleted successfully", deleteEmployee });
      } catch (error) {
        console.error("Error deleting Employee:", error);
        res.status(500).json({ message: "Failed to delete the Employee. Please try again." });
      }
}

// -------------------------------------------------------------------------------------

exports.loginEmployee = async (req, res) => {
  // console.log(req.body);
  
  try {
      const { Email, Password, Role } = req.body;
      const employee = await Employee.findOne({ Email: Email });
      // console.log(employee);
      

      if (!employee) {
          return res.status(404).send("Employee does not exist.");
      }

      // Check if the account is inactive or suspended
      if (employee.Status === "inactive" || employee.Status === "suspended") {
          return res.status(403).send(`Your account is ${employee.Status}. Please contact support.`);
      }

      const verify = await bcrypt.compare(Password, employee.Password);
      if (!verify) {
          return res.status(401).send("Wrong password.");
      }

      if (employee.Role !== Role) {
          return res.status(403).send(`You are not authorized as a ${Role}.`);
      }

      const token = jwt.sign({ Email, Role }, process.env.SECRET, { expiresIn: "10hr" });

      res.send({
          token,
          employeeId: employee._id,
          "First Name": employee["First Name"],
          "Last Name": employee["Last Name"],
          Role: employee.Role
      });

  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send("Internal server error.");
  }
};
