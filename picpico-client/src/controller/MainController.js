import { addMemberEvent, getSocket, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";

const MainController = () => {
  let socket = getSocket();

  const init = async (roomId, nickName) => {
    // socket = getSocket();
    console.log("init!!!", socket);
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
      console.log("take pic", socket);
      socket.emit("take_pic", imgIdx, imgUrl);
    },
    doneTake: () => {
      console.log("done take", socket);
      socket.emit("done_take");
    },
    pickPic: picIdx => {
      console.log("pick pic", socket);
      socket.emit("pick_pic", picIdx);
    },
    donePick: () => {
      console.log("donePick", socket);
      socket.emit("done_pick");
    },
    strokeCanvas: (offsetX, offsetY) => {
      socket.emit("stroke_canvas", offsetX, offsetY);
    },
  };
};

export default MainController;
