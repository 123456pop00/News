<template>
  <div>
    <div
      v-if="IsEdit"
      class="
        align-center
        cursor-pointer
        d-flex
        justify-space-between
        ml-4
        mr-4
        position-relative
      "
      style="width: 100%; padding: 6px 0px"
    >
      <div @click="emitBack()">
        <i class="fas fa-arrow-left mr-3"></i>
        Trở lại danh sách
      </div>
    </div>
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
                >Tiêu đề bài viết</label
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
              <div v-if="IsEdit && edittingModel && !ThumbnailNews">
                <img :src="edittingModel.Thumbnail" style="max-width: 700px" />
              </div>
              <div class="d-flex font-13 mb-3 mt-5">
                <image-uploader
                  id="fileInput2"
                  :preview="true"
                  :maxSize="2"
                  :autoRotate="true"
                  :quality="0.9"
                  outputFormat="file"
                  @input="changeThumbnailNews"
                  v-model="ThumbnailNews"
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
                  v-if="ThumbnailNews != null"
                  @click="deleteImage2"
                  style="color: #9e0c10; margin-left: 20px"
                  class="font-weight cursor-pointer font-14"
                >
                  Xóa ảnh
                </label> -->
              </div>
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
              <div
                v-if="IsEdit && edittingModel && !ThumbnailVideo && !fileUpload"
              >
                <img
                  :src="edittingModel.VideoThumbnail"
                  style="max-width: 700px"
                />
              </div>
              <div class="d-flex font-13 mb-3 mt-5">
                <image-uploader
                  :preview="true"
                  :maxSize="2"
                  :autoRotate="true"
                  :quality="0.9"
                  outputFormat="file"
                  v-model="ThumbnailVideo"
                  class="ImageUpload"
                  @input="changeThumbnailVideo"
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
                  v-if="ThumbnailVideo != null"
                  @click="deleteImage"
                  style="color: #9e0c10; margin-left: 20px"
                  class="font-weight cursor-pointer font-14"
                >
                  Xóa ảnh
                </label> -->
              </div>
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
                @change="changeVideo"
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
        </v-col>
        <v-col cols="2"> </v-col>
      </v-row>
      <v-row>
            <v-col cols="2"></v-col>
            <v-col>
              <div v-if="IsEdit && fileUpload == null">
                <iframe
                  width="500"
                  height="315"
                  style="border: none"
                  :src="
                    edittingModel.YoutubeLink != null
                      ? edittingModel.YoutubeLink
                      : edittingModel.VideoLink
                  "
                >
                </iframe>
              </div>
            </v-col>
          </v-row>
    </v-col>
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
  props: {
    IsEdit: false,
    edittingModel: null,
  },
  data() {
    return {
      VideoInfo: null,
      headersPost: {
        Authorization: `Bearer a6847fdbcfa64e0fd2fff66da4d76465`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
        "Content-Type": "application/json",
      },
      newsModel: {
        ID: 0,
        Content: "<p> Content chất lượng cao</p>",
        Title: "Đây là title bài viết",
        VideoLink: null,
        VideoID: null,
        Thumbnail: null,
        VideoThumbnail: null,
        VideoTitle: null,
        VideoInfo: null
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
      checkTitle:
        "aàảãáạăằẳẵắặâầẩẫấậ,AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ,dđ,DĐ,eèẻẽéẹêềểễếệ,EÈẺẼÉẸÊỀỂỄẾỆ,iìỉĩíị,IÌỈĨÍỊ,oòỏõóọôồổỗốộơờởỡớợ,OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ,uùủũúụưừửữứự,UÙỦŨÚỤƯỪỬỮỨỰ,yỳỷỹýỵ,YỲỶỸÝỴ",
      client: null,
    };
  },
  computed: {
    isDisableSave() {
      return (
        (!this.ThumbnailNews && !this.edittingModel?.Thumbnail) ||
        this.videoModel == null ||
        this.videoModel.Title.length == 0
      );
    },
    finalUploading() {
      if (this.creatingVideo + this.uploadingNews > 0) {
        return Math.ceil(
          (this.creatingVideo + this.uploadingNews + this.uploadingProcess) / 3
        );
      }

      return 0;
    },
  },
  methods: {
    emitBack() {
      this.$emit("back-event", true);
    },
    cleanString(input) {
      var output = "";
      for (var i = 0; i < input.length; i++) {
        if (
          input.charCodeAt(i) <= 127 ||
          this.checkTitle.includes(input.charAt(i))
        ) {
          output += input.charAt(i);
        }
      }
      return output;
    },
    saveNews(link) {
      const me = this;

      let uri = me.IsEdit ? "/news/UpdateNews" : "/news/CreateNews";

      var param = {
        Video: me.videoModel,
        News: me.newsModel,
      };

      if (!me.fileUpload || me.fileUpload.size == 0) {
        param.Video = null;
      }

      apiClient
        .post(uri, param, {
          onUploadProgress: (progressEvent) => {
            me.uploadingNews =
              Math.ceil(progressEvent.loaded / progressEvent.total) * 100;
          },
        })
        .catch(() => {
          alert("Đã có lỗi xảy ra!");
        })
        .then((res) => {
          if (res && res.Success) {
            if (link != null && me.fileUpload != null) {
              me.uploadVideo(link);
            }
            else {
              me.resetValue();
            }
          } else {
            alert("Không lưu được bài viết");
            me.resetValue();
          }
        });
    },
    save() {
      const me = this;

      eventBus.ShowLoading();

      // không cập nhật video
      if (me.IsEdit && me.fileUpload == null) {
        if (me.ThumbnailVideo == null && me.ThumbnailNews == null) {
          me.saveNews(null);
        } else {
          me.saveImage(
            me.VideoInfo.metadata.connections.pictures.uri,
            me.VideoInfo.upload.upload_link
          );
        }

        return;
      }

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

            // Nếu có video thì lưu Thumbnail video
            if (me.ThumbnailVideo != null) {
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
              })
            }
            else {
              me.saveNews(videoUploadLink);
            }
            
            // Lưu Thumbnail của bài viết
            if (me.ThumbnailNews != null)
            {
              client2
              .put(response.data.link, me.ThumbnailNews)
              .then((response) => {
                if (response.status == 200) {
                  console.log("upload thumbnail success");
                }
              });
            }
            
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
        ID: 0,
        Content: "<p> Content chất lượng cao</p>",
        Title: "Đây là title bài viết",
        VideoLink: null,
        VideoID: null,
        Thumbnail: null,
        VideoThumbnail: null,
        VideoTitle: null,
        VideoInfo: null
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
      if (this.IsEdit){
        this.emitBack();
      }
    },
    showError() {
      alert("Cập nhật dữ liệu thất bại!!");
      eventBus.HidenLoading();
    },
    changeThumbnailVideo() {
      if (this.edittingModel) {
        this.edittingModel.VideoThumbnail = null;
      }
    },
    changeThumbnailNews() {
      if (this.edittingModel) {
        this.edittingModel.Thumbnail = null;
      }
    },
    changeVideo() {
      if (this.IsEdit) {
        this.ThumbnailVideo = null;
        this.newsModel.VideoThumbnail = null;
        this.edittingModel.VideoThumbnail = null;
      }
    }
  },
  created: function () {
    const me = this;

    if (me.IsEdit && me.edittingModel) {
      me.newsModel = me.edittingModel;
      me.VideoInfo = me.edittingModel?.VideoInfo ? JSON.parse(me.edittingModel.VideoInfo) : null;

      if (!me.VideoInfo) {        
        emitBack();
      }
    }

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
row {
  margin-top: 24px;
}
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