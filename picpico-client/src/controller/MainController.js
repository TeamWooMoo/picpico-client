import { addMemberEvent, getSocket, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";

const MainController = () => {
  let socket = getSocket();

  const init = async (roomId, nickName) => {
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
    doneTake: roomId => {
      socket.emit("done_take", roomId);
    },
    pickPic: (roomId, picIdx) => {
      socket.emit("pick_pic", roomId, picIdx);
    },
    donePick: roomId => {
      socket.emit("done_pick", roomId);
    },
    strokeCanvas: (roomId, offsetX, offsetY) => {
      console.log("stroke!!", offsetX, offsetY);
      console.log("my id", socket.id);
      socket.emit("stroke_canvas", roomId, offsetX, offsetY);
    },
  };
};

export default MainController;
