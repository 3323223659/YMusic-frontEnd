<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :on-change="handleChange"
      :auto-upload="false"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip" style="margin: 0px 280px 0px 0px">
        只能上传3MB内的jpg/png/gif/bmp文件
      </div>
    </el-upload>
    <el-button type="primary" @click="submitForm" style="width: 300px; margin-right: 200px">上传</el-button>
  </div>
</template>

<script>
import { uploadImage } from '@/api/common'

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
     
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ].includes(file.type);
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG PNG GIF BMP 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt3M;
    },
    handleChange(file) {
      this.file = file.raw;
      this.$emit("input", URL.createObjectURL(file.raw));
    },
    async submitForm() {
      if (!this.file) {
        this.$message.error("请选择一个图片文件");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);

      const path = await uploadImage(formData)
      this.$message.success('上传完成')
      this.$emit("input", path);
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 300px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

