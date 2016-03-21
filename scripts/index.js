// Config
const API_KEY = 'H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_';
const imgQuality = 1;
const defaultImgUrl = 'default-thumbnail.png';
const defaultAspectRatio = 1.78;
const containerHeight = 0.84;
const defaultThumbnail = {
  url: defaultImgUrl,
  aspect_ratio: defaultAspectRatio
};

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
    this.thumbnail = (
      data.thumbnails &&
      data.thumbnails.length &&
      data.thumbnails[imgQuality]
    ) || defaultThumbnail;
  }
}

// View
class Thumnails {
  constructor(videos, containerId) {
    this.videos = videos;
    this.thumbnailContainer = document.getElementById(containerId);
  }

  render() {
    const thumbnails = this.videos.map(video => {
      const { thumbnail, title } = video;
      const thumbnailHeight = (100 / thumbnail.aspect_ratio) * containerHeight;

      return `
        <div class="thumbnail" style="height: ${thumbnailHeight + 'vw'}">
          <img class="thumbnail-img" src="${thumbnail.url}" />
          <span class="caption">${title}</span>
        </div>
      `;
    });

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
