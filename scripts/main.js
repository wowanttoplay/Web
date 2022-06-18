function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}


// document.querySelector('html').onclick = function() {
//     alert('do not click me')
// }

// document.querySelector('h1').addEventListener('click', ()=>{
//     alert('do not click h1');
// });


let my_image = document.querySelector('img');

my_image.onclick = function() {
    let my_src = my_image.getAttribute('src');
    if (my_src === 'images/sun.jfif') {
        my_image.setAttribute('src', 'images/sea.jfif')
    }else if (my_src === 'images/sea.jfif') {
        my_image.setAttribute('src', 'images/sun.jfif')
    }
}

let myButtom = document.querySelector('button');
let myHead = document.querySelector('h1');

function setUserName() {
    let myName = prompt('请输入你的名字');
    localStorage.setItem('name', myName);
    myHead.textContent = '欢迎你的到来： ' + myName;
}

if (!localStorage.getItem('name')) {
    setUserName();
}else {
    let storeName = localStorage.getItem('name');
    myHead.textContent = '欢迎你的到来： ' + storeName;
}

myButtom.onclick = function() {
    setUserName();
}

