// 1. 
let container = document.getElementById('container')
console.log(container)

// 2. 
container = document.querySelector('section#container')
console.log(container)

// 3. 
const liSecond = document.querySelectorAll('li.second')
console.log(liSecond)

// 4. 
const liThird = document.querySelector('ol li.third')
console.log(liThird)

// 5. 
container.appendChild(document.createTextNode('Hello!'))

// 6. 
const footer = document.querySelector('.footer')
footer.classList.add("main")
console.log(footer.className)

// 7. 
footer.className,toogle('main', false)

// 8.
const liNew = document.createElement('li')
console.log(liNew)

// 9.
liNew.innerText = "four"

// 10.
document.querySelector('ul').appendChild(liNew)

// 11.
const lis = document.querySelectorAll('ol li')
for (const li of lis) {
	li.style.background = "green"
}

lis.forEach(li => (li.style.background = "green"))

// 12.
footer.parentNode.removeChild(footer)