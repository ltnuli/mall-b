<template>
 <div class="register">
      <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="E-mail">
      <a-input
      ref="input"
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="验证码" has-feedback>
      <a-input
        v-decorator="[
          'code',
          {
            rules: [
              {
                required: true,
                message: '请输入验证码',
              },
            ],
          },
        ]"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        Nickname&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'username',
          {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ],
          },
        ]"
      />
    </a-form-item>

    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit"> Register </a-button>
      <a-button type="primary" style="margin-left: 10px" @click="send">
        发送验证
      </a-button>
    </a-form-item>
  </a-form>
 </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      confirmDirty: false,

      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          api.register(values).then((res) => {
            console.log(res);
          }).catch((error) => this.$message.error(error));
        }
      });
    },
    handleConfirmBlur(e) {
      const { value } = e.target;
      this.confirmDirty = this.confirmDirty || !!value;
    },

    validateToNextPassword(rule, value, callback) {
      const { form } = this;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(
          (domain) => `${value}${domain}`,
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    send() {
      const { input } = this.$refs;
      console.log(input.value);
      const email = { email: input.value };
      api.getCode(email).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
 .register {
     .ant-form{
          max-width: 500px;
        margin: 100px auto;
        border: 1px solid #eee;
        padding: 30px 20px 6px;
     }
 }
</style>
