function randomGameTimeout() {
	let count = 0

	function timeoutFn() {
		setTimeout(() => {
			const num = Math.random()
			count++

			if (num > 0.75) {
				console.log('Tries=', count)
			} else {
				timeoutFn()
			}
		}, 1000)
	}
}

randomGameTimeout()


function randomGameInterval() {
	let count = 0

	const intervalId = setInterval(() => {
		const num = Math.random()
		count++

		if (num > 0.75) {
			clearInterval(intervalId)
			console.log('Tries=', count)
		}
	}, 1000)
}

randomGameInterval()