import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addGame, editGame } from '../../store/games';
import './forms.scss';

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
      <main>
        <div className='input title'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            value={title}
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}
          />
          <p className='error'>{errors.title}</p>
        </div>
        <div className='input description'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            placeholder='Cool awesome description...'
            onChange={e => setDescription(e.target.value)}
          />
          <p className='error'>{errors.description}</p>
        </div>
        <div className='input imageUrl'>
          <label htmlFor='imageUrl'>Image Url</label>
          <input
            id='imageUrl'
            type='text'
            value={image}
            placeholder='https://www.image.com/image.png'
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className='input homePage'>
          <label htmlFor='homePage'>Website Address</label>
          <input
            id='homePage'
            type='text'
            value={url}
            placeholder='https://www.gamehomepage.com/'
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <div className='input download'>
          <label htmlFor='download'>Download Link </label>
          <input
            id='download'
            type='text'
            value={downloadLink}
            placeholder='https://www.gamehomepage.com/download'
            onChange={e => setdownloadLink(e.target.value)}
          />

        </div>
        <div className='input date'>
          <label htmlFor='date'>Release Date</label>
          <input
            id='date'
            type='date'
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
          />
        </div>
      </main>
      <footer>
        <button type='submit' className='btn'>
          {edit ? 'Update Game' : 'Add Game'}
        </button>
      </footer>
    </form>
  );
};

export default GameForm;
