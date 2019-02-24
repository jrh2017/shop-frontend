<template>
    <i-table border highlight-row :columns="columns3" :data="data1" :content="self"></i-table>
</template>
<script>
export default {
    data () {
        return {
        	self: this,
            columns3: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '年龄',
                    key: 'age',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'address',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                        }
                }
            ],
            data1: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ]
        }
    },
    methods: {
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].age}<br>地址：${this.data1[index].address}`
            })
        },
        remove (index) {
            this.data1.splice(index, 1);
        }
    }
}
</script>