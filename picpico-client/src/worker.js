this.onmessage = function (e) {
  console.log("onmessage: ", e);
  //   draw(imgObj);
};

function draw(imgObj) {
  const url = imgObj.picture;
  const img = new Image();
  const canvas = document.getElementById("drawnCanvas");
  const ctx = canvas.getContext("2d");
  img.src = url;
  img.onload = async function () {
    await ctx.drawImage(img, 0, 0);
  };
}
