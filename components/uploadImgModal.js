export default {
  props: ["urlSetting"],
  data() {
    return {
      uploadImgModal: null,
      formData: null,
      imageUrl: "",
      sweetMessage: {
        icon: "",
        title: "",
        showConfirmButton: false,
        timer: 1500,
      },
    };
  },
  template:`
<div
      id="uploadImgModal"
      ref="uploadImgModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="uploadImgModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>上傳圖片</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
<div class="modal-body">
          <form>
          <input type="file" name="file-to-upload" @change="handleUploadImg">
          </form>
              <div>
                <img :src="imageUrl"/>
                    <div class="mb-4">
                          <label for="imgUrl" class="form-label">圖片位址</label>
                        <input
                          id="imgUrl"
                          type="text"
                          class="form-control"
                          :value="imageUrl"
                        />
                    </div>
              </div>
          </div>
<div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
            type="button"
            class="btn btn-primary"
            @click="uploadImg"
          >
          上傳
          </button>
          </div>
          
        </div>
      </div>
    </div>`,
  methods: {
    uploadImg() {
      if(typeof this.formData !== "object")
      return;
      axios
        .post(
          `${this.urlSetting.url}/api/${this.urlSetting.path}/admin/upload`, this.formData)
        .then((res) => {
          this.imageUrl = res.data.imageUrl;
          this.setSweetMessageSuccess("圖片新增成功");
          Swal.fire(this.sweetMessage);
        })
        .catch((err) => {
          this.setSweetMessageError(err.message);
          Swal.fire(this.sweetMessage);
        });
    },
    handleUploadImg(e) {
      this.formData = new FormData();
      this.formData.append("file-to-upload", e.target.files[0]);
    },
    setSweetMessageSuccess(res) {
      this.sweetMessage.icon = "success";
      this.sweetMessage.title = res;
      this.sweetMessage.timer = 1500;
    },
    setSweetMessageError(err) {
      this.sweetMessage.icon = "error";
      this.sweetMessage.title = err;
      this.sweetMessage.timer = 2500;
    },
  },
  mounted() {
    this.uploadImgModal = new bootstrap.Modal(this.$refs.uploadImgModal, {
      keyboard: false,
      backdrop: "static",
    });
    this.$emit("UploadImgInstance", this.uploadImgModal);
  },
};
