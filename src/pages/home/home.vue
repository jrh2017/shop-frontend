<template>
    <div div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <!-- 左侧菜单 -->
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :mode="modeType" theme="dark" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
                    <div class="layout-logo-left">
                        <Icon type="paper-airplane" :size="logoSize" v-show="logoIsDisplay">
                        </Icon>
                        <span class="layout-text"> JRKL 管理系统</span>
                    </div>
                    <!-- 一级菜单 -->
                    <template v-for="(item,index) in $router.options.routes1" v-if="spanLeft >= 5 && !item.hidden">
                        <Submenu :name="item.name" v-if="!item.leaf">
                            <!-- 左侧一级菜单名称-->
                            <template slot="title">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.name}}</span>
                            </template>
                            <!-- 一级菜单子菜单 -->
                            <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path">{{child.name}}</Menu-item>
                            </template>
                        </Submenu>
                        <!-- 单节点菜单 -->
                        <template  v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path">
                                 <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text" >{{item.children[0].name}}</span>
                            </Menu-item>
                        </template>
                    </template>
                    <!-- 折叠左侧菜单 -->
                    <template v-for="(item,index) in $router.options.routes" v-if="spanLeft < 5 && !item.hidden">
                        <Dropdown placement="right-start" class="_dropdownList" transfer="true" @on-click="dropDown">
                            <a href="javascript:void(0)">
                                <Icon :type="item.iconCls" class="_iconCls ivu-col-span-1" :size="iconSize"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                 <DropdownItem  v-if="!item.name" :name="item.children[0].path">{{item.children[0].name}}</DropdownItem>
                                  <Dropdown placement="right-start" transfer="true" v-if="item.children && item.name">
                                      <DropdownItem>
                                        {{item.name}}
                                        <Icon type="ios-arrow-right"></Icon>
                                    </DropdownItem>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(child,childIndex) in item.children" :key="childIndex" :name="child.path">{{child.name}}</DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                            </DropdownMenu>
                        </Dropdown>
                    </template>
                </Menu>
            </i-col>
            <!-- 右侧部分 -->
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="md-exit" size="32"></Icon>
                    </i-button>
                    <div class="userinfo">
                        <Dropdown placement="bottom-end">
                            <span class="head-img">
                                {{'蔡依林'}}
                                <img src="@/assets/homelogo.jpg">
                            </span>
                            <Dropdown-menu slot="list">
                                <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
                                <Dropdown-item @click.native="logout()">修改密码</Dropdown-item>
                            </Dropdown-menu>
                        </Dropdown>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                     </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            openNames: [this.$route.matched[0].name],
            // curUserName : sessionStorage.getItem('user').replace(/\"/g, ""),
            modeType: 'vertical',
            spanLeft: 5,
            spanRight: 19,
            logoIsDisplay: false,
            loading: true
            // modal1: false,
            // formValidate: {
            //     oldPassword: '',
            //     newPassword: '',
            //     resetPassword:''
            // },
            // ruleValidate: {
            //     oldPassword: [
            //         { required: true, message: '密码不能为空', trigger: 'blur' }
            //     ],
            //     newPassword: [
            //         { required: true, message: '密码不能为空', trigger: 'blur' }
            //     ],
            //     resetPassword: [
            //         { required: true, message: '密码不能为空', trigger: 'blur' }
            //     ]
            // }
        }
    },
    computed: {
        logoSize () {
            if (this.spanLeft !== 5) {
                this.logoIsDisplay = true
                return 50
            } else {
                this.logoIsDisplay = false
                return 0
            }
        },
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24
        }
    },
    methods: {
        menuSelect (name) {
            this.$router.push({ path: name })
        },
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 1
                this.spanRight = 23
            } else {
                this.spanLeft = 5
                this.spanRight = 19
            }
        },
        menuSelect(name) {
            this.$router.push({ path: name });
        },
        dropDown(name) {
            this.$router.push({ path: name });
            console.log(name);
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
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
         height: 80%;
    }
    .layout-content-main{
        padding: 10px;
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
