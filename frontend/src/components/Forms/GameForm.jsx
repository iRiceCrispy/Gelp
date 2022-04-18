import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addGame, editGame } from '../../store/games';

const GameForm = ({ sessionUser, currentGame, edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(currentGame.title || '');
  const [description, setDescription] = useState(currentGame.description || '');
  const [image, setImage] = useState(currentGame.image || '');
  const [url, setUrl] = useState(currentGame.url || '');
  const [downloadLink, setdownloadLink] = useState(currentGame.downloadLink || '');
  const [releaseDate, setReleaseDate] = useState(currentGame.releaseDate);
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

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
    }

    const game = { ...currentGame, title, description, url, image, downloadLink, releaseDate };

    return dispatch(editGame(game))
      .then(() => history.push('.'))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className='gameForm' onSubmit={handleSubmit}>
      <label>
        Title *
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        <p className='error'>{errors.title}</p>
      </label>
      <label>
        Description *
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
  );
};

export default GameForm;
