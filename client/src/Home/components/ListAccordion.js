import React, {useState} from "react";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { deletePassword } from '../../store/actions'
import Swal from 'sweetalert2'
import EditForm from './EditForm'

export function ListAccordion(props) {

  const { data } = props
  const [editInfo, setEditInfo] = useState({})
  const [editPassword, setEditPassword] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [passwordId, setPasswordId] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  const handleDelete = id => {
    dispatch(deletePassword(id))
    
  };
  const toggleModal = (url, id, password, username) => {
    let info = {
      url, id, password, username
    }
    setEditInfo(info)
    setShow(true)
  }



  return (
    <Accordion>
        {data.length > 0 &&
        data.map(password => {
          return (
          <>
           <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={password.id}>
                {password.url}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={password.id}>
              <Card.Body>  <span className="text-blue-500 block mb-2">
                  username: {password.username}{" "}
                </span>
                <span
                className="text-blue-500 block mb-2">
                  password: {password.password}{" "}
                </span>
                <button role="button" data-testid={"delete-button-" + password.id}
                  onClick={() => handleDelete(password.id)}
                  className="px-2 py-2 bg-red-400 text-white rounded"
                >
                  Delete
                </button>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => toggleModal(password.url, password.id, password.password, password.username)} >
                  Edit {password.url}
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Password </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditForm info={ editInfo } >
                    </EditForm>
                  </Modal.Body>
                </Modal></Card.Body>
            </Accordion.Collapse>
          </Card>
          </>
          )})}
    </Accordion>
  );
}

export default ListAccordion;
