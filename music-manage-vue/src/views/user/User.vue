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
            <h2>用户管理</h2>
            <div>
              <label style="margin-right: 5px"> 用户姓名： </label>
              <el-input
                v-model="pageParams.name"
                placeholder="请输入用户姓名"
                style="width: 15%; margin: 0px 150px 30px 0px"
              />
              <label style="margin-right: 5px"> 用户性别： </label>
              <el-select
                v-model="pageParams.sex"
                placeholder="请选择"
                style="margin-right: 40px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="pageQuery()"
                >查询</el-button
              >
            </div>
            <el-table :data="list" border style="width: 100%">
              <el-table-column
                align="center"
                prop="username"
                label="用户名"
                width="290px"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="name"
                label="姓名"
                width="280px"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="sex"
                label="性别"
                width="118px"
              >
                <template v-slot="{ row }">
                  <span v-if="row.sex !== null">{{
                    row.sex === "1" ? "男" : "女"
                  }}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="age"
                label="年龄"
                width="150px"
              >
                <template v-slot="{ row }">
                  <span v-if="row.sex !== null">{{ row.age }}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="createTime"
                label="创建时间"
                width="310px"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="loginTime"
                label="最后登录时间"
                width="310px"
              >
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
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { page } from "@/api/user";
export default {
  name: "UserView",
  data() {
    return {
      activeIndex: "2",
      list: [],
      pageParams: {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        sex: "",
        name: ""
      },
      options: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
        {
          value: "",
          label: "全部",
        },
      ],
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
      const { items, counts } = await page(this.pageParams);
      this.list = items;
      this.pageParams.total = counts;
    },
    pageQuery() {
      this.getList();
    },
    changePage(newPage) {
      this.pageParams.pageNo = newPage;
      this.getList();
    }
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