import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { deletePassword } from '../../store/actions'
import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap'
import EditForm from './EditForm'
export function ListPasswords(props) {
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
    <div data-testid="list-passwords" className="flex flex-wrap">
      {data.length > 0 &&
        data.map(password => {
          return (
            <div role="listitem" key={password.id} className="sm:w-1/4 p-2">
              <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
                <div className="mb-3">
                  <img className="w-auto mx-auto rounded-full" src="" alt="" />
                </div>
                <h2 className="text-xl font-medium text-gray-700">
                  url: {password.url}{" "}
                </h2>
                <span className="text-blue-500 block mb-2">
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
                </Modal>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ListPasswords;
