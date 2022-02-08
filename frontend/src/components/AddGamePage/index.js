import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addGame } from '../../store/games';

const AddGamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [steamUrl, setSteamUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState(undefined);

  if (!sessionUser) return <Redirect to='/login' />;

  const handleSubmit = e => {
    e.preventDefault();

    const game = { ownerId: sessionUser.id, title, description, url, steamUrl, releaseDate };

    dispatch(addGame(game));

    return history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <label>
        URL
        <input type='text' value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      <label>
        Steam URL
        <input type='text' value={steamUrl} onChange={e => setSteamUrl(e.target.value)} />
      </label>
      <label>
        Release Date
        <input type='date' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
      </label>
      <button type='submit'>Add Game</button>
    </form>
  );
};

export default AddGamePage;
