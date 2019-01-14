<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1547475031&di=79b8be743cf50b29ea24d78b1a20b15a&src=http://pic3.16pic.com/00/55/43/16pic_5543165_b.jpg">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                目录1
                            </template>
                            <MenuItem name="1-1">子目录1</MenuItem>
                            <MenuItem name="1-2">子目录2</MenuItem>
                            <MenuItem name="1-3">子目录3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                目录2
                            </template>
                            <MenuItem name="2-1">子目录1</MenuItem>
                            <MenuItem name="2-2">子目录2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                目录3
                            </template>
                            <MenuItem name="3-1">子目录1</MenuItem>
                            <MenuItem name="3-2">子目录2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0px 24px'}">
                    <Tabs type="card" closable @on-tab-remove="handleTabRemove" >
                        <TabPane label="标签一" v-if="tab0">
                            <Content :style="{padding: '24px', minHeight: '500px', background: 'red'}">
                                Content
                            </Content>
                        </TabPane>
                        <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
                        <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
                    </Tabs>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data () {
        return {
            tab0: true,
            tab1: true,
            tab2: true
        }
    },
    methods: {
        handleTabRemove (name) {
            this['tab' + name] = false
        }
    }
}
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-logo>img{
    width: 100px;
    height: 30px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout{
    width: 100%;
    height: 100%;
}
.ivu-layout{
    margin-top:4px;
}
</style>
