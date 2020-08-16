import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ArticleForm = ({ history }) => {
  const initialState = { title: "", text: "" };
  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    // prevent HTML default submission
    e.preventDefault();

    // POST request to RESTful route (to be defined in backend)
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          // let the user know that it went trough
          alert("Article successfully created");
          // when we get confirmation we can reset the form to its original state (empty)
          return response.json().then((article) => {
            history.push(`/articles/${article._id}`);
          });
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of your article..."
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Text for your article..."
            required={true}
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ArticleForm;
