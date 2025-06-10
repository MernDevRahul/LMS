const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema({
  "First Name": {
    type: String,
    required: [true, 'Name is required'],
    default: "",
  },  
  "Last Name": {
    type: String,
    default: "",
  },
  "Email": {
    type: String,
    required: [true, 'Email is required'],
    default: "",
    unique: true,
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
    default: "Techstack@2024",
  },
  Phone: {
    type: String,
    required: [true, 'Phone number is required'],
    default: "",
  },
  Role: {
    type: String,
    required: [true, 'Role is required'],
    default: "",
  },
  Status: {
    type: String,
    default: 'active',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
