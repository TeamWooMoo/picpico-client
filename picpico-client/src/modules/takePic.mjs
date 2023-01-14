import { setPicturesInfo } from '../slice/picturesInfo.js';
import store from '../store.js';

export const onDoneTakeEvent = imgArr => {
  store.dispatch(setPicturesInfo({ value: imgArr }));
};
