<template>
  <div class="music">
    <div>
      <span style="font-size: 20px; font-weight: 700;">歌曲列表</span>
      <br>
      歌曲分类：
      <el-select style="margin-top: 10px;" @change="changeValue" v-model="value" placeholder="请选择歌曲分类">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table :data="list" stripe border style="width: 100%; margin-top: 20px;">
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
    <el-pagination style="margin-left: 800px" :page-size="pageParams.pageSize" :pager-count="5"
      :current-page="pageParams.pageNo" :total="pageParams.total" @current-change="changePage"
      layout="total,prev, pager, next">
    </el-pagination>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { musicPage,toCollect } from "@/api/music";
import { singerList } from "@/api/singer";
import { categoryList } from "@/api/category";

export default {
  name: 'MusicView',
  data() {
    return {
      value: '',
      options: [],
      list: [],
      singers: {},
      pageParams: {
        pageNo: 1,
        pageSize: 7,
        total: 0,
        categoryId: ''
      },
    }
  },
  created () {
    this.getCategoryList()
    this.getSearchList()
  },
  methods: {
    async getCategoryList(){
      const list = await categoryList()
      this.options = this.processData(list);
    },
    processData(data) {
      return data.map(item => ({
        value: item.id,
        label: item.name
      }));
    },
    changeValue(data){
      this.$emit('input',data)
    },
    ...mapMutations('music', ['setMusicInfo']),
    async getSearchList() {
      this.pageParams.name = this.$route.params.name;
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
    changePage(newPage) {
      this.pageParams.pageNo = newPage;
      this.getSearchList();
    },
    async collect(id){
      await toCollect(id)
      this.$message.success("收藏成功")
    },
  },
  watch: {
    value(newVal) {
      this.value = newVal;
      this.pageParams.categoryId = newVal
      this.getSearchList();
    }
  }
}
</script>

<style lang="scss" scoped>
  .music {
  width: 1200px;
  height: 770px;
  margin: auto;
}

</style>