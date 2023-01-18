// captureFrame() 으로 생기는 image array 를 가지고 gif 만든 후 다운로드
import Animated_GIF from "gif-transparency";
// import Animated_GIF from "animated_gif";

// import GIF from "gif.js";

export function captureFrame() {
  //! 결과 frame들 모아두는 안보이는 div 하나 필요함 거기에 img append~
}

export function makeGIF() {
  //! 결과 frame들 모아두는 안보이는 div 하나 필요함 거기서 img 데려오기
  const row = document.getElementById("drag-items");

  const imgs = row.querySelectorAll("img");

  //   const Animated_GIF = require("gif-transparency");

  const ag = new Animated_GIF.default({
    repeat: 0,
    disposal: 2,
  });

  ag.setSize(350, 350);
  ag.setDelay(600);

  for (let i = 0; i < imgs.length; i++) {
    ag.addFrame(imgs[i]);
    console.log(imgs[i]);
  }

  const animatedImage = document.createElement("img");

  // ag.getBase64GIF(image => {
  //   animatedImage.src = image;
  //   document.body.appendChild(animatedImage);
  // });

  ag.getBlobGIF(blob => {
    const url = window.URL.createObjectURL(blob);
    animatedImage.src = url;
    document.body.appendChild(animatedImage);
  });

  animatedImage.onload = () => {
    ag.destroy();
  };

  //! ag.getBase64 (image => image 다운로드 시키기)
}

// export function makeGIF() {
//   const gif = new GIF({
//     workers: 2,
//     quality: 10,
//     workerScript: process.env.PUBLIC_URL + '/gif.worker.js'
//   });

//   const row = document.getElementById("drag-items");
//   const imgs = row.querySelectorAll("img");

//   for (let i = 0; i < imgs.length; i++) {
//     gif.addFrame(imgs[i]);
//   }

//   gif.on("finished", blob => {
//     window.open(URL.createObjectURL(blob));
//   });

//   gif.render();
// }
