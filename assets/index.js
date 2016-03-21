'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Config
var API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
var imgQuality = 1;
var defaultImgUrl = 'default-thumbnail.png';
var defaultAspectRatio = 1.78;
var containerHeight = 0.84;
var defaultThumbnail = {
  url: defaultImgUrl,
  aspect_ratio: defaultAspectRatio
};

// Model

var Video = function () {
  _createClass(Video, null, [{
    key: 'requestVideos',
    value: function requestVideos() {
      var formatVideos = function formatVideos(payload) {
        var data = payload.data.response;
        return Video.all = data.map(function (videoObj) {
          return new Video(videoObj, imgQuality);
        });
      };

      return axios.get('https://api.zype.com/videos/?api_key=' + API_KEY).then(formatVideos);
    }
  }]);

  function Video(data, imgQuality) {
    _classCallCheck(this, Video);

    this.title = data.title;
    // Could be cleaned up with lodash's `get` function
    this.thumbnail = data.thumbnails && data.thumbnails.length && data.thumbnails[imgQuality] || defaultThumbnail;
  }

  return Video;
}();

// View


var Thumnails = function () {
  function Thumnails(videos, containerId) {
    _classCallCheck(this, Thumnails);

    this.videos = videos;
    this.thumbnailContainer = document.getElementById(containerId);
  }

  _createClass(Thumnails, [{
    key: 'render',
    value: function render() {
      var thumbnails = this.videos.map(function (video) {
        var thumbnail = video.thumbnail;
        var title = video.title;

        var thumbnailHeight = 100 / thumbnail.aspect_ratio * containerHeight;

        return '\n        <div class="thumbnail" style="height: ' + (thumbnailHeight + 'vw') + '">\n          <img class="thumbnail-img" src="' + thumbnail.url + '" />\n          <span class="caption">' + title + '</span>\n        </div>\n      ';
      });

      this.thumbnailContainer.innerHTML = thumbnails.join('');
    }
  }]);

  return Thumnails;
}();

// Controller


var ThumbnailPage = function ThumbnailPage(mountId) {
  var _this = this;

  _classCallCheck(this, ThumbnailPage);

  this.mountId = mountId;

  return Video.requestVideos().then(function (videos) {
    _this.videos = videos;
    _this.view = new Thumnails(_this.videos, _this.mountId);
    _this.view.render();
  });
};

window.onload = function () {
  return new ThumbnailPage('thumbnail-container');
};
//# sourceMappingURL=index.js.map