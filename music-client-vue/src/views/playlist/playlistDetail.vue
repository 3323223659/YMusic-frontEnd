<template>
  <div class="detail">
    <span style="font-size: 20px; font-weight: 700;">歌单详情</span>
    <div style=" display: flex;">
      <img class="playlist" :src=playlist.image>
      <el-descriptions title="歌单信息" style="margin-top: 10px;" :column="1">
        <el-descriptions-item label="名称">{{ playlist.name }}</el-descriptions-item>
        <el-descriptions-item label="描述信息">
         {{ playlist.description}}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <span style="font-size: 20px; font-weight: 700;">歌曲列表</span>
    <el-table :data="list" height="370" stripe style="width: 100%;">
        <el-table-column prop="name" align="center" label="名称" width="260">
        </el-table-column>
        <el-table-column prop="categoryName" align="center" label="分类" width="240" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="singerName" align="center" label="歌手" width="240">
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
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { musicList,toCollect } from '@/api/music'
import { singerList } from "@/api/singer";
import { categoryList } from "@/api/category";

export default {
  name: 'PlaylistDetail',
  data () {
      return {
          playlist:{},
          list: [],
          musicParams: {
            playlistId: ''
          }
      }
  },
  created(){
    this.playlist = JSON.parse(decodeURIComponent(this.$route.params.playlist));
    this.getList()
  },
  methods:{
    ...mapMutations('music', ['setMusicInfo']),
    async getList(){
      this.musicParams.playlistId = this.playlist.id
      const [ items,  singerData, categoryDate ] = await Promise.all([
        musicList(this.musicParams),
        singerList(), categoryList(),
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
      this.list = songs;
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
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 1200px;
  height: 770px;
  margin: auto;
}
.playlist{
  user-select: none;
  width: 200px; height: 200px;
  margin: 20px 100px 0px 0px;
  display: inline;
}
</style>