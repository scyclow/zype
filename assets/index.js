'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
var imgQuality = 1;

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
    this.imgUrl = data.thumbnails && data.thumbnails.length && data.thumbnails[imgQuality] && data.thumbnails[imgQuality].url || 'default-thumbnail.png';
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
        return '\n      <div class="thumbnail">\n        <img class="thumbnail-img" src="' + video.imgUrl + '" />\n        <span class="caption">' + video.title + '</span>\n      </div>\n    ';
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