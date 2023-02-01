export const myWorker = imgObj => {
  const canvas = document.getElementById("drawnCanvas");
  const context = canvas.getContext("2d");
  const url = imgObj.picture;
  const img = new Image();
  img.src = url;
  img.onload = async function () {
    await context.drawImage(img, 0, 0);
  };
};
