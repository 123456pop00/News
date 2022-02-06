<template>
  <div>
    <v-form ref="form">
      <v-col>
        <v-row>
          <v-col cols="2"> </v-col>
          <v-col cols="8">
            <h1 style="margin-bottom: 20px; margin-top: 20px; color: #a41a1e">
              Tạo bài viết mới và đính kèm video
            </h1>
            <v-row>
              <v-col cols="2" style="display: flex"
                ><label style="align-self: center" for="titlevideo"
                  >Tiêu đề video</label
                ></v-col
              >
              <v-col cols="10"
                ><input
                  class="text-insert text-input"
                  style="margin-bottom: 16px"
                  type="text"
                  placeholder="Tiêu đề bài viết"
                  id="nameEvent"
                  v-model="newsModel.Title"
              /></v-col>
            </v-row>
            <v-row style="margin-bottom: 16px">
              <v-col cols="2" style="display: flex"
                ><label style="align-self: center" for="titlevideo"
                  >Thumbnail bài viết</label
                ></v-col
              >
              <v-col cols="10">
                <div class="d-flex font-13 mb-3 mt-5">
                  <image-uploader
                    id="fileInput2"
                    :preview="true"
                    :maxSize="2"
                    :autoRotate="true"
                    :quality="0.9"
                    outputFormat="file"
                    @input="setImage2"
                    class="ImageUpload"
                  >
                    <label
                      for="fileInput2"
                      slot="upload-label"
                      style="color: #9e0c10"
                      class="font-weight cursor-pointer font-14"
                    >
                      Thay ảnh Thumnail
                    </label>
                  </image-uploader>
                  <!-- <label
                  v-if="newsModel.Thumbnail != null"
                  @click="deleteImage2"
                  style="color: #9e0c10; margin-left: 20px"
                  class="font-weight cursor-pointer font-14"
                >
                  Xóa ảnh
                </label> -->
                </div>
                <!-- <img
                v-if="newsModel.Thumbnail != null"
                id="img-detail-event"
                class="flex-1-1-auto"
                v-bind:src="newsModel.Thumbnail"
                style="width: 100%; border-radius: 10px; height: 375px"
                alt=""
            /> -->
              </v-col>
            </v-row>

            <tiptap-vuetify
              class="tip-tap-ok"
              v-model="newsModel.Content"
              style="margin-bottom: 16px"
              :extensions="extensions"
              :toolbar-attributes="{ color: 'red' }"
            />

            <v-row>
              <v-col cols="2" style="display: flex"
                ><label style="align-self: center" for="titlevideo"
                  >Tiêu đề video</label
                ></v-col
              >
              <v-col cols="10"
                ><input
                  class="text-insert text-input"
                  type="text"
                  placeholder="Tiêu đề video"
                  id="nameEvent"
                  v-model="newsModel.VideoTitle"
              /></v-col>
            </v-row>
            <v-row>
              <v-col cols="2" style="display: flex"
                ><label style="align-self: center" for="titlevideo"
                  >Thumbnail</label
                ></v-col
              >
              <v-col cols="10">
                <div class="d-flex font-13 mb-3 mt-5">
                  <image-uploader
                    :preview="true"
                    :maxSize="2"
                    :autoRotate="true"
                    :quality="0.9"
                    outputFormat="file"
                    @input="setImage1"
                    class="ImageUpload"
                  >
                    <label
                      for="fileInput"
                      slot="upload-label"
                      style="color: #9e0c10"
                      class="font-weight cursor-pointer font-14"
                    >
                      Thay ảnh Thumnail
                    </label>
                  </image-uploader>
                  <!-- <label
                  v-if="videoModel.Thumbnail != null"
                  @click="deleteImage"
                  style="color: #9e0c10; margin-left: 20px"
                  class="font-weight cursor-pointer font-14"
                >
                  Xóa ảnh
                </label> -->
                </div>
                <!-- <img
                v-if="videoModel.Thumbnail != null"
                id="img-detail-event2"
                class="flex-1-1-auto"
                v-bind:src="videoModel.Thumbnail"
                style="width: 100%; border-radius: 10px; height: 375px"
                alt=""
            /> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" style="display: flex"
                ><label style="align-self: center" for="titlevideo"
                  >Tải lên video</label
                ></v-col
              >
              <v-col cols="10">
                <v-file-input
                  counter
                  v-model="fileUpload"
                  show-size
                  truncate-length="28"
                  accept="video/*"
                ></v-file-input>
              </v-col>
            </v-row>
            <div v-if="finalUploading > 0" style="margin: 16px">
              <v-progress-linear
                v-model="finalUploading"
                color="deep-orange"
                height="25"
                striped
              >
                <template>
                  <strong>{{ finalUploading }}%</strong>
                </template>
              </v-progress-linear>
            </div>

            <button
              :disabled="isDisableSave"
              v-bind:style="[
                isDisableSave
                  ? { 'background-color': '#cd8183', cursor: 'none' }
                  : {},
              ]"
              class="button-noti mr-3"
              @click="save"
            >
              Lưu bài viết
            </button>
            <!-- <button
            class="button-noti mr-3"
            style="color: #9e0c10; border: 1px solid #d9d9d9"
            @click="saveVideo"
          >
            Upload video
          </button> -->
          </v-col>
          <v-col cols="2"> </v-col>
        </v-row>
      </v-col>
    </v-form>
    <!-- <div v-html="videoframe"></div> -->
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from "tiptap-vuetify";
import "@/styles/overrides.sass";
import "@/styles/custom-luna.scss";
import axios from "axios";
import apiClient from "../services/APIClient";
import ImageUploader from "vue-image-upload-resize";
import { eventBus } from "../main.js";
export default {
  name: "NewsView",
  components: {
    TiptapVuetify,
    ImageUploader,
  },
  data() {
    return {
      headersPost: {
        Authorization: `Bearer a6847fdbcfa64e0fd2fff66da4d76465`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
        "Content-Type": "application/json",
      },
      newsModel: {
        Content: "<p> Content chất lượng cao</p>",
        Title: "Đây là title bài viết",
        VideoLink: null,
        VideoID: null,
        Thumbnail: null,
        VideoThumbnail: null,
        VideoTitle: null,
      },
      ThumbnailVideo: null,
      ThumbnailNews: null,
      uploadingSize: "0",
      uploadingProcess: 0,
      uploadingNews: 0,
      creatingVideo: 0,
      videoModel: {
        Title: "title video này",
        VideoInfo: null,
        VideoLink: null,
        Thumbnail: null,
        Tags: null,
      },
      videoframe: null,
      fileUpload: null,
      extensions: [
        History,
        Image,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      client: null,
    };
  },
  computed: {
    isDisableSave() {
      return (
        this.ThumbnailNews == null ||
        this.videoModel == null ||
        this.videoModel.Title.length == 0
      );
    },
    finalUploading() {
      // if (this.creatingVideo + this.uploadingNews > 0) {
      //   return Math.ceil(
      //     (this.creatingVideo + this.uploadingNews + this.uploadingProcess) / 3
      //   );
      // }

      return 0;
    },
  },
  methods: {
    saveNews(link) {
      const me = this;

      var param = {
        Video: me.videoModel,
        News: me.newsModel,
      };

      if (!me.fileUpload || me.fileUpload.size == 0) {
        param.Video = null;
      }

      apiClient
        .post("/news/CreateNews", param, {
          onUploadProgress: (progressEvent) => {
            me.uploadingNews =
              Math.ceil(progressEvent.loaded / progressEvent.total) * 100;
          },
        })
        .catch(() => {
          alert("Đã có lỗi xảy ra!");
          eventBus.HidenLoading();
        })
        .then((res) => {
          if (res && res.Success) {
            me.uploadVideo(link);
            me.resetValue();
          } else {
            alert("Không lưu được bài viết");
            me.resetValue();
          }
        });
    },
    save() {
      const me = this;

      eventBus.ShowLoading();

      
      const data = {
        upload: {
          approach: "tus",
          size: me.fileUpload?.size ? me.fileUpload?.size : 100,
        },
        name: me.videoModel?.Title,
        embed: {
          title: {
            name: "show",
            owner: "hide",
            portrait: "hide",
          },
          buttons: {
            hd: true,
            like: true,
            scaling: true,
            share: true,
            watchlater: false,
          },
        },
      };
      me.client
        .post("https://api.vimeo.com/me/videos", data)
        .catch(() => {
          alert("Không tạo được video!");
          eventBus.HidenLoading();
        })
        .then((response) => {
          if (response.status == 200 && response.data.upload?.upload_link) {
            me.videoModel.VideoInfo = JSON.stringify(response.data);
            me.videoModel.VideoLink = response.data.player_embed_url;
            // VideoInfo: null,
            // VideoLink: null,
            // Thumbnail: null,
            // Tags: null,
            me.saveImage(
              response.data.metadata.connections.pictures.uri,
              response.data.upload.upload_link
            );
          } else {
            me.showError();
          }
        });
    
    },
    uploadVideo(link) {
      const me = this;
      me.uploadingSize = 0;
      let headersPatch = {
        "Tus-Resumable": "1.0.0",
        "Upload-Offset": me.uploadingSize,
        "Content-Type": "application/offset+octet-stream",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      };
      let client2 = axios.create({
        withCredentials: false,
        headers: headersPatch,
      });
      if (me.fileUpload && me.fileUpload.size > 0) {
        me.uploadProgress(client2, link);
      }
      me.doUploadVideo(client2, headersPatch, link);
    },
    uploadProgress(client2, link) {
      const me = this;
      var interval = setInterval(function () {
        client2
          .head(link, me.fileUpload, {
            headers: {
              "Tus-Resumable": "1.0.0",
              Accept: "application/vnd.vimeo.*+json;version=3.4",
            },
          })
          .then((response2) => {
            me.uploadingProcess = Math.ceil(
              parseFloat(
                response2.headers["upload-offset"] /
                  response2.headers["upload-length"]
              ).toFixed(2) * 100
            );
          });

        if (me.uploadingProcess == 100) {
          clearInterval(interval);
        }
      }, 500);
    },
    // đệ quy
    doUploadVideo(client2, headersPatch, link) {
      const me = this;
      headersPatch["Upload-Offset"] = me.uploadingSize;
      client2
        .patch(link, me.fileUpload, {
          headers: headersPatch,
          withCredentials: false,
        })
        .then((response2) => {
          me.uploadingSize = response2.headers["upload-offset"];
          if (me.uploadingSize != me.fileUpload.size) {
            doUploadVideo(client2, headersPatch, link);
          } else {
            me.resetValue();
          }
        });
    },
    saveImage(imgUploadLink, videoUploadLink) {
      const me = this;
      let fileType = me.ThumbnailVideo?.type.substring("image/".length);

      let headersPut = {
        "Content-Type": `image/${fileType}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      };
      let client2 = axios.create({
        withCredentials: false,
        headers: headersPut,
      });

      me.client
        .post(`https://api.vimeo.com${imgUploadLink}`, {
          onUploadProgress: (progressEvent) => {
            me.creatingVideo =
              Math.ceil(progressEvent.loaded / progressEvent.total) * 100;
          },
          headers: {
            Authorization: "Bearer a6847fdbcfa64e0fd2fff66da4d76465",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        })
        .catch(() => {
          console.log("không tạo đc resource để lưu ảnh");
          eventBus.HidenLoading();
        })
        .then((response) => {
          if (response && response.status == 201 && response.data.link) {
            me.newsModel.Thumbnail = response.data.base_link;

            if (me.fileUpload && me.fileUpload.size > 0) {
              me.client
                .post(`https://api.vimeo.com${imgUploadLink}`, {
                  onUploadProgress: (progressEvent) => {
                    me.creatingVideo =
                      Math.ceil(progressEvent.loaded / progressEvent.total) *
                      100;
                  },
                  headers: {
                    Authorization: "Bearer a6847fdbcfa64e0fd2fff66da4d76465",
                    Accept: "application/vnd.vimeo.*+json;version=3.4",
                  },
                })
                .catch(() => {
                  console.log("không tạo đc resource để lưu ảnh");
                  eventBus.HidenLoading();
                })
                .then((response2) => {
                  if (
                    response2 &&
                    response2.status == 201 &&
                    response2.data.link
                  ) {
                    me.newsModel.VideoThumbnail = response2.data.base_link;
                    me.saveNews(videoUploadLink);

                    client2
                      .put(response2.data.link, me.ThumbnailVideo)
                      .then((response3) => {
                        me.client.patch(
                          `https://api.vimeo.com${response2.data.uri}`,
                          { active: true },
                          {
                            headers: {
                              Authorization:
                                "Bearer a6847fdbcfa64e0fd2fff66da4d76465",
                              "Content-Type": "application/json",
                              Accept:
                                "application/vnd.vimeo.*+json;version=3.4",
                            },
                          }
                        );
                      });
                  } else {
                    me.showError();
                  }
                });
            } else {
              me.saveNews(videoUploadLink);
            }

            client2
              .put(response.data.link, me.ThumbnailNews)
              .then((response) => {
                if (response.status == 200) {
                  console.log("upload thumbnail success");
                }
              });
          } else {
            me.showError();
          }
        });
    },
    resetValue() {
      document
        .getElementsByClassName("img-preview")
        .forEach((x) => (x.src = ""));
      this.uploadingSize = "0";
      this.uploadingProcess = 0;
      this.creatingVideo = 0;
      this.uploadingNews = 0;
      this.newsModel = {
        Content: "<p> Content chất lượng cao</p>",
        Title: "Đây là title bài viết",
        VideoLink: null,
        VideoID: null,
        Thumbnail: null,
        VideoThumbnail: null,
        VideoTitle: null,
      };
      this.videoModel = {
        Title: "title video này",
        VideoInfo: null,
        VideoLink: null,
        Thumbnail: null,
        Tags: null,
      };
      this.videoframe = null;
      this.fileUpload = null;
      this.ThumbnailVideo = null;
      this.ThumbnailNews = null;
      eventBus.HidenLoading();
    },
    showError() {
      alert("Cập nhật dữ liệu thất bại!!");
      eventBus.HidenLoading();
    },
    setImage1: function (file) {
      this.ThumbnailVideo = file;
    },
    setImage2: function (file) {
      this.ThumbnailNews = file;
    },
    deleteImage() {
      this.videoModel.Thumbnail = null;
    },
    deleteImage2() {
      this.newsModel.Thumbnail = null;
    },
  },
  created: function () {
    const me = this;
    this.client = axios.create({
      withCredentials: false,
      headers: me.headersPost,
    });
  },
};
</script>
<style scoped>
.button-detail {
  background: #ffffff;
  border: 1px solid #9e0c10;
  box-sizing: border-box;
  width: 78px;
  height: 32px;
  border-radius: 6px;
  color: #9e0c10;
}

.button-noti {
  padding: 9px 24px;

  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  background-color: #a41a1e;
}
</style>

<style>
#fileInput {
  display: none !important;
}
#fileInput2 {
  display: none !important;
}
.img-preview {
  margin-top: 14px;
}

.ImageUpload {
  display: flex;
  flex-direction: column-reverse;
}
</style>