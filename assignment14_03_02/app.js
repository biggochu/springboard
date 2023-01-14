//http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym

const $form = $("#form");
const $queryInput = $("#query-input");
const $searchBtn = $("#search-btn");
const $removeBtn = $("#remove-btn");
const $gifList = $("#gif-list");

$form.on("submit", (e) => e.preventDefault());

$searchBtn.on("click", async (e) => {
	const query = $queryInput.val();
	const gif = await searchGiphy(query);
	addGif(gif);
	$queryInput.val(null);
});

$removeBtn.on("click", (e) => $gifList.empty());

async function searchGiphy(q) {
	const api_key = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
	const res = await axios.get(`http://api.giphy.com/v1/gifs/search`, {
		params: {
			q,
			api_key,
		},
	});
	const gif = res.data.data[Math.floor(Math.random() * 49)];
	return gif;
}

function addGif(gif) {
	const $img = $(`<img src="${gif.images.fixed_height.url}" />`);
	$gifList.append($img);
}
