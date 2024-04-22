const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter employee name"],
        },

        gender: {
            type: String,
            required: [true, "Please enter employee gender"],
        },

        position: {
            type: String,
            required: [true, "Please enter employee position"],
        },

        address: {
            type: String,
            required: [true, "Please enter employee address"],
        },

        salary: {
            type: Number,
            required: [true, "Please enter employee salary"],
        },

        profile: {
            type: String,
            required: false,
        },

    },
    {
        timestamps: true,
    }
);


const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;