import { useEffect, useState } from "react";
import PreLoader from "./components/preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  //state
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    let currentTodo =
      currentId !== 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "" };

    setTodo(currentTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await readTodos();

      // console.log(result);
      setTodos(result);
    };
    fetchTodos();
  }, [currentId]);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodo(todo);
      setTodos([...todos, result]);
      console.log(result);
      clear();
    } else {
      await updateTodo(currentId, todo);
      clear();
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const result = await readTodos();

    // console.log(result);
    setTodos(result);
  };
  return (
    <div className="container">
      <div className="row">
        <pre> {JSON.stringify(todo)} </pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                value={todo.title}
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input
                value={todo.content}
                id="icon_telephone"
                type="tel"
                className="validate"
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="icon_telephone">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn"> Submit </button>
          </div>
        </form>
        {!todos ? (
          <PreLoader />
        ) : todos.length > 0 ? (
          <div className="collection">
            {todos.map((todo) => {
              return (
                <ul className="collection with-header" key={todo._id}>
                  <li
                    className="collection-item"
                    onClick={() => setCurrentId(todo._id)}
                  >
                    <div>
                      <h4> {todo.title} </h4>
                      <p>
                        {todo.content}

                        <a
                          href="#!"
                          className="secondary-content"
                          onClick={() => removeTodo(todo._id)}
                        >
                          <i className="material-icons">delete</i>
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        ) : (
          <div>
            {" "}
            <h4> Nothing todos </h4>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
