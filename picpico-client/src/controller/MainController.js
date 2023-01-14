import { getSocket, joinRoom } from '../modules/sockets.mjs';
import { initWebRTC } from '../modules/webRTC.mjs';

const MainController = () => {
  let socket;

  const init = async roomId => {
    socket = getSocket();
    socket.on('connect', async () => {
      await joinRoom(socket, roomId);
      await initWebRTC(socket);
    });
  };

  return {
    init: async roomId => {
      await init(roomId);
    },

    // runPhotoBooth: () => {},
  };
};

export default MainController;
