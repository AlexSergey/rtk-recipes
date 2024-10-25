import { useSelector, useDispatch } from 'react-redux';
import { fetchImage } from './action';
import { getImage } from './slice';
import {useEffect} from 'react';

const Image = () => {
  const dispatch = useDispatch();
  const image = useSelector(getImage);

  useEffect(() => {
    dispatch(fetchImage());
  }, []);

  return (
    <div>
      {image.loading ?
        <p>Loading...</p> : image.error ?
          <p>Error, try again</p> : (
            <p>
              <img width="200px" alt="random" src={image.url} />
            </p>
          )}
    </div>
  );
};

export default Image;
