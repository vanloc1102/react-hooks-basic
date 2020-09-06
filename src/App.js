import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./App.scss";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
// import TodoList from "./components/TodoList";
// import TodoForm from "./components/TodoForm";
// import ColorBox from "./components/ColorBox";

function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: "I love Easy Frontend! 😍 " },
        { id: 2, title: "We love Easy Frontend! 🥰 " },
        { id: 3, title: "They love Easy Frontend! 🚀 " },
    ]);

    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1,
    });

    const [filter, setFilter] = useState({
        _limit: 10,
        _page: 1,
    });

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filter);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON });

                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch (error) {
                console.log("fail:", error.message);
            }
        }
        console.log("Post list");
        fetchPostList();
    }, [filter]);

    useEffect(() => {
        console.log("Use effect list");
    });

    function handlePageChange(newPage) {
        console.log(newPage);
        setFilter({
            ...filter,
            _page: newPage,
        });
    }
    function handleTodoClick(todo) {
        const index = todoList.findIndex((x) => x.id === todo.id);
        if (index < 0) return;

        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(formValues) {
        //add to todoList
        const newTodo = {
            id: todoList.length + 1,
            ...formValues,
        };
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

    function handleFilterChange(newFilter) {
        console.log(newFilter);
        setFilter({
            ...filter,
            _page: 1,
            //property_like : search include filter
            title_like: newFilter.searchTerm,
        });
    }

    const [hideClock, setHideClock] = useState(true);
    return (
        <div className="app">
            <h1>Well come react hooks - Post List</h1>

            {/* <TodoForm onSubmit={handleTodoFormSubmit} />
            <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
            {/* <ColorBox /> */}
            <PostFilterForm onSubmit={handleFilterChange} />
            <PostList posts={postList} />
            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />
            {<Clock />}
            <button
                onClick={() => {
                    setHideClock(false);
                }}
            >
                Hide clock
            </button>
        </div>
    );
}

export default App;
