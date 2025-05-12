<template>
  <div>
    <el-container>
      <el-header>
        <h2>YMusic管理系统</h2>
        <h3>你好，管理员</h3>
        <el-button @click="logout" type="primary" round>退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link to="/statistic" class="no-underline"
              ><el-menu-item index="1">数据统计</el-menu-item></router-link
            >
            <router-link to="/user" class="no-underline"
              ><el-menu-item index="2">用户管理</el-menu-item></router-link
            >
            <router-link to="/music" class="no-underline"
              ><el-menu-item index="3">音乐管理</el-menu-item></router-link
            >
            <router-link to="/category" class="no-underline"
              ><el-menu-item index="4">分类管理</el-menu-item></router-link
            >
            <router-link to="/playlist" class="no-underline"
              ><el-menu-item index="5">歌单管理</el-menu-item></router-link
            >
            <router-link to="/singer" class="no-underline"
              ><el-menu-item index="6">歌手管理</el-menu-item></router-link
            >
          </el-menu></el-aside
        >
        <el-main>
          <div class="main">
            <h2>音乐管理</h2>
            <div>
              <label style="margin-left: 300px"> 歌曲名称： </label>
              <el-input
                v-model="pageParams.name"
                placeholder="请输入歌曲名称"
                style="width: 15%; margin: 0px 50px 30px 0px"
              />
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="pageQuery()"
                >查询</el-button
              >
              <el-button
                @click="showDialogMusic"
                style="margin-left: 525px"
                type="primary"
                >新增歌曲</el-button
              >
            </div>
            <el-table :data="list" style="width: 100%" border>
              <el-table-column
                prop="name"
                align="center"
                label="名称"
                width="160"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="singerName"
                align="center"
                label="歌手"
                width="160"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="categoryName"
                align="center"
                label="分类"
                width="160"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="path" align="center" label="播放">
                <template v-slot="{ row }">
                  <audio
                    :src="row.path"
                    controls
                    style="width: 300px"
                    preload="metadata"
                  ></audio>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                align="center"
                label="创建时间"
                width="160"
              >
              </el-table-column>
              <el-table-column
                prop="updateTime"
                align="center"
                label="修改时间"
                width="160"
              >
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="280"
              >
                <template v-slot="{ row }">
                  <el-button type="text" size="medium" @click="changeEdit(row.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="medium" @click="showPlaylist(row.id)"
                    >+歌单</el-button
                  >
                  <el-popconfirm
                    @onConfirm="confirmDel(row.id)"
                    title="确定删除此歌曲吗？"
                  >
                    <el-button
                      slot="reference"
                      type="text"
                      size="medium"
                      style="color: red; margin-left: 10px"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 30px 0px 0px 1000px">
              <el-pagination
                :page-size="pageParams.pageSize"
                :pager-count="5"
                :current-page="pageParams.pageNo"
                :total="pageParams.total"
                @current-change="changePage"
                layout="total,prev, pager, next"
              >
              </el-pagination>
              <el-dialog
                @close="btnCancel"
                width="700px"
                title="新增歌单"
                :visible.sync="showDialog"
              >
                <el-form
                  ref="musicForm"
                  :model="musicForm"
                  :rules="FormRules"
                  label-width="200px"
                >
                  <el-form-item prop="name" label="歌曲名称:">
                    <el-input
                      v-model="musicForm.name"
                      size="small"
                      style="width: 300px; margin-right: 200px"
                      maxlength="32"
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="name"
                    label="歌曲分类:"
                    style="display: inline-block; margin-right: 160px"
                  >
                    <div style="display: inline-block">
                      <select-category v-model="musicForm.categoryId" />
                    </div>
                  </el-form-item>
                  <el-form-item
                    prop="name"
                    label="歌手:"
                    style="display: inline-block; margin-right: 160px"
                  >
                    <div style="display: inline-block">
                      <select-singer v-model="musicForm.singerId" />
                    </div>
                  </el-form-item>
                  <el-form-item
                  style="display: inline-block"
                  prop="path"
                  label="音频文件:"
                >
                  <audio-upload ref="audioUploader" v-model="musicForm.path" />
                </el-form-item>
                  <el-form-item>
                    <el-row type="flex" justify="center">
                      <el-col :span="12">
                        <el-button @click="btnOK" type="primary" size="medium"
                          >确定</el-button
                        >
                        <el-button @click="btnCancel" size="medium"
                          >取消</el-button
                        >
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-dialog
                @open="getPlaylistList"
                @close="Cancel"
                width="700px"
                title="加入歌单"
                :visible.sync="showMusicPlaylist"               
              >
                <el-table
                  :data="playlistList"
                  height="350"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                >
                  <el-table-column prop="name" align="center" label="歌单名称">
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="addMusicToPlaylist">确定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { musicPage, deleteMusic, insertMusic, updateMusic,addToPlaylist } from "@/api/music";
import { singerList } from "@/api/singer";
import { categoryList } from "@/api/category";
import { playlistList } from '@/api/playlist'
import SelectCategory from "@/components/select-category.vue";
import SelectSinger from "@/components/select-singer.vue";
import AudioUpload from '@/components/audio-upload.vue'

export default {
  name: "MusicView",
  components: {
    SelectCategory,
    AudioUpload,
    SelectSinger,
  },
  data() {
    return {
      activeIndex: "3",
      showDialog: false,
      showMusicPlaylist: false,
      isEdit: false,
      list: [],
      playlistList: [],
      singers: {},
      musicForm: {
        name: "",
        singerId: null,
        categoryId: 1,
        path: "",
      },
      pageParams: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
        name: "",
      },
      addParams: {
        musicId: '',
        playlistId: ''
      },
      FormRules: {
        name: [
          {
            required: true,
            message: "歌曲名称不能为空",
            trigger: "blur",
          },
        ],
        path: [
          {
            required: true,
            message: "歌曲音频信息不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async logout() {
      await this.$store.dispatch("admin/logout");
      this.$router.push("/login");
      this.$message({
        type: "success",
        message: "退出成功!",
      });
    },
    async getList() {
      const [{ items, counts }, singerData, categoryDate] = await Promise.all([
        musicPage(this.pageParams),
        singerList(),
        categoryList(),
      ]);
      const songs = items;
      this.pageParams.total = counts;
      const singers = singerData;
      const categorys = categoryDate;
      this.singers = singers.reduce((acc, singer) => {
        acc[singer.id] = singer.name;
        return acc;
      }, {});
      this.categorys = categorys.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});

      // 为每首歌曲添加歌手姓名
      songs.forEach((song) => {
        if (song.singerId == 0) {
          song.singerName = "佚名";
        } else {
          song.singerName = this.singers[song.singerId];
        }
        if (song.categoryId == 0) {
          song.categoryName = "暂无";
        } else {
          song.categoryName = this.categorys[song.categoryId];
        }
      });
      this.list = songs;
    },
    async getPlaylistList(){
      const data = await playlistList()
      this.playlistList = data
    },
    pageQuery() {
      this.getList();
    },
    changePage(newPage) {
      this.pageParams.pageNo = newPage;
      this.getList();
    },
    async confirmDel(id) {
      await deleteMusic(id);
      this.$message.success("删除歌曲成功");
      //如是当前页最后一个，则往前一页
      if (this.list.length === 1 && this.pageQuery.pageNo > 1) {
        this.pageParams.pageNo--;
      }
      this.getList();
    },
    showDialogMusic() {
      this.showDialog = !this.showDialog;
    },
    showPlaylist(id) {
      this.showMusicPlaylist = !this.showMusicPlaylist;
      this.addParams.musicId = id
    },
    changeEdit(data) {
      this.showDialogMusic();
      this.isEdit = !this.isEdit;
      this.musicForm = this.list.filter((obj) => obj.id === data)[0];
    },
    handleCurrentChange(val) {
        this.addParams.playlistId = val.id;
    },
    async addMusicToPlaylist(){
      await addToPlaylist(this.addParams)
      this.$message.success('添加成功')
      this.Cancel()
    },
    btnOK() {
      this.$refs.musicForm.validate(async (isOK) => {
        if (isOK) {
          if (!this.musicForm.path.includes("ymusic-audio")) {
            this.$message.error("确定音频后请上传！");
            return;
          }
          if (this.isEdit) {
            await updateMusic(this.musicForm);
            this.$message.success("修改歌曲成功");
          } else {
            await insertMusic(this.musicForm);
            this.$message.success("新增歌曲成功");
          }
          this.btnCancel();
        }
      });
    },
    Cancel() {
      this.showMusicPlaylist = false;
    },
    btnCancel() {
      this.$refs.musicForm.resetFields();
      this.$refs.audioUploader.clearFiles();
      this.showDialog = false;
      this.isEdit = false;
      this.musicForm = {};
      this.getList();
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.audioUrl = URL.createObjectURL(this.file);
      }
    },
  },
};
</script>

<style lang="scss">
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #add8e6;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  margin-top: 0;

  h2 {
    line-height: normal;
    margin-right: 1200px;
    user-select: none;
    white-space: nowrap;
  }

  h3 {
    line-height: normal;
    user-select: none;
    margin-right: 50px;
    white-space: nowrap;
  }

  .el-button {
    width: 100px;
    height: 50px;
    margin-top: 5px;
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 40px !important;
  height: 100vh;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-item {
  color: black;
  margin: 20px 0px 0px 0px;
  user-select: none;
}

.el-dropdown {
  vertical-align: top;
  margin-left: 80px;
}

.main {
  width: 1660px;
  height: 890px;
  background-color: #fff;
  overflow: hidden;
  margin-left: 20px;

  h2 {
    padding: 0%;
    margin: 40px 1300px 30px 0px;
    line-height: 30px;
    display: inline-block;
  }
}

.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>