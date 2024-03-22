<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form
        ref="formDataRef"
        :model="formData"
        :rules="rules"
        @keyup.enter="login(formDataRef)"
      >
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入账号"
            size="large"
            type="text"
          >
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            size="large"
            type="password"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <CodeInput
            ref="codeInputRef"
            v-model:modelValue="formData.code"
          ></CodeInput>
        </el-form-item>
        <!--        <el-form-item label="">-->
        <!--          <el-checkbox label="记住密码" name="type" />-->
        <!--        </el-form-item>-->
        <el-form-item label="">
          <el-button
            :loading="isLoading"
            type="primary"
            style="width: 100%"
            size="large"
            @click="login(formDataRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { FormInstance } from 'element-plus';
import CodeInput from '@/components/code-input/CodeInput.vue';
import { _login } from '@/pages/login/login.service.ts';
import { ResponseCode } from '@/share/types/request.types.ts';
import useUserStore from '@/store/modules/user.store.ts';

const codeInputRef = ref<InstanceType<typeof CodeInput>>();
const isLoading = ref(false);
// 表单
const formDataRef = ref();
const formData = reactive({
  username: '',
  password: '',
  code: ''
});

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码'
    }
  ]
};

const router = useRouter();

const login = async (formEl: FormInstance | undefined) => {
  isLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const formObj = JSON.parse(JSON.stringify(formData));
      _login(formObj).then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          const userStore = useUserStore();
          userStore.setToken(res.data.tokenValue);
          ElMessage.success(res.msg || '登录成功');
          router.push('/home');
        } else {
          ElMessage.error(res.msg || '登录失败');
          codeInputRef.value?.reload();
        }
        isLoading.value = false;
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<style lang="less" scoped>
.login-body {
  background: url('@/assets/bg.jpeg') no-repeat center center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;

  .login-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 25px;
    width: 26%;
    min-width: 460px;
    height: 30%;
    min-height: 300px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5%;
    box-shadow: 2px 2px 10px #ddd;

    .login-title {
      font-size: 22px;
      text-align: center;
      margin-bottom: 22px;
    }
  }
}
</style>
