import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const AppFunction = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [className, setClassName] = useState("");

    const [firstNameEditValue, setFirstNameEditValue] = useState("");
    const [lastNameEditValue, setLastNameEditValue] = useState("");
    const [emailEditValue, setEmailEditValue] = useState("");
    const [classNameEditValue, setClassNameEditValue] = useState("");

    const [inputError, setInputError] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingStudentId, setEditingStudentId] = useState("");

    const handleOnChangeFirstName = (e) => {
        const { value } = e.target;
        setFirstName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeLastName = (e) => {
        const { value } = e.target;
        setLastName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeEmail = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeClassName = (e) => {
        const { value } = e.target;
        setClassName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const addStudent = (e) => {
        e.preventDefault();

        if (
            firstName.length <= 1 ||
            lastName.length <= 1 ||
            email.length <= 1 ||
            className.length <= 1
        ) {
            setInputError(true);
        }

        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            className
        };

        setStudents((prevStudents) => {
            const copyStudents = [...prevStudents, newStudent];
            return copyStudents;
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setClassName("");
    };

    const deleteStudent = (studentId) => {
        setStudents((prevStudents) => {
            const keptStudents = prevStudents.filter((student) => {
                return student.id !== studentId;
            });
            return keptStudents;
        });
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingStudentId(null);
    };

    const handleFirstNameEdit = (e) => {
        setFirstNameEditValue(e.target.value);
    };

    const handleLastNameEdit = (e) => {
        setLastNameEditValue(e.target.value);
    };

    const handleEmailEdit = (e) => {
        setEmailEditValue(e.target.value);
    };

    const handleClassNameEdit = (e) => {
        setClassNameEditValue(e.target.value);
    };

    const editStudent = (studentId) => {
        setShowEditModal(true);

        let firstName = "";
        let lastName = "";
        let email = "";
        let className = "";

        for (const student of students) {
            if (student.id === studentId) {
                firstName = student.firstName;
                lastName = student.lastName;
                email = student.email;
                className = student.className;
                break;
            }
        }

        setFirstNameEditValue(firstName);
        setLastNameEditValue(lastName);
        setEmailEditValue(email);
        setClassNameEditValue(className);
        setEditingStudentId(studentId);
    };

    const submitEdit = () => {
        setStudents((prevStudents) => {
            const updatedStudents = prevStudents.map((student) => {
                if (student.id === editingStudentId) {
                    const copy = {
                        ...student,
                        firstName: firstNameEditValue,
                        lastName: lastNameEditValue,
                        email: emailEditValue,
                        className: classNameEditValue
                    };
                    return copy;
                }
                return student;
            });
            return updatedStudents;
        });
        setShowEditModal(false);
    };

    return (
        <main>
            <h1>Students Enrollment Form</h1>
            <form onSubmit={addStudent}>
                <div className="form-control">
                    <label for="firstName">Student First Name: </label>
                    <input
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        onChange={handleOnChangeFirstName}
                        value={firstName}
                    />

                    <label for="lastName">Student Last Name: </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        onChange={handleOnChangeLastName}
                        value={lastName}
                    />

                    <label for="email">Student Email: </label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleOnChangeEmail}
                        value={email}
                    />

                    <label for="className">Class: </label>
                    <select
                        id="className"
                        value={className}
                        onChange={handleOnChangeClassName}
                    >
                        <option value="">Select Class</option>
                        <option value="Algebra">Algebra</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Literature">Literature</option>
                    </select>

                    <input type="submit" value="Submit"></input>

                    {inputError && (
                        <span className="error-message">Invalid Input!</span>
                    )}
                </div>
            </form>

            <table id="studentsTable">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="students">
                    {students &&
                        students.length >= 1 &&
                        students.map((student) => {
                            return (
                                <tr key={student.id} className="student">
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.className}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteStudent(student.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                editStudent(student.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-icon" onClick={closeEditModal}>
                            &times;
                        </span>
                        <h2>Edit Student Data</h2>
                        <label for="editingFirstName">
                            Student First Name:
                        </label>
                        <input
                            id="editingFirstName"
                            type="text"
                            value={firstNameEditValue}
                            onChange={handleFirstNameEdit}
                        />
                        <br />
                        <label for="editingLastName">Student Last Name:</label>
                        <input
                            id="editingLastName"
                            type="text"
                            value={lastNameEditValue}
                            onChange={handleLastNameEdit}
                        />
                        <br />
                        <label for="editingemail">Student Email: </label>
                        <input
                            id="editingEmail"
                            type="email"
                            value={emailEditValue}
                            onChange={handleEmailEdit}
                        />
                        <br />
                        <label for="editingClassName">Class: </label>
                        <select
                            id="editingClassName"
                            value={classNameEditValue}
                            onChange={handleClassNameEdit}
                        >
                            <option value="">Select Class</option>
                            <option value="Algebra">Algebra</option>
                            <option value="Geometry">Geometry</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Literature">Literature</option>
                        </select>
                        <br />
                        <button className="save-btn" onClick={submitEdit}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AppFunction;
