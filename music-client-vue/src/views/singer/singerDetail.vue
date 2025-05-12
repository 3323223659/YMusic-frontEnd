<template>
  <div class="detail">
    <span style="font-size: 20px; font-weight: 700;">歌手详情</span>
    <div style=" display: flex;">
      <img class="singer" :src=singer.image>
      <el-descriptions title="歌手信息" style="margin-top: 30px;">
        <el-descriptions-item label="姓名">{{ singer.name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">
          <span>{{ singer.age == 0 ? "暂无" : singer.age }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="性别">{{ singer.sex == 1 ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="描述信息">
          {{ singer.description }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <span style="font-size: 20px; font-weight: 700;">歌曲列表</span>
    <el-table :data="list" height="370" stripe style="width: 100%;">
      <el-table-column prop="name" align="center" label="名称" width="260">
      </el-table-column>
      <el-table-column prop="categoryName" align="center" label="分类" width="240">
      </el-table-column>
      <el-table-column prop="singerName" align="center" label="歌手" width="240">
        {{ singer.name }}
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
import { categoryList } from "@/api/category";

export default {
  name: 'SingerDetail',
  data () {
      return {
          singer:{},
          list: [],
          musicParams: {
            singerId: ''
          }
      }
  },
  created(){
    this.singer = JSON.parse(decodeURIComponent(this.$route.params.singer));
    this.getList()
  },
  methods: {
    ...mapMutations('music', ['setMusicInfo']),
    async getList(){
      this.musicParams.singerId = this.singer.id
      const [ items , categoryDate] = await Promise.all([
        musicList(this.musicParams),
        categoryList(),
      ]);
      const songs = items;
      const categorys = categoryDate;
      this.categorys = categorys.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});

      songs.forEach((song) => {
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
.singer{
  user-select: none;
  width: 200px; height: 200px;
  margin: 20px 100px 0px 0px;
  display: inline;
}

</style>