import "./App.css";
import { useState } from "react";
import { Button, Container, Form, ListGroup, Navbar } from "react-bootstrap";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("Please enter a title for the to-do item.");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id, newTitle, newDescription) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
        todo.description = newDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    handleEdit(editingId, newTitle, newDescription);
    setNewTitle("");
    setNewDescription("");
    setEditingId(null);
  };

  return (
    <>
      <Navbar className="Navbar" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand className="text-white fw-bold fs-3">
            Todo List Application
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 mt-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Todo Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your todo task title here"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>
              <Button
                variant="btn text-white"
                style={{ background: "#008080" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <ListGroup className="mt-4">
              {todos.map((todo) => (
                <ListGroup.Item key={todo.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {todo.completed ? (
                        <del>{todo.title}</del>
                      ) : (
                        <span>{todo.title}</span>
                      )}
                      <div>
                        <small>{todo.description}</small>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        className="text-primary"
                        onClick={() => {
                          setEditingId(todo.id);
                          setNewTitle(todo.title);
                          setNewDescription(todo.description);
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant="link"
                        className="text-success"
                        onClick={() => handleComplete(todo.id)}
                      >
                        <FaCheck />
                      </Button>
                    </div>
                  </div>
                  {editingId === todo.id && (
                    <Form className="mt-3" onSubmit={handleUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={newTitle}
                          onChange={(event) => setNewTitle(event.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={newDescription}
                          onChange={(event) =>
                            setNewDescription(event.target.value)
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="btn text-white"
                        style={{ background: "#008080" }}
                        type="submit"
                        className="m-2"
                      >
                        Update
                      </Button>
                      <Button
                        className="m-2"
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </Form>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
      <footer>
        {/* <h3 className="footer">Application Develop by Usama Hafeez</h3> */}
        <Navbar className="Navbar " fixed="bottom" expand="lg">
          <Container>
            <Navbar.Brand className="text-white fw-bold fs-4 ">
              Application Develop by Usama 
            </Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    </>
  );
}

export default App;
