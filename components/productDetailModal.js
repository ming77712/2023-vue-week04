export default {
  props: ["currentDetailProduct"],
  data() {
    return {
      productDetailModal: null,
    };
  },
  template: `<div
        id="productDetailModal"
        ref="productDetailModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productDetailModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <template v-if="currentDetailProduct.title">
              <div class="modal-header bg-dark text-white">
                <h4 id="productDetailModalLabel" class="modal-title">
                  <span>{{ currentDetailProduct.title }}</span>
                </h4>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="card mb-3">
                  <div class="card-body d-flex">
                    <img
                      :src="currentDetailProduct.imageUrl"
                      class="primary-image me-2"
                      alt="主圖"
                    />
                    <div>
                      <h4 class="card-title mb-4">
                        {{ currentDetailProduct.title }}
                        <span class="badge bg-primary ms-2"
                          >{{ currentDetailProduct.category }}</span
                        >
                      </h4>
                      <p class="card-text">
                        商品描述：{{ currentDetailProduct.description }}
                      </p>
                      <p class="card-text">
                        商品內容：{{ currentDetailProduct.content }}
                      </p>
                      <div class="d-flex">
                        <p class="card-text me-2">{{ currentDetailProduct.price }}</p>
                        <p class="card-text text-secondary">
                          <del>{{ currentDetailProduct.origin_price }}</del>
                        </p>
                        元 / 個
                      </div>
                    </div>
                  </div>
                </div>
                <template
                  v-for="(image, index) in currentDetailProduct.imagesUrl"
                  :key="index"
                >
                  <img :src="image" alt="" class="images m-2" />
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>`,
  mounted() {
    this.productDetailModal = new bootstrap.Modal(
      this.$refs.productDetailModal
    );
    this.$emit("productDetailInstance", this.productDetailModal);
  },
};
