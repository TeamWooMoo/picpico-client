class ResultImage {
    resultUrl; // string
    stickers; // Array : Sticker 객체들의 배열

    constructor(_resultUrl, _stickers) {
        this.resultUrl = _resultUrl;
        this.stickers = _stickers;
    }
}

class Sticker {
    stickerUrl; // string
    axisX; // number
    axisY; // number
    frames; // Array : frame들의 배열

    constructor(_stickerUrl, _axisX, _axisY) {
        this.stickerUrl = _stickerUrl;
        this.axisX = _axisX;
        this.axisY = _axisY;
        this.frames = null;
    }
}

/* frame */
// {
//     // The color table lookup index for each pixel
//     pixels: [...],
//     // the dimensions of the gif frame (see disposal method)
//     dims: {
//         top: 0,
//         left: 10,
//         width: 100,
//         height: 50
//     },
//     // the time in milliseconds that this frame should be shown
//     delay: 50,
//     // the disposal method (see below)
//     disposalType: 1,
//     // an array of colors that the pixel data points to
//     colorTable: [...],
//     // An optional color index that represents transparency (see below)
//     transparentIndex: 33,
//     // Uint8ClampedArray color converted patch information for drawing
//     patch: [...]
//}
