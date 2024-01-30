export default {
  data() {
    return {
      uploadImgModal: null,
      img: null,
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
      axios
        .post(
          `${urlSetting.url}/api/${urlSetting.path}/admin/upload`,
          {
            data: this.img,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          //   this.setSweetMessageSuccess(res.data.message);
          //   Swal.fire(this.sweetMessage);
          //   setTimeout(() => {
          //     this.delProductModal.hide();
          //     this.$emit("refreshProducts");
          //   }, 1500);
        })
        .catch((err) => {
          console.log(err);
          //   this.setSweetMessageError(err.data.message);
          //   Swal.fire(this.sweetMessage);
        });
    },
    handleUploadImg(e) {
      this.img = e.target.files[0];
      console.log(this.img);
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
