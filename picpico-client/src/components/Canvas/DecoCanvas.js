import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {socket} from "../../modules/sockets.mjs";
import {addStrokeHistory} from "../../slice/drawingInfo.js";
import {DragAndDrop} from "../../modules/drag-and-drop.mjs";

const DecoCanvas = () => {
    const dispatch = useDispatch();
    const [drawing, setDrawing] = useState(false);
    const strokeArr = useSelector(state => state.drawingInfo.strokes);
    const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
    const decoMyCanvas = useRef();
    const decoPeerCanvas = useRef();
    // const decoPeerStickerCanvas = useRef();
    const roomId = useSelector(state => state.roomInfo.room);

    const onCanvasDown = ({nativeEvent}) => {
        setDrawing(true);
        const {offsetX, offsetY} = nativeEvent;
        socket.emit("mouse_down", socket.id, offsetX, offsetY);
    };

    const onCanvasUp = () => {
        setDrawing(false);
    };

    const onCanvasMove = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        const decoCtx = decoMyCanvas.current.getContext("2d");
        if (!drawing) {
            decoCtx.beginPath();
            decoCtx.moveTo(offsetX, offsetY);
        } else {
            decoCtx.strokeStyle = "black";
            decoCtx.lineTo(offsetX, offsetY);
            decoCtx.stroke();
            socket.emit("stroke_canvas", roomId, offsetX, offsetY, "white", socket.id);
        }
    };

    useEffect(() => {
        const dragAndDrop = DragAndDrop();
        dragAndDrop.init();
    }, []);

    useEffect(() => {
        if (strokeArr.length > 0) {
            const [newX, newY, newColor, newSocketId] = strokeArr[strokeArr.length - 1];
            if (strokeHistory.hasOwnProperty(newSocketId)) {
                const {x: oldX, y: oldY} = strokeHistory[newSocketId];
                const decoCtx = decoPeerCanvas.current.getContext("2d");
                decoCtx.beginPath();
                decoCtx.moveTo(oldX, oldY);

                decoCtx.lineTo(newX, newY);
                decoCtx.strokeStyle = newColor;
                decoCtx.stroke();

                dispatch(addStrokeHistory({value: [newSocketId, newX, newY]}));
            }
        }
    }, [strokeArr]);

    return (
        <div style={{position: "relative"}}>
            <canvas ref={decoPeerCanvas} width="500" height="500" style={{position: "absolute", top: "0px", left: "0px"}}></canvas>
            <canvas
                ref={decoMyCanvas}
                width="500"
                height="500"
                style={{position: "absolute", top: "0px", left: "0px", border: "2px solid white"}}
                onMouseDown={onCanvasDown}
                onMouseMove={onCanvasMove}
                onMouseUp={onCanvasUp}
            ></canvas>
            <div id="sticker_field" style={{position: "absolute", border: "2px solid white", width: "500px", height: "500px"}}>
                <img
                    src="https://i.pinimg.com/originals/18/11/30/181130c64c246318e1e4d463d1844ed7.gif"
                    class="draggable"
                    style={{position: "absolute", width: "100px", height: "100px"}}
                />
                <img
                    src="https://storage.cobak.co/uploads/1585038492476558_8eeec6050c.gif"
                    class="draggable"
                    style={{position: "absolute", width: "100px", height: "100px"}}
                />
            </div>
            {/* <div style="clear: both"></div> */}
        </div>
    );
};

export default DecoCanvas;
