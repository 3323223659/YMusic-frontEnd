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
            <h2>歌单管理</h2>
            <div>
              <label style="margin-left: 300px"> 歌单名称： </label>
              <el-input
                v-model="pageParams.name"
                placeholder="请输入歌单名称"
                style="width: 15%; margin: 0px 50px 30px 0px"
              />
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="pageQuery()"
                >查询</el-button
              >
              <el-button
                @click="showDialogPlaylist"
                style="margin-left: 525px"
                type="primary"
                >新增歌单</el-button
              >
            </div>
            <el-table :data="list" style="width: 100%" border>
              <el-table-column
                prop="name"
                align="center"
                label="名称"
                width="180"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="image"
                align="center"
                label="图片"
                width="120"
              >
                <template v-slot="{ row }">
                  <el-image style="width: 80px; height: 80px" :src="row.image">
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                label="描述信息"
                show-overflow-tooltip
              >
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
                width="300"
              >
                <template v-slot="{ row }">
                  <el-button
                    type="text"
                    size="medium"
                    @click="inquireMusic(row.id)"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="medium"
                    @click="changeEdit(row.id)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    @onConfirm="confirmDel(row.id)"
                    title="确定删除此歌单吗？"
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
            </div>
            <el-dialog
              @close="btnCancel"
              width="700px"
              :title="dialogTitle"
              :visible.sync="showDialog"
            >
              <el-form
                ref="playlistForm"
                :model="playlistForm"
                :rules="FormRules"
                label-width="200px"
              >
                <el-form-item prop="name" label="歌单名称:">
                  <el-input
                    v-model="playlistForm.name"
                    size="small"
                    style="width: 300px; margin-right: 200px"
                    maxlength="32"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item
                  style="display: inline-block"
                  prop="image"
                  label="歌手图片:"
                >
                  <image-upload v-model="playlistForm.image" />
                </el-form-item>
                <el-form-item prop="description" label="歌单详情:">
                  <el-input
                    type="textarea"
                    v-model="playlistForm.description"
                    :rows="5"
                    size="small"
                    style="width: 300px; margin-right: 200px"
                    maxlength="255"
                    show-word-limit
                  ></el-input>
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
              @open="getMusicList"
              @close="Canal"
              width="700px"
              title="歌单音乐详情"
              :visible.sync="showMusic"
            >
              <el-table
                :data="musicList"
                height="400"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="名称"
                  width="250"
                >
                </el-table-column>
                <el-table-column
                  prop="singerId"
                  align="center"
                  label="歌手"
                  width="250"
                >
                </el-table-column>
                <el-table-column prop="singerId" align="center" label="操作">
                  <template v-slot="{ row }">
                    <el-button type="text" size="medium" @click="removeMusic(row.id)"
                      >移出</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  playlistPage,
  deletePlaylist,
  insertPlaylist,
  updatePlaylist,
} from "@/api/playlist";
import { musicList,moveToPlaylist } from "@/api/music";
import { singerList } from "@/api/singer";
import ImageUpload from "@/components/image-upload.vue";

export default {
  name: "PlaylistView",
  components: {
    ImageUpload,
  },
  data() {
    return {
      activeIndex: "5",
      showDialog: false,
      showMusic: false,
      isEdit: false,
      list: [],
      singers: {},
      musicList: [],
      playlistForm: {
        name: "",
        description: "",
        image: "",
      },
      pageParams: {
        pageNo: 1,
        pageSize: 4,
        total: 0,
        name: "",
      },
      musicParams: {
        playlistId: "",
      },
      moveParams: {
        musicId: "",
        playlistId: "",
      },
      FormRules: {
        name: [
          {
            required: true,
            message: "歌单名称不能为空",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            message: "歌单图片不能为空",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "歌单详情不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? "修改歌单" : "新增歌单";
    },
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
      const { items, counts } = await playlistPage(this.pageParams);
      this.list = items;
      this.pageParams.total = counts;
    },
    async getMusicList() {
      const [ items, data] = await Promise.all([
      musicList(this.musicParams),
        singerList(),
      ]);
      const songs = items;
      const singers = data;
      this.singers = singers.reduce((acc, singer) => {
        acc[singer.id] = singer.name;
        return acc;
      }, {});

      // 为每首歌曲添加歌手姓名
      songs.forEach((song) => {
        if (song.singerId == 0) {
          song.singerId = "佚名";
        } else {
          song.singerId = this.singers[song.singerId];
        }
      });
      this.musicList = songs;
    },
    pageQuery() {
      this.getList();
    },
    changePage(newPage) {
      this.pageParams.pageNo = newPage;
      this.getList();
    },
    async confirmDel(id) {
      await deletePlaylist(id);
      this.$message.success("删除歌单成功");
      //如是当前页最后一个，则往前一页
      if (this.list.length === 1 && this.pageQuery.pageNo > 1) {
        this.pageParams.pageNo--;
      }
      this.getList();
    },
    showDialogPlaylist() {
      this.showDialog = !this.showDialog;
    },
    showMusicPlaylist() {
      this.showMusic = !this.showMusic;
    },
    changeEdit(data) {
      this.showDialogPlaylist();
      this.isEdit = !this.isEdit;
      this.playlistForm = this.list.filter((obj) => obj.id === data)[0];
    },
    inquireMusic(data) {
      this.showMusicPlaylist()
      this.musicParams.playlistId = data
      this.moveParams.playlistId = data
    },
    async removeMusic(musicId) {
      this.moveParams.musicId = musicId
      await moveToPlaylist(this.moveParams)
      this.$message.success("移出歌曲成功");
      this.getMusicList()
    },
    btnOK() {
      this.$refs.playlistForm.validate(async (isOK) => {
        if (isOK) {
          if (!this.playlistForm.image.includes("ymusic-image")) {
            this.$message.error("确定图片后请上传！");
            return;
          }
          if (this.isEdit) {
            await updatePlaylist(this.playlistForm);
            this.$message.success("修改歌单成功");
          } else {
            await insertPlaylist(this.playlistForm);
            this.$message.success("新增歌单成功");
          }
          this.btnCancel();
        }
      });
    },
    Canal() {
      this.showMusic = false;
    },
    btnCancel() {
      this.$refs.playlistForm.resetFields();
      this.showDialog = false;
      this.isEdit = false;
      this.playlistForm = {};
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
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