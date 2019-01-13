<template>
    <div class="header">
        <div class="header-logo"></div>
        <Menu mode="horizontal"  active-name="1" class='header-menu'>
            <MenuItem name="1">
                <Icon type="ios-paper" />
                内容管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people" />
                用户管理
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.header {
    height: 60px;
    width: 100%;
    background: #515a6e;
}
.ivu-menu-horizontal {
    left:50px;
}
</style>
