const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
const $thumbnailContainer = document.getElementById('thumbnail-container');
const imgQuality = 1;

const prepData = (payload) => payload.data.response;

// Could be cleaned up with lodash's `get` function
const getImgUrl = (video) => (
    video.thumbnails &&
    video.thumbnails.length &&
    video.thumbnails[imgQuality] &&
    video.thumbnails[imgQuality].url
  ) || 'default-thumbnail.png';

function renderThumbnails(videos) {
  const thumbnails = videos.map(video => `
    <div class="thumbnail">
      <img class="thumbnail-img" src="${getImgUrl(video)}" />
      <span class="caption">${video.title}</span>
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
