<template>
  <div class="homePage">
    <div style="width: 1200px; margin: auto;">
      <el-carousel :interval="4000" type="card" trigger="click" height="350px">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <span style="margin-right: 1000px;font-size: 20px;">热门歌单</span>
    <el-button type="text" @click="morePlaylist">更多歌单></el-button>
    <div style="user-select: none;">
      <el-row>
        <el-col :span="6" v-for="(item, index) in playlistList" :key="index">
          <el-card shadow="always" @click.native="handlePlaylistCardClick(item)" :body-style="{ padding: '0px' }"
            style="width: 200px; height: 280px; margin: 10px 0px 10px 40px;">
            <img :src=item.image class="image">
            <div style="padding: 1px; ;">
              <span class="spanName">{{ item.name }}</span>
              <br>
              <span class="description">{{ item.description }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <span style="margin-right: 1000px;font-size: 20px;">知名歌手</span>
    <el-button type="text" @click="moreSinger">更多歌手></el-button>
    <div style="user-select: none;">
      <el-row>
        <el-col :span="6" v-for="(item, index) in SingerList" :key="index">
          <el-card shadow="always" @click.native="handleSingerCardClick(item)" :body-style="{ padding: '0px' }"
            style="width: 200px; height: 285px; margin: 8px 0px 8px 40px;">
            <img :src=item.image class="image">
            <div style="padding: 14px;">
              <span class="spanName">{{ item.name }}</span>
              <br>
              <span class="description">{{ item.description }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <span style="margin-right: 1000px; font-size: 20px;">流行歌曲</span>
    <el-button type="text" @click="moreMusic">更多歌曲></el-button>
    <el-table :data="musicList" stripe border style="width: 95%; margin: auto;">
      <el-table-column prop="name" align="center" label="名称" width="260">
      </el-table-column>
      <el-table-column prop="categoryName" align="center" label="分类" width="260">
      </el-table-column>
      <el-table-column prop="singerName" align="center" label="歌手" width="260">
      </el-table-column>
      <el-table-column prop="duration" align="center" label="时长" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="medium" @click="setMusicInfo(row)">播放</el-button>
          <el-button type="text" size="medium" @click="collect(row.id)">收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100px; height: 100px; "></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { musicPage,toCollect } from "@/api/music";
import { getPlaylistPage } from "@/api/playlist"
import { singerPage,singerList } from "@/api/singer"
import { categoryList } from "@/api/category";

export default {
  name: 'HomePageView',
  data() {
    return {
      imageList: [
        require("../../assets/img/1.jpg"),
        require("../../assets/img/2.jpg"),
        require("../../assets/img/3.jpg"),
      ],
      playlistList: [],
      SingerList: [],
      musicList: [],
      pageParams: {
        pageNo: 1,
        pageSize: 4,
      },
      musicParams: {
        pageNo: 1,
        pageSize: 8,
      },
    }
  },
  created(){
    this.getPlaylistList()
    this.getSingerList()
    this.getMusicList()
  },
  methods: {
    ...mapMutations('music', ['setMusicInfo']),
    async getPlaylistList(){
      const { items } = await getPlaylistPage(this.pageParams)
      this.playlistList = items
    },
    async getSingerList(){
      const { items } = await singerPage(this.pageParams)
      this.SingerList = items
    },
    async getMusicList(){
      const [{ items }, singerData, categoryDate] = await Promise.all([
        musicPage(this.musicParams),
        singerList(),
        categoryList(),
      ]);
      const songs = items;
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
      await Promise.all(songs.map(async (song) => {
        if (song.path) {
          const duration = await this.getAudioDuration(song.path)
          song.duration = this.formatDuration(duration);
        } else {
          song.duration = "N/A";
        }
      }));
      this.musicList = songs;
    },
    getAudioDuration(path) {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = path;
        audio.addEventListener('canplay', () => {
          resolve(audio.duration.toFixed(2));
        });
      });
    },
    formatDuration(duration) {
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    async collect(id){
      await toCollect(id)
      this.$message.success("收藏成功")
    },
    handlePlaylistCardClick(item) {
      this.$router.push({
        path: `/playlist/detail/${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    morePlaylist(){
      this.$router.push('/playlist')
    },
    handleSingerCardClick(item) {
      this.$router.push({
        path: `/singer/detail/${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    moreSinger(){
      this.$router.push('/singer')
    },
    moreMusic(){
      this.$router.push('/music')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover; 

}
.image {
  width: 200px;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.spanName {
  margin: auto;
  line-height: 1; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  display: inline-block;
}

.description {
  font-size: 12px;
  margin-bottom: 110px;
}
.homePage {
  width: 1200px;
  height: 1700px;
  margin: auto;
}
</style>