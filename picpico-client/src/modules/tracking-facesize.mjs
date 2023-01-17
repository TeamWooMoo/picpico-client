import tracking from "jstracking";
import { myFace } from "../controller/MainController.js";

function imagedata_to_image(imagedata) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx.putImageData(imagedata, 0, 0);

  var image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

export function getFaceSize(imagedata) {
  // console.log(">>>>getFaceSize called imagedata -> ", imagedata);

  const image = imagedata_to_image(imagedata);

  const img = document.createElement("img");
  // img.src = image; // url 로 꽂아야 함

  const faceTracker = new window.tracking.ObjectTracker("face");
  faceTracker.setInitialScale(4);
  faceTracker.setStepSize(2);
  faceTracker.setEdgesDensity(0.1);

  // task.run();

  faceTracker.on("track", event => {
    console.log(">>>>>on track", event);
    // console.log(event.data[0].width);
    // console.log(event.data[0].height);
  });

  tracking.track(img, faceTracker);
}
