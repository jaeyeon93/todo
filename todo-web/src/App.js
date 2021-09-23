import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Card, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {map} from 'lodash';
import {SERVER_URL} from "./constant";
import {EditPopup} from "./component/EditPopup";
import {DeletePopup} from "./component/DeletePopup";
import {Popup} from "./component/Popup";

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [activeTodo, setActiveTodo] = useState();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const [popupState, setPopupState] = useState({
    isEdit: true,
    isShowPopup: false,
  })


  const getTodos = async () => {
    const result = await axios.get(`${SERVER_URL}/todos`).catch((e) => {
      console.log(e);
    });
    if (result && result.status === 200) {
      setTodos(result.data);
    }
  }

  const postTodos = async () => {
    const result = await axios.post(`${SERVER_URL}/todos`, {title: input}).catch((e) => {
      console.log(e);
    })
    if (result && result.status === 200) {
      setTodos(result.data);
      setInput('');
    }
  }

  const deleteTodo = async (id) => {
    const result = await axios.delete(`${SERVER_URL}/todos/${id}`).catch((e) => {
      console.log(e);
    })
    if (result && result.status === 200) {
      setTodos(result.data);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="App">
      <h1>Todo app</h1>
      <div className={'mb-3'}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Todo 등록하는곳</Form.Label>
            <Form.Control type="text" placeholder="Enter Todo"
                          onChange={(e) => setInput(e.target.value)} value={input}/>
          </Form.Group>

          <Button onClick={() => postTodos()} variant="primary" type="submit">
            Todo 등록하기
          </Button>
        </Form>
      </div>
      {todos && map(todos, (item) => <>
        <Card>
          <Card.Body>
            <Card.Title>{item?.title}</Card.Title>
            <Button variant="primary" onClick={() => {
              // setActiveTodo(item);
              // setIsShowEdit(true);
              setPopupState({
                isEdit: true,
                isShowPopup: true,
              })
              // setIsShowPopup(true);
              setActiveTodo(item);
            }}>수정</Button>
            <Button className={"m-1"} variant="danger"
                    onClick={() => {
                      // deleteTodo(item?.id) // 바로 삭제
                      // setActiveTodo(item);
                      // setIsShowDelete(true);
                      // setIsShowPopup(true);
                      // setIsEdit(false);
                      setActiveTodo(item);

                      setPopupState({
                        isEdit: false,
                        isShowPopup: true,
                      })
                    }}>삭제</Button>
          </Card.Body>
        </Card>
      </>)}
      {/*{isShowEdit &&*/}
      {/*<EditPopup setIsShowEdit={setIsShowEdit} item={activeTodo} setTodos={setTodos} />}*/}
      {/*{isShowDelete &&*/}
      {/*  <DeletePopup item={activeTodo} setIsShowDelete={setIsShowDelete} setTodos={setTodos} />}*/}

      {popupState.isShowPopup && <Popup setTodos={setTodos} isEdit={popupState.isEdit} setIsShowPopup={setIsShowPopup} item={activeTodo} />}
    </div>
  );
}

export default App;
