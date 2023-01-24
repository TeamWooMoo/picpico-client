import { makeResultCanvas, resultCanvas, ResultImage, resultImages, Sticker } from "../modules/resultCanvas.mjs";

export const gifTest = resultList => {
    /******* 서버에서 해주는 작업 For Test ****** */
    console.log("gifTest >>> ", resultList);

    // const stickers0 = [new Sticker(jh, 100, 100), new Sticker(nr, 200, 200)];
    // const stickers1 = [new Sticker(jh, 200, 200), new Sticker(db, 200, 200)];
    // const stickers2 = [new Sticker(nr, 0, 0), new Sticker(db, 150, 150)];
    // const stickers3 = [new Sticker(nr, 80, 80), new Sticker(nr, 120, 0)];

    // const testResult0 = new ResultImage(testResultUrl0, stickers0);
    // const testResult1 = new ResultImage(testResultUrl1, stickers1);
    // const testResult2 = new ResultImage(testResultUrl2, stickers2);
    // const testResult3 = new ResultImage(testResultUrl3, stickers3);

    // resultImages.push(testResult0);
    // resultImages.push(testResult1);
    // resultImages.push(testResult2);
    // resultImages.push(testResult3);

    /*************** For Run *************** */

    // 서버에서 받으면 할 일
    // 넘어온 result들 resultImages에 push
    for (let i = 0; i < resultList.length; i++) {
        resultImages.push(resultList[i]);
    }

    /*************************************** */

    console.log(">>>>>>>init resultImages :", resultImages);

    const testArea = document.getElementById("testArea");

    testArea.appendChild(resultCanvas);
    makeResultCanvas();
};
