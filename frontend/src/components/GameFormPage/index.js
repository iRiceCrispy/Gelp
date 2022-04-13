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
  const [title, setTitle] = useState(edit ? currentGame?.title : '');
  const [description, setDescription] = useState(edit ? currentGame?.description : '');
  const [image, setImage] = useState(edit ? currentGame?.image || '' : '');
  const [url, setUrl] = useState(edit ? currentGame?.url || '' : '');
  const [downloadLink, setdownloadLink] = useState(edit ? currentGame?.downloadLink || '' : '');
  const [releaseDate, setReleaseDate] = useState(
    edit ? currentGame?.releaseDate || undefined : undefined
  );
  const [errors, setErrors] = useState({});

  if (!sessionUser) return <Redirect to='/login' />;
  if (edit && !currentGame) return <Redirect to='/404' />;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({})

    if (!edit) {
      const game = {
        ownerId: sessionUser.id,
        title,
        description,
        image,
        url,
        downloadLink,
        releaseDate,
      };

      return dispatch(addGame(game))
        .then(() => history.push('/'))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      const game = { ...currentGame, title, description, url, image, downloadLink, releaseDate };

      return dispatch(editGame(game))
        .then(() => history.push('.'))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className='formContainer'>
      <p className='formTitle'>{edit ? 'Edit Game' : 'Add Game'}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
          <p className='error'>{errors.title}</p>
        </label>
        <label>
          Description
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <p className='error'>{errors.description}</p>
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
          Download Link
          <input type='text' value={downloadLink} onChange={e => setdownloadLink(e.target.value)} />
        </label>
        <label>
          Release Date
          <input type='date' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
        </label>
        <button type='submit' className='btn btnRed'>
          {edit ? 'Edit Game' : 'Add Game'}
        </button>
      </form>
    </div>
  );
};

export default GameFormPage;
