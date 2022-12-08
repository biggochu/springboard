function countDownTimeout(n) {
	function timeoutFn() {
		setTimeout(() => {
			--n
			if (n > 0) {
				console.log(n)
				timeoutFn()
			} else {
				console.log('DONE!')
			}
		}, 1000)
	}
	timeoutFn()
}

countDownTimeout(4)


function countDownInterval(n) {
	const intervalId = setInterval(() => {
		--n
		if (n > 0) {
			console.log(n)
		} else {
			console.log('DONE!')
			clearInterval(intervalId)
		}
	}, 1000)
}

countDownInterval(4)