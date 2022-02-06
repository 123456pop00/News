<template>
  <div>
    <v-col>
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col cols="8" style="padding-top: 40px">
          <!-- <h1 style="margin-bottom: 20px">Đăng Video</h1> -->
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
                v-model="videoModel.Title"
            /></v-col>
          </v-row>

          <!-- <div class="flex w-full h-screen items-center justify-center text-center" id="app">
            <div class="p-12 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
              <input type="file"  name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                class="w-px h-px opacity-0 overflow-hidden absolute" @change="pustdata" ref="file" accept="video/*" />
              
              <label for="assetsFieldHandle" class="block cursor-pointer">
                <div>
                  Explain to our users they can drop files in here 
                  or <span class="underline">click here</span> to upload their files
                </div>
              </label>
              <ul class="mt-4" v-if="this.filelist.length" v-cloak>
                <li class="text-sm p-1" v-for="file in filelist">
                  ${ file.name }<button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
                </li>
              </ul>
            </div>
          </div> -->
          <v-row>
            <v-col cols="2" style="display: flex"
              ><label style="align-self: center" for="titlevideo"
                >Tải lên video</label
              ></v-col
            >
            <v-col cols="10">
              <v-file-input
                v-model="fileUpload"
                counter
                show-size
                truncate-length="28"
                accept="video/*"
              ></v-file-input
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="2" style="display: flex"
              ><label style="align-self: center" for="titlevideo"
                >Thumbnail</label
              ></v-col
            >
            <v-col cols="10">
              <div class="d-flex font-13 mb-3 mt-5" style="">
                <image-uploader
                  :preview="true"
                  :debug="1"
                  :autoRotate="true"
                  :maxWidth="750"
                  :maxHeight="600"
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
                <label
                  v-if="ThumbnailVideo"
                  @click="deleteImage"
                  style="color: #9e0c10; margin-left: 20px"
                  class="font-weight cursor-pointer font-14"
                >
                  Xóa ảnh
                </label>
              </div>
              <!-- <img
                v-if="ThumbnailVideo"
                id="img-detail-event"
                class="flex-1-1-auto"
                v-bind="ThumbnailVideo"
                style="width: 100%; border-radius: 10px; height: 375px"
                alt=""
            /> -->
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
          <v-row>
            <v-col cols="2"></v-col>
            <v-col>
              <div style="display: flex">
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
              </div></v-col
            >
          </v-row>
        </v-col>
        <v-col cols="2"> </v-col>
      </v-row>
    </v-col>

    <div v-html="videoframe"></div>
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
  name: "VideoView",
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
      ThumbnailVideo: null,
      newsModel: {
        Content: "<p> Content chất lượng cao</p>",
        Title: "Đây là title bài viết",
        VideoLink: null,
        VideoID: null,
        Thumbnail: null,
      },
      videoModel: {
        Title: "Title video là đây",
        VideoInfo: null,
        VideoLink: null,
        Thumbnail: null,
        Tags: null,
      },
      uploadingSize: "0",
      uploadingProcess: 0,
      uploadingNews: 0,
      creatingVideo: 0,
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
        this.ThumbnailVideo == null ||
        this.ThumbnailVideo.length == 0 ||
        this.fileUpload == null ||
        this.fileUpload.size < 0
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
    saveVideo(link) {
      const me = this;
      apiClient
        .post("/video/UploadVideo", me.videoModel, {
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
            me.uploadVideo(link);
          } else {
            alert("Không lưu được bài viết");
            me.resetValue();
          }
        });
    },
    setImage1: function (file) {
      this.ThumbnailVideo = file;
    },
    deleteImage() {
      this.ThumbnailVideo = null;
    },
    save() {
      const me = this;

      eventBus.ShowLoading();

      if (me.fileUpload && me.fileUpload.size > 0) {
        const data = {
          upload: {
            approach: "tus",
            size: me.fileUpload?.size,
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
      }
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
        })
        .then((response) => {
          if (response && response.status == 201 && response.data.link) {
            me.videoModel.Thumbnail = response.data.base_link;
            me.saveVideo(videoUploadLink);

            client2
              .put(response.data.link, me.ThumbnailVideo)
              .then((response2) => {
                if (response2.status == 200) {
                  console.log("upload thumbnail success");

                  // active thubnail
                  me.client
                    .patch(
                      `https://api.vimeo.com${response.data.uri}`,
                      { active: true },
                      {
                        headers: {
                          Authorization:
                            "Bearer a6847fdbcfa64e0fd2fff66da4d76465",
                          "Content-Type": "application/json",
                          Accept: "application/vnd.vimeo.*+json;version=3.4",
                        },
                      }
                    )
                    .catch(() => {
                    })
                    .then((response2) => {});
                }
              });
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
      //me.uploadProgress(client2, link);
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
            if (me.creatingVideo + me.uploadingNews > 0) {
              me.uploadingProcess = Math.ceil(
                parseFloat(
                  response2.headers["upload-offset"] /
                    response2.headers["upload-length"]
                ).toFixed(2) * 100
              );
            }
          });

        if (me.uploadingProcess == 100) {
          clearInterval(interval);
        }
      }, 750);
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
    resetValue() {
      document
        .getElementsByClassName("img-preview")
        .forEach((x) => (x.src = ""));

      this.uploadingSize = "0";
      this.uploadingProcess = 0;
      this.creatingVideo = 0;
      this.uploadingNews = 0;
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
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    toBinary(base64Data) {
      base64Data = base64Data.replace(/^data:image\/(png|jpg|gif);base64,/, "");
      base64Data += base64Data.replace("+", " ");
      return Buffer(base64Data, "base64").toString("binary");
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
<style lang="scss">
#fileInput {
  display: none !important;
}
.img-preview {
  // margin-bottom: 14px;
  // display: none;
}
.button-noti {
  padding: 9px 24px;

  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  background-color: #a41a1e;
}
// .ImageUpload {
//   display: inline-grid;
//   justify-items: center;
// }
</style>