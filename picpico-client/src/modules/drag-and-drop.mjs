export const DragAndDrop = () => {
  let isDragging;
  let field;
  let dragElement;
  let coords, shiftX, shiftY;

  // switch to absolute coordinates at the end, to fix the element in the document
  //

  const onMouseMove = event => {
    moveAt(event.clientX, event.clientY);
  };

  const onMouseUp = event => {
    finishDrag();
  };

  const fieldMouseDown = event => {
    // dragElement를 최초로 얻어오는 부분
    dragElement = event.target.closest(".draggable");
    if (!dragElement) return;

    event.preventDefault();
    dragElement.addEventListener("dragstart", event => false);

    startDrag(dragElement, event.clientX, event.clientY);
  };

  // [ 드래그 시작 ]
  // 최초 이동을 기억하고, element 위치를 이동
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
    // new window-relative coordinates
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // check if the new coordinates are below the bottom window edge
    let newBottom = newY + dragElement.offsetHeight; // new bottom
    let newTop = newY; // new top
    let newRight = newX + dragElement.offsetWidth;
    let newLeft = newX;

    /* 필드 밖으로 나가면 안됨
     * 필드 밖으로 마우스를 움직일 경우
     * 스티커는 나가지 않고 선에 걸려있어야 한다. */
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
// DragAndDrop().init();
export default DragAndDrop;
