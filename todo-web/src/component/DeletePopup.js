import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {SERVER_URL} from "../constant";
export const DeletePopup = ({
                              item,
                              setIsShowDelete,
  setTodos
                            }) => {

  const deleteTodo = async () => {
    const result = await axios.delete(`${SERVER_URL}/todos/${item?.id}`).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result && result.status === 200) {
      setIsShowDelete(false);
      setTodos(result.data);
    }
  }

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>TODO 삭제하기</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowDelete(false)}>닫기</Button>
          <Button variant="primary" onClick={() => deleteTodo()}>삭제</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  )
}
