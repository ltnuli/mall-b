<template>
<div class="login">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input
        v-model="ruleForm.email"

      />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        登录
      </a-button>
      <a-button style="margin-left: 10px" @click="register">
       注册
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>
<script>
import api from '@/api';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          api.login(this.ruleForm).then((res) => {
            this.$store.dispatch('setUserInfo', res);
            this.$router.push({
              name: 'Home',
            });
            console.log(res);
          }).catch((error) => this.$message.error(error));
          return true;
        }
        return false;
      });
    },
    register() {
      this.$router.push({
        name: 'Register',
      });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login.less");
</style>
