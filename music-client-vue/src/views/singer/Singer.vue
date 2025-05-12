<template>
  <div class="playlist">
    <div>
      <span style="font-size: 20px; font-weight: 700;">歌手列表</span>
      <el-row>
        <el-col :span="6" v-for="(item, index) in list" :key="index">
          <el-card shadow="always" @click.native="handleCardClick(item)" :body-style="{ padding: '0px' }"
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
    <el-pagination style="margin-left: 800px" :page-size="pageParams.pageSize" :pager-count="5"
      :current-page="pageParams.pageNo" :total="pageParams.total" @current-change="changePage"
      layout="total,prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
import { singerPage } from "@/api/singer"

export default {
  name: 'SingerView',
  data() {
    return {
      list:[],
      pageParams: {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: ''
      },
    };
  },
  created(){
    this.getList()
  },
  methods: {
    async getList(){
      const { items,counts } = await singerPage(this.pageParams)
      this.list = items
      this.pageParams.total = counts
    },
    changePage(newPage) {
      this.pageParams.pageNo = newPage;
      this.getList();
    },
    handleCardClick(item) {
      this.$router.push({
        path: `/singer/detail/${encodeURIComponent(JSON.stringify(item))}`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  user-select: none;
}
  .playlist {
  width: 1200px;
  height: 770px;
  margin: auto;
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
}

.description {
  font-size: 12px;
  margin-bottom: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  display: inline-block;
}
</style>