import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function IntegratedDictionaryOpener()
{
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [url, setUrl] = useState("")

  const handleSubmit = (event) =>
  {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!form.checkValidity())
    {
      setValidated(true);
    }
    else
    {
      const newUrl = "http://japdictapi.herokuapp.com/integrated-dictionary/" +
        (url.toLowerCase().startsWith("http://") || url.toLowerCase().startsWith("https://") ? url : "http://" + url)
      window.open(newUrl)
      setUrl("")
      setValidated(false)
      setIsModalVisible(false)
    }
  };

  return (
    <>
      <Button size="sm" variant="outline-secondary" onClick={() => setIsModalVisible(true)}>統合辞書</Button>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)} >
        <Modal.Header closeButton>
          <Modal.Title>統合辞書</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Modal.Body>
            <Form.Group controlId="url">
              <Form.Control type="text" placeholder="Urlを入力して下さい" required value={url} onChange={(e) => setUrl(e.target.value)} />
            </Form.Group>
            {/* <Modal.Footer> */}
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button variant="primary" type="submit" >移動</Button>
            </div>
            {/* </Modal.Footer> */}
          </Modal.Body>
        </Form>
      </Modal></>
  )
}