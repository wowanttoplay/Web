(function() {
    function makeDialogDraggable(dialog, handle) {
        let isDragging = false;
        let offsetX, offsetY;

        handle.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - dialog.getBoundingClientRect().left;
            offsetY = event.clientY - dialog.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(event) {
            if (isDragging) {
                dialog.style.left = `${event.clientX - offsetX}px`;
                dialog.style.top = `${event.clientY - offsetY}px`;
                dialog.style.cursor = 'move';  // Change cursor to move while dragging
            }
        }

        function onMouseUp() {
            isDragging = false;
            dialog.style.cursor = 'default';  // Revert cursor to default after dragging
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // 将函数挂载到全局对象上
    window.makeDialogDraggable = makeDialogDraggable;
})();
