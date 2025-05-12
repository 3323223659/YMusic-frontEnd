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
          <el-menu :default-active="activeIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <router-link to="/statistic" class="no-underline"><el-menu-item index="1">数据统计</el-menu-item></router-link>
            <router-link to="/user" class="no-underline"><el-menu-item index="2">用户管理</el-menu-item></router-link>
            <router-link to="/music" class="no-underline"><el-menu-item index="3">音乐管理</el-menu-item></router-link>
            <router-link to="/category" class="no-underline"><el-menu-item index="4">分类管理</el-menu-item></router-link>
            <router-link to="/playlist" class="no-underline"><el-menu-item index="5">歌单管理</el-menu-item></router-link>
            <router-link to="/singer" class="no-underline"><el-menu-item index="6">歌手管理</el-menu-item></router-link>
          </el-menu></el-aside>
        <el-main>
          <div class="main">
            <div style="margin-top: 150px;">
              <img src="../../assets/img/m.png">
               <h1>欢迎进入Ymusic后台管理系统!</h1> 
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('admin/logout')
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出成功!'
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #ADD8E6;
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

  .el-button{
    display: inline-block;
    width: 100px;
    height: 50px;
    margin-top: 5px;
  }
}

.el-aside {
  background-color: #545C64;
  color: #333;
  text-align: center;
  line-height: 200px;

}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100vh;
  padding: 0;
}

body>.el-container {
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
  overflow: auto;
}

.no-underline {
  text-decoration: none;
  color: inherit;
}

h1{
  font-size: 80px;   /*设置文字大小*/
  color:#3366FF;  /*设置文字颜色*/
	text-shadow: 0 8px 10px #6699FF;  /*设置文字阴影*/                  
	font-weight: bolder;  /*设置文字宽度*/                              
	text-align: center;  /*设置文字居中*/
  margin-top: 10px;
}
</style>