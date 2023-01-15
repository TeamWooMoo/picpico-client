import { initPeerCanvas } from "../modules/receiver.mjs";
import { addMemberEvent, getSocket, joinRoom } from "../modules/sockets.mjs";
import { initStream } from "../modules/stream.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";

const MainController = () => {
  let socket;

  const init = async (roomId, nickName) => {
    socket = getSocket();
    socket.on("connect", async () => {
      await joinRoom(socket, roomId);
      await initStream();
      await initWebRTC(socket);
      await addMemberEvent(roomId, nickName);
      await initPeerCanvas();
    });
  };

  return {
    init: async roomId => {
      const nickName = "user";
      await init(roomId, nickName);
    },
    takePic: imgFile => {
      socket.emit("take_pic", imgFile);
    },
    doneTake: () => {
      socket.emit("done_take");
    },
  };
};

export default MainController;
