export default {
  props: ["currentProduct"],
  data() {
    return {
      delProductModal: null,
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
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
<div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ currentProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
<div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    delProduct() {
      axios
        .delete(
          `${urlSetting.url}/api/${urlSetting.path}/admin/product/${this.currentProduct.id}`
        )
        .then((res) => {
          this.setSweetMessageSuccess(res.data.message);
          Swal.fire(this.sweetMessage);
          setTimeout(() => {
            this.delProductModal.hide();
            this.$emit("refreshProducts");
          }, 1500);
        })
        .catch((err) => {
          this.setSweetMessageError(err.data.message);
          Swal.fire(this.sweetMessage);
        });
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
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false,
      backdrop: "static",
    });
    this.$emit("productDeleteInstance", this.delProductModal);
  },
};
