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
                            <Menu-item :name="item.children[0].path">
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
                <div class="layout-header" :class="[showWidth ? 'maxwidth' : 'minwidth']">
                    <Button type="text" @click="toggleClick">
                    <Icon type="md-contacts" size="32"></Icon>
                    </Button>
                    <div class="userinfo">
                        <Dropdown placement="bottom-end">
                            <span class="head-img">
                                {{'火男'}}
                                <img src="@/assets/homelogo.jpg">
                            </span>
                            <DropdownMenu slot="list">
                                <DropdownItem>修改密码</DropdownItem>
                                <DropdownItem>退出</DropdownItem>
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
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            openNames: [this.$route.matched[0].name],
            spanLeft: 5,
            spanRight: 19,
            logoIsDisplay: false,
            loading: true,
            transfer: true,
            showWidth: true
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
    methods: {
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 1
                this.spanRight = 23
                this.showWidth = false // 导航切换宽度变化
            } else {
                this.spanLeft = 5
                this.spanRight = 19
                this.showWidth = true
            }
        },
        menuSelect (name) {
            this.$router.push({ path: name })
        },
        dropDown (name) {
            this.$router.push({ path: name })
            console.log(name)
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
    position: fixed;
    z-index: 9;
    right: 0;
    left:  21%;
}
.maxwidth {
    left: 21%;
}
.minwidth {
    left: 4.2%;
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
