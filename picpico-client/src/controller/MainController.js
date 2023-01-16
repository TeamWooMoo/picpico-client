import { addMemberEvent, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";
import { socket } from "../modules/sockets.mjs";
import { initStream } from "../modules/stream.mjs";
import { initPeerCanvas } from "../modules/receiver.mjs";

const MainController = () => {
  const init = async (roomId, nickName) => {
    await initStream();
    await joinRoom(roomId);
    await initWebRTC();
    await addMemberEvent(roomId, nickName);
    await initPeerCanvas();
  };

  return {
    init: async roomId => {
      const nickName = "user";
      await init(roomId, nickName);
    },
  };
};

export default MainController;
