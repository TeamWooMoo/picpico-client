// import cancelBtn from "../../assets/images/cancelBtn.svg";
// import cancelBtn from "../assets/images/cancelBtn.svg";

export const DecoDragAndDrop = () => {
    let isDragging;
    let field;
    let dragElement;
    let coords, shiftX, shiftY;

    const onMouseMove = event => {
        moveAt(event.clientX, event.clientY);
    };

    const onMouseUp = event => {
        finishDrag();
        showFrame(event);
    };

    const fieldMouseDown = event => {
        hideAllFrame();
        dragElement = event.target.closest(".draggable");
        if (!dragElement) {
            console.log(`dragElement = ${dragElement}`);
            return;
        }

        event.preventDefault();
        dragElement.addEventListener("dragstart", event => false);

        startDrag(dragElement, event.clientX, event.clientY);
    };

    const startDrag = (element, clientX, clientY) => {
        if (isDragging) return;
        isDragging = true;

        field.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseup", onMouseUp);

        shiftX = clientX - element.getBoundingClientRect().left;
        shiftY = clientY - element.getBoundingClientRect().top;

        element.style.position = "fixed";
        moveAt(clientX, clientY);
    };

    const moveAt = (clientX, clientY) => {
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        let newBottom = newY + dragElement.offsetHeight;
        let newTop = newY;
        let newRight = newX + dragElement.offsetWidth;
        let newLeft = newX;

        /* 필드 밖으로 나가면 안됨
         * 필드 밖으로 마우스를 움직일 경우 스티커는 나가지 않고 선에 걸려있어야 한다. */
        if (newBottom > field.getBoundingClientRect().bottom) {
            newY = field.getBoundingClientRect().bottom - dragElement.offsetHeight;
        }

        if (newTop < field.getBoundingClientRect().top) {
            newY = field.getBoundingClientRect().top;
        }

        if (newRight > field.getBoundingClientRect().right) {
            newX = field.getBoundingClientRect().right - dragElement.offsetWidth;
        }

        if (newLeft < field.getBoundingClientRect().left) {
            newX = field.getBoundingClientRect().left;
        }

        dragElement.style.left = newX + "px";
        dragElement.style.top = newY + "px";
    };

    const finishDrag = () => {
        if (!isDragging) return;
        isDragging = false;

        dragElement.style.top = parseInt(dragElement.style.top) - field.getBoundingClientRect().top + "px";
        dragElement.style.left = parseInt(dragElement.style.left) - field.getBoundingClientRect().left + "px";
        dragElement.style.position = "absolute";

        field.removeEventListener("mousemove", onMouseMove);
        dragElement.removeEventListener("mouseup", onMouseUp);
    };

    const showFrame = event => {
        if (!dragElement) return;
        dragElement.style.border = "1px solid black";

        // const deleteBtn = document.createElement("img");
        // deleteBtn.addEventListener("click");
        // deleteBtn.src = cancelBtn;
        // dragElement.append(deleteBtn);
    };

    const hideFrame = element => {
        if (!element) return;
        element.style.border = "none";
        element.style.position = "absolute";
    };

    const hideAllFrame = () => {
        let stickers = field.children;
        for (let i = 0; i < stickers.length; i++) {
            hideFrame(stickers[i]);
        }
    };

    const init = () => {
        isDragging = false;
        field = document.getElementById("sticker_field");
        field.addEventListener("mousedown", fieldMouseDown);
    };

    return {
        init: () => {
            init();
        },
    };
};

export default DecoDragAndDrop;
