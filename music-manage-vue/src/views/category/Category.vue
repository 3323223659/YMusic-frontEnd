<template>
  <div>
    <el-container>
      <el-header>
        <h2>YMusic管理系统</h2>
        <h3>你好，管理员</h3>
        <el-button type="primary" @click="logout" round>退出登录</el-button>
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
            <h2>分类管理</h2>
            <div>
              <label style="margin-left: 300px"> 分类名称： </label>
              <el-input
                v-model="pageParams.name"
                placeholder="请输入分类名称"
                style="width: 15%; margin: 0px 50px 30px 0px"
              />
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="pageQuery()"
                >查询</el-button
              >
              <el-button
                @click="showDialogInsert"
                style="margin-left: 525px"
                type="primary"
                >新增分类</el-button
              >
            </div>
            <el-table :data="list" border style="width: 100%">
              <el-table-column
                align="center"
                prop="name"
                label="分类名称"
                width="380px"
              >
                <template v-slot="{ row }">
                  <el-input
                    v-if="row.isEdit"
                    size="medium"
                    maxlength="16"
                    show-word-limit
                    v-model="row.editRow.name"
                  ></el-input>
                  <span v-else>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="createTime"
                label="创建时间"
                width="380px"
                sort
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="updateTime"
                label="修改时间"
                width="380px"
              >
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="300px"
              >
                <template v-slot="{ row }">
                  <template v-if="row.isEdit">
                    <!-- 编辑状态 -->
                    <el-button
                      type="primary"
                      size="medium"
                      @click="btnEditOK(row)"
                      >确定</el-button
                    >
                    <el-button size="medium" @click="row.isEdit = false"
                      >取消</el-button
                    >
                  </template>
                  <template v-else>
                    <el-button type="text" size="medium" @click="inquireMusic(row.id)">查看</el-button>
                    <el-button @click="btnEditRow(row)" type="text" size="medium"
                      >编辑</el-button
                    >
                    <el-popconfirm
                      @onConfirm="confirmDel(row.id)"
                      title="确定删除此分类吗？"
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
              title="新增分类"
              :visible.sync="showDialog"
              style="margin: 100px 0px 0px 0px"
            >
              <el-form
                ref="CategoryForm"
                :model="CategoryForm"
                :rules="FormRules"
                label-width="200px"
              >
                <el-form-item prop="name" label="分类名称:">
                  <el-input
                    v-model="CategoryForm.name"
                    size="small"
                    style="width: 300px; margin-right: 200px"
                    maxlength="16"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-row type="flex" justify="center">
                    <el-col :span="12">
                      <el-button @click="btnOK" type="primary" size="medium"
                        >确定</el-button
                      >
                      <el-button @click="btnCancel" size="medium">取消</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-dialog  @open="getMusicList" @close="Canal" width="700px" title="分类音乐详情" :visible.sync="showMusic">
              <el-table :data="musicList" height="400" border style="width: 100%">
                <el-table-column prop="name" align="center" label="名称" width="360">
                </el-table-column>
                <el-table-column prop="singerId" align="center" label="歌手" width="299">
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
import { page, insert, update, deleteById } from "@/api/category";
import { musicList } from '@/api/music';
import { singerList } from '@/api/singer'

export default {
  name: "CategoryView",
  created() {
    this.getList();
  },
  data() {
    return {
      activeIndex: "4",
      list: [],
      singers: {},
      musicList: [],
      pageParams: {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
      },
      showDialog: false,
      showMusic: false,
      CategoryForm: {
        name: "",
      },
      musicParams: {
        categoryId: ''
      },
      FormRules: {
        name: [
          {
            required: true,
            message: "分类名称不能为空",
            trigger: "blur",
          }
        ],
      },
    };
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
      const { items, counts } = await page(this.pageParams);
      this.list = items;
      this.pageParams.total = counts;
      this.list.forEach((item) => {
        this.$set(item, "isEdit", false);
        this.$set(item, "editRow", {
          name: item.name,
        });
      });
    },
    async getMusicList(){
      const [ items, data ] = await Promise.all([
      musicList(this.musicParams),
      singerList()
      ]);
      const songs = items
      const singers = data
      this.singers = singers.reduce((acc, singer) => {
          acc[singer.id] = singer.name;
          return acc;
        }, {});

        // 为每首歌曲添加歌手姓名
        songs.forEach(song => {
          if(song.singerId == 0){
            song.singerId = '佚名'
          }else{
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
    showDialogInsert() {
      this.showDialog = !this.showDialog;
    },
    showMusicPlaylist() {
      this.showMusic = !this.showMusic;
    },
    inquireMusic(data) {
      this.showMusicPlaylist();
      this.musicParams.categoryId = data
    },
    btnOK() {
      this.$refs.CategoryForm.validate(async (isOK) => {
        if (isOK) {
          await insert(this.CategoryForm);
          this.$message.success("新增分类成功");
          this.getList();
          this.btnCancel();
        }
      });
    },
    Canal(){
      this.showMusic = false
    },
    btnCancel() {
      this.$refs.CategoryForm.resetFields();
      this.showDialog = false;
    },
    btnEditRow(row) {
      row.isEdit = true;
      row.editRow.name = row.name;
    },
    async btnEditOK(row) {
      if (row.editRow.name) {
        await update({ ...row.editRow, id: row.id });
        this.$message.success("修改分类成功");
        //规避Eslint误判
        Object.assign(row, {
          ...row.editRow,
          isEdit: false,
        });
      } else {
        this.$message.warning("分类名称不能为空");
      }
    },
    async confirmDel(id) {
      await deleteById(id);
      this.$message.success("删除分类成功");
      //如是当前页最后一个，则往前一页
      if (this.list.length === 1 && this.pageQuery.pageNo > 1) {
        this.pageParams.pageNo--;
      }
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
  margin-left: 20px;
  overflow: hidden;
  padding: 0;

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