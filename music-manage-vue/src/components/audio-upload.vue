<template>
  <div>
    <div v-if="value">
      <audio :src="value" controls  style="width: 300px; margin-right: 100px" preload="metadata"></audio>
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-change="handleChange"
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :on-exceed="handleExceed"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin: 0px 100px 0px 40px"
        size="small"
        type="success"
        @click="submitForm"
        >上传</el-button
      >
      <div class="el-upload__tip" slot="tip" style="margin-right:300px">
        只能上传30MB内的MP3文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadAudio } from "@/api/common";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    beforeAvatarUpload(file) {
      const isMP3 = ["audio/mpeg"].includes(file.type);
      const isMP30 = file.size / 1024 / 1024 < 30;

      if (!isMP3) {
        this.$message.error("上传文件只能是 MP3 格式!");
      }
      if (!isMP30) {
        this.$message.error("上传文件大小不能超过 30MB!");
      }
      return isMP3 && isMP30;
    },
    handleChange(file) {
      this.file = file.raw;
      this.$emit("input", URL.createObjectURL(file.raw));
    },
    async submitForm() {
      if (!this.file) {
        this.$message.error("请选择一个音频文件");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);

      const path = await uploadAudio(formData);
      this.$message.success('上传完成')
      this.$emit("input", path);
    },
    handleExceed() {
      this.$message.warning('只能选择一个音频文件');
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.file = null;
      this.$emit("input", '');
    }
  },
};
</script>
