(function() {
    function createElementSelectionDialog(classNames) {
        return new Promise((resolve) => {
            const dialogOverlay = document.createElement('div');
            dialogOverlay.style.position = 'fixed';
            dialogOverlay.style.top = '0';
            dialogOverlay.style.left = '0';
            dialogOverlay.style.width = '100%';
            dialogOverlay.style.height = '100%';
            dialogOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            dialogOverlay.style.zIndex = '10000';
            dialogOverlay.style.display = 'flex';
            dialogOverlay.style.alignItems = 'center';
            dialogOverlay.style.justifyContent = 'center';

            const dialog = document.createElement('div');
            dialog.className = 'dialog';
            dialog.style.position = 'absolute';  // Ensure the dialog is absolutely positioned

            const title = document.createElement('h2');
            title.textContent = 'Select Element Class';
            title.className = 'dialog-title';
            title.style.cursor = 'move';  // Indicate that the title is draggable

            const select = document.createElement('select');
            select.className = 'dialog-select';

            classNames.forEach(className => {
                const option = document.createElement('option');
                option.value = `.${className}`;
                option.textContent = className;
                select.appendChild(option);
            });

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.className = 'dialog-button ok-button';
            okButton.addEventListener('click', () => {
                resolve(select.value);
                document.body.removeChild(dialogOverlay);
            });

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.className = 'dialog-button close-button';
            closeButton.addEventListener('click', () => {
                document.body.removeChild(dialogOverlay);
            });

            buttonContainer.appendChild(okButton);
            buttonContainer.appendChild(closeButton);

            dialog.appendChild(title);
            dialog.appendChild(select);
            dialog.appendChild(buttonContainer);
            dialogOverlay.appendChild(dialog);
            document.body.appendChild(dialogOverlay);

            // 添加拖动功能
            window.makeDialogDraggable(dialog, title);
        });
    }

    // 将函数挂载到全局对象上
    window.createElementSelectionDialog = createElementSelectionDialog;
})();
