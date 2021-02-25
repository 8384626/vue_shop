<template>
  <div class="add-card-view">
    <el-card>
      <div>
        <el-alert
          title="添加商品信息"
          type="info"
          center
          show-icon
          :closable="false"
        >
        </el-alert>
      </div>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的Item项 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableDate"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableDate"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action 表示图片要上传的后台API地址 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headterObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="addData">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <el-image :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 导入富文本编辑器对应的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core"
// 导入富文本编辑器
import { quillEditor } from "vue-quill-editor";
import _ from 'lodash'

export default {
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
    manyTableDate: {
      type: Array,
      default() {
        return [];
      },
    },
    onlyTableDate: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeIndex: "0",
      // 添加商品的表单数据对象
      addForm: {
        goods_name: "",
        goods_price: null,
        goods_weight: null,
        goods_number: null,
        // 商品所属的分类数组
        goods_cat: [],
        pics: [],
        goods_introduce:'',
        attrs:[]
      },
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", tigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", tigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", tigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", tigger: "blur" },
        ],
        goods_cat: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: ["blur", "change"],
          },
        ],
      },
      cateProps: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      uploadURL: "http://www.ysqorz.top:8888/api/private/v1/upload",
      // 图片上传图片的headers请求对象
      headterObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      previewPath: "",
      previewVisible: false,
    };
  },
  methods: {
    getCateList() {
      this.$emit("getCateList");
    },
    // 级联选择器选中项变化触发
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择三级商品");
        this.addForm.goods_cat = [];
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请核对表单信息");
        return false;
      }
    },
    tabClicked() {
      if (this.activeIndex === "1") {
        this.$emit("getCateParamList", { id: this.cateParamId, sel: "many" });
      } else if (this.activeIndex === "2") {
        this.$emit("getCateParamList", { id: this.cateParamId, sel: "only" });
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file);
      this.previewPath = file.url;
      this.previewVisible = true;
    },
    // 处理移除图片的操作
    handleRemove(file) {
      console.log(file);
      const filePath = file.response.data.tem_path;
      const i = this.addForm.pics.findIndex((x) => {
        return x.pic === filePath;
      });
      this.addForm.pics.splice(i, 1);
      console.log(this.addForm);
    },
    handleSuccess(response) {
      console.log(response);
      const picInfo = { pic: response.data.tmp_path };
      this.addForm.pics.push(picInfo);
      console.log(this.addForm);
    },
    addData(){
      this.$refs.addFormRef.validate(valid =>{
        if(!valid) return this.$message.error('请完善基本信息');
        const form = _.cloneDeep(this.addForm)
        form.goods_cat=form.goods_cat.join(',')
        // 处理动态参数
        this.manyTableDate.forEach(item => {
          const newInfo= {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(',')
          }
          this.addForm.attrs.push(newInfo)
        })
        //处理静态属性
        this.onlyTableDate.forEach(item => {
          const newInfo= {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        console.log(form);

        // 发起请求添加商品
        this.$emit('setCateDate', form);
      })
    }
  },
  computed: {
    cateParamId() {
      if (this.addForm.goods_cat.length === 3) return this.addForm.goods_cat[2];
      return null;
    },
  },
  watch: {},
  created() {
    this.getCateList();
  },
  components: {
    quillEditor,
  },
};
</script>

<style scoped>
.add-card-view {
  max-height: calc(100vh - 150px);
  overflow-y: scroll;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.btnAdd{
  margin-top: 15px;
}
</style>