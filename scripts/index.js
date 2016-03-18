const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
const imgQuality = 1;

// Model
class Video {
  static requestVideos() {
    const formatVideos = (payload) => {
      const data = payload.data.response;
      return Video.all = data.map(videoObj => new Video(videoObj, imgQuality));
    }

    return axios
      .get(`https://api.zype.com/videos/?api_key=${API_KEY}`)
      .then(formatVideos);
  }

  constructor(data, imgQuality) {
    this.title = data.title;
    // Could be cleaned up with lodash's `get` function
    this.imgUrl = (
      data.thumbnails &&
      data.thumbnails.length &&
      data.thumbnails[imgQuality] &&
      data.thumbnails[imgQuality].url
    ) || 'default-thumbnail.png';
  }
}

// View
class Thumnails {
  constructor(videos, containerId) {
    this.videos = videos;
    this.thumbnailContainer = document.getElementById(containerId);
  }

  render() {
    const thumbnails = this.videos.map(video => `
      <div class="thumbnail">
        <img class="thumbnail-img" src="${video.imgUrl}" />
        <span class="caption">${video.title}</span>
      </div>
    `);

    this.thumbnailContainer.innerHTML = thumbnails.join('');
  }
}

// Controller
class ThumbnailPage {
  constructor(mountId) {
    this.mountId = mountId;

    return Video.requestVideos()
      .then(videos => {
        this.videos = videos;
        this.view = new Thumnails(this.videos, this.mountId);
        this.view.render();
      });
  }
}

window.onload = () => new ThumbnailPage('thumbnail-container');
