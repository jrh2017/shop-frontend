<template>
    <div class="login">
        <div class="from-wrap">
            <h2>登录</h2>
            <Form ref="loginData" :model="loginData" :rules="ruleValidate" :label-width="80">
                <FormItem label="账号" prop="name">
                    <Input type="text" v-model="loginData.name" placeholder="请输入账号" />
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="loginData.password" placeholder="请输入密码" />
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">登录</Button>
                    <Button type="success" @click="handleSign('loginData')">注册</Button>
                    <Button type="info" @click="handleReset('loginData')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            loginData: {
                acct: '',
                pass: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                    { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.getUserList() // 获取服务器端用户数据
        // this.postUserList() // 传递参数给后端服务器
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.postUserList()
                } else {
                    this.$Message.error('账号或密码错误!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },
        postUserList () {
            let _this = this
            axios.post('http://47.110.78.180:3016/api/user/login', this.loginData).then(function (response) {
                if (response.data.code == 1) {
                    _this.$router.push('/pages/home')
                } else {
                    _this.$Message.error('账号或密码无效，登录失败！')
                }
            }).catch(function (error) {
                console.log(error)
                _this.$Message.error('账号或密码无效，登录失败！')
            })
        },
        getUserList () {
            axios.get(`http://47.110.78.180:3016/api/user?name=${this.loginData.name}`).then(res => {
                console.log(res)
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
}

</script>
<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #1c2438;
  position: relative;
}

.login .from-wrap {
  position: fixed;
  left: 50%;
  margin-left: -200px;
  top: 50%;
  margin-top: -150px;
  width: 400px;
  height: 240px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 30px;
}

.login h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login FormItem {
  margin-bottom: 15px;
}

.login .form-footer {
  text-align: right;
}

.ivu-btn {
  margin-left: 11px;
}

.ivu-form-item-required .ivu-form-item-label:before {
  display: none;
}

</style>
