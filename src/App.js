import React, {useMemo, useRef, useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Ява 350 Старушка', body: 'Обязательно вишнёвая (а другие цвета и не поставлялись), с цировками, округлыми боками и блестящими "щеками" изящного бензобака.'},
        {id: 2, title: 'Ява 350/634', body: 'В декабре 1973 года в Советский Союз пришла первая партия (500 штук) новейших чехословацких мотоциклов Jawa 350 typ 634-01. Современная модель пришла на смену "старушке", хотя ещё примерно год они производились и продавались параллельно.'},
        {id: 3, title: 'Ява 350/638', body: 'Новенькую Jawa 350 модели 638-0-00 начали выпускать в 1986-м году. За характерную форму задней части в народе её называли "Пенал". Также иногда встречаются прозвища "Банан", "Скамейка", "Мыльница", "Крокодил" ...'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Добавить мотоцикл
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про Jawa"/>
        </div>
    );
}

export default App;
