<template>
  <el-select v-model="id" @change="changeValue" placeholder="请选择" style="width: 300px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import { singerList } from "@/api/singer";
export default {
  props: {
    value:{
      type: Number,
      default: null
    }
  },
  data() {
    return {
      options: [],
      id: this.value
    };
  },
  created () {
    this.getList()
  },
  methods: {
    async getList(){
      const list = await singerList()
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
    }
  },
  watch: {
    value(newVal) {
      this.id = newVal;
    }
  }
};
</script>

<style scoped>

</style>
