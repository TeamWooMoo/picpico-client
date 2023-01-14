import { setPicturesInfo } from '../slice/picturesInfo';
import store from '../store';

export const onDoneTakeEvent = imgArr => {
  store.dispatch(setPicturesInfo({ value: imgArr }));
};
