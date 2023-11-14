export const Anecdote = (props) => {
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
