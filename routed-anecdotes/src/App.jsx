import { useState } from 'react';
import { Route, Link, Routes, useMatch, useNavigate } from 'react-router-dom';

const Menu = () => {
    const padding = {
        paddingRight: 5,
    };
    return (
        <nav>
            <Link to='/' style={padding}>
                anecdotes
            </Link>
            <Link to='/create' style={padding}>
                create new
            </Link>
            <Link to='/about' style={padding}>
                about
            </Link>
        </nav>
    );
};

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}>
                    <a href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</a>
                </li>
            ))}
        </ul>
    </div>
);

const Anecdote = (props) => {
    const { anecdote } = props;
    return (
        <div>
            <h2>
                {anecdote.content} by <i>{anecdote.author}</i>
            </h2>
            <p>has {anecdote.votes} votes</p>
            <p>
                For more information, see:{' '}
                <a href={anecdote.info}>{anecdote.info}</a>
            </p>
        </div>
    );
};

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is
            &ldquo;a story with a point.&rdquo;
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
        </p>
    </div>
);

const Footer = () => (
    <div style={{ position: 'fixed', bottom: 0, paddingBlock: '1rem' }}>
        Anecdote app for{' '}
        <a href='https://fullstackopen.com/'>Full Stack Open</a>. See{' '}
        <a href='https://github.com/degenone/FSO-part7/blob/main/routed-anecdotes/src/App.jsx'>
            https://github.com/degenone/FSO-part7/blob/main/routed-anecdotes/src/App.jsx
        </a>{' '}
        for the source code.
    </div>
);

const CreateNew = (props) => {
    const { addNew } = props;
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content,
            author,
            info,
            votes: 0,
        });
        navigate('/');
    };
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input
                        name='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        name='author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        name='info'
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

const Notification = (props) => {
    const { message } = props;
    const style = {
        border: '1px solid hsla(0, 0%, 0%, 0.5)',
        padding: '0.5rem 1rem',
        marginBlock: '0.5rem',
    };
    return (
        <div style={style}>
            <strong>{message}</strong>
        </div>
    );
};

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
        },
    ]);
    const [notification, setNotification] = useState('');
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3500);
    };
    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        showNotification(`Created anecdote '${anecdote.content}'`);
    };
    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };
    const match = useMatch('/anecdotes/:id');
    const anecdote = match
        ? anecdotes.find((a) => a.id === Number(match.params.id))
        : null;
    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {notification && <Notification message={notification} />}
            <Routes>
                <Route
                    path='/'
                    element={<AnecdoteList anecdotes={anecdotes} />}
                />
                <Route
                    path='/anecdotes/:id'
                    element={<Anecdote anecdote={anecdote} />}
                />
                <Route path='/create' element={<CreateNew addNew={addNew} />} />
                <Route path='/about' element={<About />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
