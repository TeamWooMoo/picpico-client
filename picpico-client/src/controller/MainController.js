import { addMemberEvent, getSocket, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";

const MainController = () => {
  let socket;

  const init = async (roomId, nickName) => {
    socket = getSocket();
    socket.on("connect", async () => {
      await joinRoom(socket, roomId);
      await initWebRTC(socket);
      await addMemberEvent(roomId, nickName);
    });
  };

  return {
    init: async roomId => {
      const nickName = "user";
      await init(roomId, nickName);
    },
    takePic: (imgIdx, imgUrl) => {
      socket.emit("take_pic", imgIdx, imgUrl);
    },
    doneTake: () => {
      socket.emit("done_take");
    },
  };
};

export default MainController;
