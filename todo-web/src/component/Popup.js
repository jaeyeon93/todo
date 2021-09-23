import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {SERVER_URL} from "../constant";
import {useState} from "react";


export const Popup = ({
  isEdit,
  setIsShowPopup,
  setTodos,
  item
                      }) => {

  const [input, setInput] = useState(item?.title);

  const patchTodo = async (id) => {
    const result = await axios.patch(`${SERVER_URL}/todos/${id}`, {
      title: input
    })
    if (result && result.status === 200) {
      setTodos(result.data);
      setIsShowPopup(false);
    }
  }

  const deleteTodo = async (id) => {
    const result = await axios.delete(`${SERVER_URL}/todos/${id}`).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result && result.status === 200) {
      setIsShowPopup(false);
      setTodos(result.data);
    }
  }

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{isEdit ? 'TODO 수정하기222' : 'TODO 삭제하기222'}</Modal.Title>
        </Modal.Header>

        {isEdit && (
          <Modal.Body>
            <Form.Control type="text" placeholder="Edit Todo"
                          onChange={(e) => setInput(e.target.value)} value={input}/>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowPopup(false)}>닫기</Button>
          <Button variant="primary" onClick={() => {
            if (isEdit) {
              patchTodo(item?.id);
            } else {
              deleteTodo(item?.id);
            }
          }}>{isEdit ? '수정' : '삭제'}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  )
}
