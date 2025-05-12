<template>
  <div>
    <div style="width: 1200px; margin: auto;">
      <el-descriptions title="个人信息" :column="2" border>
        <el-descriptions-item label="用户名">
          <el-tag size="small">{{ userInfo.username }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="姓名">
          <el-tag size="small">{{ userInfo.name }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <span v-if="userInfo.sex !== null">{{ userInfo.sex === "1" ? "男" : "女" }}</span>
          <span v-else>暂无</span>
        </el-descriptions-item>
        <el-descriptions-item label="年龄">{{ userInfo.age == null ? '暂无' : userInfo.age }}</el-descriptions-item>
        <el-descriptions-item label="密码">
          {{ userInfo.password }}
        </el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button type="text" size="medium" @click="showUpdateInfoD">修改资料</el-button>
          <el-button type="text" size="medium" @click="showUpdatePasswordD">修改密码</el-button>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="收藏歌曲" :column="2" border></el-descriptions>
      <el-table :data="list" height="370" stripe style="width: 100%;">
        <el-table-column prop="name" align="center" label="名称" width="260">
        </el-table-column>
        <el-table-column prop="categoryName" align="center" label="分类" width="240">
        </el-table-column>
        <el-table-column prop="singerName" align="center" label="歌手" width="240">
        </el-table-column>
        <el-table-column prop="duration" align="center" label="时长" width="200">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="medium" @click="setMusicInfo(row)">播放</el-button>
            <el-button type="text" size="medium" @click="deleteCollect(row.id)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" size="medium" @click="logout">退出登录</el-button>
      <el-button  v-popover:popover type="text" size="medium" @click="showDeleteUser">注销账户</el-button>
    </div>
    <el-dialog @close="btnInfoCancel" width="700px" title="修改用户资料" :visible.sync="showUpdateInfo">
      <el-form ref="newUserInfo" :model="newUserInfo" :rules="FormRules" label-width="200px">
        <el-form-item prop="username" label="用户名:">
          <el-input v-model="newUserInfo.username" size="small" style="width: 300px; margin-right: 200px" maxlength="32"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名:">
          <el-input v-model="newUserInfo.name" size="small" style="width: 300px; margin-right: 200px" maxlength="32"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄:">
          <el-input v-model="newUserInfo.age" size="small" style="width: 300px; margin-right: 200px" maxlength="3"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别:" style="display: inline-block; margin-right: 160px">
          <el-select v-model="newUserInfo.sex" placeholder="请选择" style="display: inline-block; width: 300px;">
            <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="medium" @click="btnInfoOK">确定</el-button>
              <el-button size="medium" @click="btnInfoCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog @close="btnPasswordCancel" width="700px" title="修改用户资料" :visible.sync="showUpdatePassword">
      <el-form ref="passwordForm" :model="passwordForm" :rules="FormRules" label-width="200px">
        <el-form-item prop="password" label="原密码:">
          <el-input v-model="passwordForm.password" size="small" style="width: 300px; margin-right: 200px"
            maxlength="12" show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码:">
          <el-input v-model="passwordForm.newPassword" size="small" style="width: 300px; margin-right: 200px"
            maxlength="12" show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="conformPassword" label="确认新密码:">
          <el-input v-model="passwordForm.conformPassword" size="small" style="width: 300px; margin-right: 200px"
            maxlength="12" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="medium" @click="btnPasswordOK">确定</el-button>
              <el-button size="medium" @click="btnPasswordCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog @close="btnDeleteCancel" width="700px" title="注销用户" :visible.sync="visible" style="margin-top: 150px;">
      <el-form ref="deleteForm" :model="deleteForm" :rules="FormRules" label-width="200px">
        <el-form-item prop="password" label="密码:">
          <el-input v-model="deleteForm.password" size="small" style="width: 300px; margin-right: 200px"
            maxlength="12" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="medium" @click="btnDeleteOK">确定</el-button>
              <el-button size="medium" @click="btnDeleteCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
import { updateUserInfo,updatePassword,deleteUser } from '@/api/user'
import { collection,removeCollection } from '@/api/music'
import { singerList } from "@/api/singer";
import { categoryList } from "@/api/category";

export default {
  name: 'MyView',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  data() {
    return {
      visible: false,
      showSearch: true,
      showUpdateInfo: false,
      showUpdatePassword: false,
      name: '',
      list: [],
      newUserInfo: {
        username: '',
        name: '',
        age: '',
        sex: ''
      },
      passwordForm: {
        id: this.$store.getters.id,
        password: '',
        newPassword: '',
        conformPassword: ''
      },
      deleteForm: {
        password: ''
      },
      genders: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        }, 
      ],
      FormRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          }
        ],
        age: [
          {
            pattern: /^\d+$/,
            message: "年龄必须为数字",
            trigger: "blur",
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
          min: 6,
          message: '密码长度应该为6-12位之间',
          trigger: 'blur'
        }
        ],
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
          },
          {
          min: 6,
          message: '密码长度应该为6-12位之间',
          trigger: 'blur'
        }
        ],
        conformPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
          {
          min: 6,
          message: '密码长度应该为6-12位之间',
          trigger: 'blur'
        }
        ],
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    ...mapMutations('music', ['setMusicInfo']),
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
      this.$message({
        type: "success",
        message: "退出成功!",
      });
    },
    async getList(){
      const [ items, singerData, categoryDate] = await Promise.all([
        collection(),
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

      // 为每首歌曲添加歌手姓名
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
    showUpdateInfoD(){
      this.newUserInfo = { ...this.userInfo };
      this.showUpdateInfo = true
    },
    showDeleteUser(){
      this.visible = true
    },
    showUpdatePasswordD(){
      this.showUpdatePassword = true
    },
    async deleteCollect(id){
      await removeCollection(id)
      this.$message.success('取消收藏成功')
      this.getList()
    },
    btnInfoOK() {
      this.$refs.newUserInfo.validate(async (isOK) => {
        if (isOK) {
          await updateUserInfo(this.newUserInfo)
          await this.$store.dispatch('user/getUserInfo')
          this.$message.success('修改资料成功')
          this.getUer
          this.btnInfoCancel();
        }
      });
    },
    btnInfoCancel() {
      this.$refs.newUserInfo.resetFields();
      this.showUpdateInfo = false
    },
    btnPasswordOK() {
      this.$refs.passwordForm.validate(async (isOK) => {
        if (isOK) {
          await updatePassword(this.passwordForm)
          this.$message.success('修改密码成功')
          this.btnPasswordCancel();
        }
      });
    },
    btnPasswordCancel() {
      this.$refs.passwordForm.resetFields();
      this.showUpdatePassword = false
    },
    btnDeleteOK() {
      this.$refs.deleteForm.validate(async (isOK) => {
        if (isOK) {
          await deleteUser(this.deleteForm)
          await this.$store.dispatch("user/logout");
          this.$router.push("/login");
          this.$message.success('注销成功')
        }
      });
    },
    btnDeleteCancel(){
      this.$refs.deleteForm.resetFields();
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>