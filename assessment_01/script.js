const form = document.getElementById('memeForm')
const formTextTop = document.getElementById('formTextTop')
const formTextBottom = document.getElementById('formTextBottom')
const formImgUrl = document.getElementById('formImgUrl')

const memeList = document.getElementById('memeList')

function renderMeme(textTop, textBottom, imgUrl) {
	const memeDiv = document.createElement('div')
	memeDiv.classList.add('meme')

	const img = document.createElement('img')
	img.classList.add('meme-img')
	img.src = imgUrl
	memeDiv.appendChild(img)

	img.addEventListener('load', function(e) {
		if (this.naturalHeight > this.naturalWidth) {
			memeDiv.classList.toggle('tall')
		}
	})

	const textTopDiv = document.createElement('div')
	textTopDiv.classList.add('meme-text-top')
	textTopDiv.innerText = textTop
	memeDiv.appendChild(textTopDiv)

	const textBottomDiv = document.createElement('div')
	textBottomDiv.classList.add('meme-text-bottom')
	textBottomDiv.innerText = textBottom
	memeDiv.appendChild(textBottomDiv)

	const overlay = document.createElement('div')
	overlay.classList.add('meme-overlay')
	memeDiv.appendChild(overlay)

	const overlayInner = document.createElement('div')
	overlayInner.classList.add('meme-overlay-inner')
	overlayInner.innerText = "✖"
	overlay.appendChild(overlayInner)

	memeDiv.addEventListener('click', function(e) {
		memeDiv.remove()
	})

	memeList.appendChild(memeDiv)
}

function clearMemeForm() {
	formImgUrl.value = ""
	formTextTop.value = ""
	formTextBottom.value = ""
}

form.addEventListener('submit', function(e) {
	e.preventDefault()

	renderMeme(formTextTop.value, formTextBottom.value, formImgUrl.value)
	clearMemeForm()
})