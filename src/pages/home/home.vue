<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type='flex'>
        <!-- 左侧布局 -->
            <Col :span='spanLeft' class='layout-menu-left'>
                <Menu mode='vertical' theme="dark" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
                    <div class="layout-logo-left">
                        <Icon type="ios-jet-outline" v-show="logoIsDisplay"/>
                        <span class="layout-text">JRKL 管理系统</span>
                    </div>
                    <template v-for="(item, fatherindex) in $router.options.routes" v-if="spanLeft >=5 && !item.hidden">
                        <Submenu :name="item.name" v-if="!item.leaf" v-bind:key="fatherindex">
                            <template slot='title'>
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text">{{item.name}}</span>
                            </template>
                            <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path" v-bind:key="childIndex">{{child.name}}</Menu-item>
                            </template>
                        </Submenu>
                        <template  v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path" :key="fatherindex">
                                 <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.children[0].name}}</span>
                            </Menu-item>
                        </template>
                    </template>
                    <template v-for="(item, fatherindex) in $router.options.routes" v-if="spanLeft <5 && !item.hidden">
                        <Dropdown placement="right-start" class="_dropdownList" transfer="transfer" @on-click="dropDown" v-bind:key="fatherindex">
                            <a href="javascript:void(0)">
                                <Icon :type="item.iconCls" class="_iconCls ivu-col-span-1" :size="iconSize"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem  v-if="!item.name" :name="item.children[0].path">{{item.children[0].name}}</DropdownItem>
                                <Dropdown placement="right-start" transfer="transfer" v-if="item.children && item.name">
                                    <DropdownItem>
                                        {{item.name}}
                                        <Icon type="ios-arrow-right"></Icon>
                                    </DropdownItem>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(child,childIndex) in item.children" :key="childIndex" :name="child.path">{{child.name}}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownMenu>
                        </Dropdown>
                    </template>
                </Menu>
            </Col>
            <Col :span='spanRight' style="height: 100%; overflow-y: scroll;">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                    <Icon type="md-contacts" size="32"></Icon>
                    </Button>
                    <div class="userinfo">
                        <Dropdown placement="bottom-end">
                            <span class="head-img">
                                {{this.username}}
                                <img src="@/assets/homelogo.jpg">
                            </span>
                            <DropdownMenu slot="list">
                                <DropdownItem @click.native="modifyPassWord()">修改密码</DropdownItem>
                                <DropdownItem @click.native="layout()">退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>{{$route.name}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal v-model="modal1" title="修改密码" @on-ok="comfirmModifyPS"  @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Form-item label="原密码" prop="oldPassword">
                    <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
                </Form-item>
                <Form-item label="新密码" prop="newPassword">
                    <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
                </Form-item>
                 <Form-item label="确认新密码" prop="resetPassword">
                    <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            username: '',
            openNames: [this.$route.matched[0].name],
            spanLeft: 5,
            spanRight: 19,
            logoIsDisplay: false,
            loading: true,
            transfer: true,
            modal1: false,
            formValidate: {
                    oldPassword: '',
                    newPassword: '',
                    resetPassword:''
            },
            ruleValidate: {
                oldPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                resetPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        logoSize () {
            const _this = this
            if (_this.spanLeft !== 5) {
                _this.logoIsDisplay = true
                return 50
            } else {
                _this.logoIsDisplay = false
                return 0
            }
        },
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24
        }
    },
    mounted () {
        this.getUserinfo ()
    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 1
                this.spanRight = 23
            } else {
                this.spanLeft = 5
                this.spanRight = 19
            }
        },
        menuSelect (name) {
            this.$router.push({ path: name })
        },
        dropDown (name) {
            this.$router.push({ path: name })
            console.log(name)
        },
        modifyPassWord () {
            this.modal1 = true
        },
        comfirmModifyPS () {
            this.modal1 = false
            this.$Message.info ('点击了确定')
        },
        cancel () {
            this.modal1 = false
            this.$Message.info ('点击了取消')
        },
        layout () {
            this.$router.push ('/login')
        },
        getUserinfo () {
            console.log(this.$route.params.name)
            let userinfoname = this.$route.params.name
            this.username = userinfoname
        }
    },
    components: {
    }
}
</script>

<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
    margin-top: 60px;
}
.layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: auto;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main{
    padding: 10px;
}
.ivu-scroll-container{
    display: flex;
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-menu-left{
    background: #464c5b;
}
.layout-header{
    height: 60px;
    background: #fff;
    line-height: 60px;
    position: relative;
    z-index: 9;
    right: 0px;
    left: 0px;
}
.layout-logo-left{
    width: 90%;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    text-align: center;
  /*  background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;*/
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
.layout-hide-text .layout-text{
    display: none;
}
.layout-logo-left{
    color: #fff;
}
.ivu-col{
    transition: width .2s ease-in-out;
}
.ivu-row-flex{
    height: 100%;
}
.userinfo{
    display: inline-block;
    float: right;
}
.userinfo .ivu-dropdown{
    margin-top: 50px;
}
 .ivu-dropdown {
    margin-right: 25px;
    margin-top: 22px;
}
.ivu-menu-submenu-title{
    padding: 14px;
}

.head-img {
    width: 100%;
    height: 60px;
    line-height: 60px;
    float: right;
    margin-top: -50px;
}
.head-img img{
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    width: 40px;
    height: 40px;
    float: right;
}
.ivu-select-dropdown .ivu-dropdown {
    margin: 0px 12px 0px 0px;
}
._iconCls{
    width: 56px;
    text-align: center;
}
.ivu-icon .ivu-icon-navicon {
    background: red;
}
</style>
