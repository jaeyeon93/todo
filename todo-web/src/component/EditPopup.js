import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import axios from 'axios';
import {SERVER_URL} from "../constant";


export const EditPopup = ({
                            item,
                            setIsShowEdit,
                            setTodos,
                          }) => {
  const [input, setInput] = useState(item?.title);

  const patchTodo = async (id) => {
    const result = await axios.patch(`${SERVER_URL}/todos/${id}`, {
      title: input
    })
    if (result && result.status === 200) {
      setTodos(result.data);
      setIsShowEdit(false);
    }
  }

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>TODO 수정하기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control type="text" placeholder="Edit Todo"
                        onChange={(e) => setInput(e.target.value)} value={input}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowEdit(false)}>닫기</Button>
          <Button variant="primary" onClick={() => patchTodo(item?.id)}>수정</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  )
}
