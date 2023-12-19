import React from "react";

import { v4 as uuid } from "uuid";

import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
            selectedStudent: {},
            firstName: "",
            lastName: "",
            email: "",
            className: "",

            inputError: false,
            showEditModel: false
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, className } = this.state;

        if (
            firstName.length <= 1 ||
            lastName.length <= 1 ||
            email.length <= 1 ||
            className.length <= 1
        ) {
            this.setState({
                inputError: true
            });
            return;
        }

        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            className
        };

        this.setState((prevState) => {
            const copyStudents = [...prevState.students, newStudent];
            return {
                students: copyStudents,
                firstName: "",
                lastName: "",
                email: "",
                className: ""
            };
        });
    };

    handleOnChangeFirstName = (e) => {
        const { value } = e.target;
        this.setState({
            firstName: value
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    handleOnChangeLastName = (e) => {
        const { value } = e.target;
        this.setState({
            lastName: value
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    handleOnChangeEmail = (e) => {
        const { value } = e.target;
        this.setState({
            email: value
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    handleOnChangeClassName = (e) => {
        const { value } = e.target;
        this.setState({
            className: value
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    deleteStudent = (studentId) => {
        this.setState((prevState) => {
            const keptStudents = prevState.students.filter((student) => {
                return student.id !== studentId;
            });
            return {
                students: keptStudents
            };
        });
    };

    openEditModal = (student) => {
        this.setState({
            showEditModel: true,
            selectedStudent: student
        });
    };

    closeEditModal = () => {
        this.setState({
            showEditModel: false,
            selectedStudent: null
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedStudents = prevState.students.map((student) =>
                student.id === this.state.selectedStudent.id
                    ? this.state.selectedStudent
                    : student
            );

            this.setState({
                students: updatedStudents,
                showEditModel: false,
                selectedStudent: null
            });
        });
    };

    render() {
        return (
            <main>
                <h1>Students Enrollment Form</h1>
                <form onSubmit={this.addStudent}>
                    <div className="form-control">
                        <label for="firstName">Student First Name: </label>
                        <input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            onChange={this.handleOnChangeFirstName}
                            value={this.state.firstName}
                        />

                        <label for="lastName">Student Last Name: </label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            onChange={this.handleOnChangeLastName}
                            value={this.state.lastName}
                        />

                        <label for="email">Student Email: </label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            onChange={this.handleOnChangeEmail}
                            value={this.state.email}
                        />

                        <label for="className">Class: </label>
                        <select
                            id="className"
                            value={this.state.className}
                            onChange={this.handleOnChangeClassName}
                        >
                            <option value="">Select Class</option>
                            <option value="Algebra">Algebra</option>
                            <option value="Geometry">Geometry</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Literature">Literature</option>
                        </select>

                        <input type="submit" value="Submit"></input>

                        {this.state.inputError && (
                            <span className="error-message">
                                Invalid Input!
                            </span>
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
                        {this.state.students.length >= 1 &&
                            this.state.students.map((student) => {
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
                                                    this.deleteStudent(
                                                        student.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    this.openEditModal(student)
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

                {this.state.showEditModel && (
                    <div className="modal">
                        <div className="modal-content">
                            <span
                                className="close-icon"
                                onClick={this.closeEditModal}
                            >
                                &times;
                            </span>
                            <h2>Edit Student Data</h2>
                            <label for="editingFirstName">
                                Student First Name:
                            </label>
                            <input
                                id="editingFirstName"
                                type="text"
                                value={this.state.selectedStudent.firstName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedStudent: {
                                            ...this.state.selectedStudent,
                                            firstName: e.target.value
                                        }
                                    })
                                }
                            />
                            <br />
                            <label for="editingLastName">
                                Student Last Name:
                            </label>
                            <input
                                id="editingLastName"
                                type="text"
                                value={this.state.selectedStudent.lastName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedStudent: {
                                            ...this.state.selectedStudent,
                                            lastName: e.target.value
                                        }
                                    })
                                }
                            />
                            <br />
                            <label for="editingemail">Student Email: </label>
                            <input
                                id="editingEmail"
                                type="email"
                                value={this.state.selectedStudent.email}
                                onChange={(e) =>
                                    this.setState({
                                        selectedStudent: {
                                            ...this.state.selectedStudent,
                                            email: e.target.value
                                        }
                                    })
                                }
                            />
                            <br />
                            <label for="editingClassName">Class: </label>
                            <select
                                id="editingClassName"
                                value={this.state.selectedStudent.className}
                                onChange={(e) =>
                                    this.setState({
                                        selectedStudent: {
                                            ...this.state.selectedStudent,
                                            className: e.target.value
                                        }
                                    })
                                }
                            >
                                <option value="">Select Class</option>
                                <option value="Algebra">Algebra</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Literature">Literature</option>
                            </select>
                            <br />
                            <button
                                className="save-btn"
                                onClick={this.submitEdit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
