import { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addGame, editGame } from '../../store/games';

const GameFormPage = ({ edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const currentGame = useSelector(state => state.games[gameId]);
  const [title, setTitle] = useState(edit ? currentGame.title : '');
  const [description, setDescription] = useState(edit ? currentGame.description : '');
  const [image, setImage] = useState(edit ? currentGame.image || '' : '');
  const [url, setUrl] = useState(edit ? currentGame.url || '' : '');
  const [steamUrl, setSteamUrl] = useState(edit ? currentGame.steamUrl || '' : '');
  const [releaseDate, setReleaseDate] = useState(
    edit ? currentGame.releaseDate || undefined : undefined
  );

  if (!sessionUser) return <Redirect to='/login' />;

  const handleSubmit = async e => {
    e.preventDefault();

    if (!edit) {
      const game = {
        ownerId: sessionUser.id,
        title,
        description,
        image,
        url,
        steamUrl,
        releaseDate,
      };

      await dispatch(addGame(game));
      return history.push('/');
    } else {
      const game = { ...currentGame, title, description, url, image, steamUrl, releaseDate };

      await dispatch(editGame(game));
      return history.push('.');
    }
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
        Image
        <input type='text' value={image} onChange={e => setImage(e.target.value)} />
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
      <button type='submit'>{edit ? 'Edit Game' : 'Add Game'}</button>
    </form>
  );
};

export default GameFormPage;
