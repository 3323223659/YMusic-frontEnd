<template>
  <div>
    <el-container>
      <el-header><el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-demo" mode="horizontal">
          <router-link to="/home" class="no-underline"><el-menu-item index="1"
              style="font-size: 18px">首页</el-menu-item></router-link>
          <router-link to="/music" class="no-underline"><el-menu-item index="2"
              style="font-size: 18px">音乐</el-menu-item></router-link>
          <router-link to="/playlist" class="no-underline"><el-menu-item index="3"
              style="font-size: 18px">歌单</el-menu-item></router-link>
          <router-link to="/singer" class="no-underline"><el-menu-item index="4"
              style="font-size: 18px">歌手</el-menu-item></router-link>
          <router-link to="/my" class="no-underline"><el-menu-item index="5"
              style="font-size: 18px">我的</el-menu-item></router-link>
        </el-menu>
      </el-header>
      <div class="logoAndSearch">
        <img class="logo" src="../../assets/img/m.png" alt="YMusic" />
        <h3 style="margin-left: 80px; display: inline-block; user-select: none;">YMUSIC</h3>
        <el-input v-show="showSearch" v-model="name" placeholder="请输入歌曲名称" prefix-icon="el-icon-search"
          @change="handleSearch"></el-input>
      </div>
      <div class="between"></div>
      <el-main>
        <div class="main">
          <router-view v-model="showSearch"></router-view>
        </div>
      </el-main>
      <div class="player-bar" v-if="true">
        <span style="margin: 20px 1500px 0px 0px;  display: inline-block;">正在播放：</span>
        <span style="margin: -20px 1250px 0px 0px;  display: inline-block;">歌曲：{{ musicInfo.name }}</span>
        <span style="margin: -20px 950px 0px 0px;">歌手：{{ musicInfo.singerName }}</span>
        <mini-audio ref="audioPlayer" style="margin: -40px 0px 0px 200px; width: 800px; height: 140px;" preload:false loop:true
        :audio-source="musicInfo.path"></mini-audio>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';

export default {
  name: "HomeView",
  data() {
    return {
      showSearch: true,
      activeIndex: "",
      name: ''
    };
  },
  computed: {
    ...mapState('music', ['musicInfo'])
  },
  methods: {
    ...mapMutations('music', ['setMusicInfo', 'removeMusicInfo']),
    handleSelect(index) {
      this.activeIndex = index;
      this.showSearch = true
      this.name = ''
    },
    handleSearch(){
      if(this.name !== null && this.name.trim() !== ''){
        this.$router.push(`/music/search/${this.name}`)
      }
    },
    play() {
      this.$refs.audioPlayer.play();
    },
  },
  watch: {
    musicInfo: {
      handler(newVal) {
        if (newVal.path) {
          this.$nextTick(() => {
            this.play();
          });
        }
      },
      deep: true,
    },
  },
}
  
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-top: 0%;
  display: flex;
  padding: 0;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 40px !important;
  padding: 0;
  // overflow: hidden;
  .main {
    background-color: #fff;
    width: 1900px;

  }
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
.logoAndSearch {
  width: 1900px;
  height: 60px;
  background-color: #989fb0;
}
.el-input {
  width: 200px;
  border-radius: 50%;
  margin-left: 1500px;
}
.logo {
  position: absolute;
  top: 72px;
  left: 20px;
  max-width: 3%;
  user-select: none;
}

.between {
  width: 1900px;
  height: 2px;
  background-color: black;
}
.el-menu-demo {
  display: flex;
  justify-content: space-around;
}
.el-menu-item {
  user-select: none;
  display: flexbox;
  margin: 0;
  padding: 0px 172px; /* 增大内边距 */
}
.no-underline {
  text-decoration: none;
  color: inherit;
}
.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #f8f8f8;
  border-top: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>