const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
const $thumbnailContainer = document.getElementById('thumbnail-container');

const prepData = (payload) => payload.data.response;

function renderThumbnails(videos) {
  const thumbnails = videos.map(video => `
    <div class="thumbnail">
      <img src="${video.thumbnails[0].url}" />
      <span>${video.title}</span>
    </div>
  `);

  return thumbnails.join('');
}

function mountThumbnails(content) {
  $thumbnailContainer.innerHTML = content;
}

function populateThumbnails() {
  axios
    .get(`https://api.zype.com/videos/?api_key=${API_KEY}`)
    .then(prepData)
    .then(renderThumbnails)
    .then(mountThumbnails);
}

window.onload = populateThumbnails;
