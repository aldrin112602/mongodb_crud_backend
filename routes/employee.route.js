const express = require("express");
const Employee = require("../models/employee.model.js");
const router = express.Router();
const { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee.controller.js');


router.get('/', getEmployees);
router.get("/:id", getEmployee);

router.post("/", createEmployee);

// update a Employee
router.put("/:id", updateEmployee);

// delete a Employee
router.delete("/:id", deleteEmployee);




module.exports = router;