'use strict';

var API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
var $thumbnailContainer = document.getElementById('thumbnail-container');
var imgQuality = 1;

var prepData = function prepData(payload) {
  return payload.data.response;
};

// Could be cleaned up with lodash's `get` function
var getImgUrl = function getImgUrl(video) {
  return video.thumbnails && video.thumbnails.length && video.thumbnails[imgQuality] && video.thumbnails[imgQuality].url || 'default-thumbnail.png';
};

function renderThumbnails(videos) {
  var thumbnails = videos.map(function (video) {
    return '\n    <div class="thumbnail">\n      <img class="thumbnail-img" src="' + getImgUrl(video) + '" />\n      <span class="caption">' + video.title + '</span>\n    </div>\n  ';
  });

  return thumbnails.join('');
}

function mountThumbnails(content) {
  $thumbnailContainer.innerHTML = content;
}

function populateThumbnails() {
  axios.get('https://api.zype.com/videos/?api_key=' + API_KEY).then(prepData).then(renderThumbnails).then(mountThumbnails);
}

window.onload = populateThumbnails;
//# sourceMappingURL=index.js.map