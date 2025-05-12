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
            <h2>数据统计</h2>
            <div
              style="
                height: 250px;
                width: 1300px;
                background-color: #f3f4f7;
                margin: 30px 0px 0px 80px;
                position: relative;
              "
            >
              <div
                style="
                  height: 140px;
                  width: 240px;
                  background-color: #fffbf0;
                  margin: 50px 0px 0px 70px;
                  position: absolute;
                "
              >
                <h3>用户数量</h3>
                <span style="font-size: 30px">{{ userCount }}</span>
              </div>
              <div
                style="
                  height: 140px;
                  width: 240px;
                  background-color: #fffbf0;
                  margin: 50px 0px 0px 390px;
                  position: absolute;
                "
              >
                <h3>歌曲数量</h3>
                <span style="font-size: 30px">{{ musicCount }}</span>
              </div>
              <div
                style="
                  height: 140px;
                  width: 240px;
                  background-color: #fffbf0;
                  margin: 50px 0px 0px 690px;
                  position: absolute;
                "
              >
                <h3>歌单数量</h3>
                <span style="font-size: 30px">{{ playlistCount }}</span>
              </div>
              <div
                style="
                  height: 140px;
                  width: 240px;
                  background-color: #fffbf0;
                  margin: 50px 0px 0px 990px;
                  position: absolute;
                "
              >
                <h3>歌手数量</h3>
                <span style="font-size: 30px">{{ singerCount }}</span>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { userCount } from "@/api/user";
import { musicCount } from "@/api/music";
import { singerCount } from "@/api/singer";
import { playlistCount } from "@/api/playlist";
export default {
  name: "StatisticView",
  data() {
    return {
      activeIndex: "1",
      userCount: "",
      musicCount: "",
      playlistCount: "",
      singerCount: "",
    };
  },
  created() {
    this.getData();
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
    async getData() {
      const [count1, count2, count3, count4] = await Promise.all([
        userCount(),
        musicCount(),
        playlistCount(),
        singerCount(),
      ]);
      this.userCount = count1;
      this.musicCount = count2;
      this.playlistCount = count3;
      this.singerCount = count4;
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