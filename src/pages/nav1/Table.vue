<template>
    <div>
        <i-table border highlight-row :columns="columns1" :data="data1" :content="self" :ref="table"></i-table>
        </br>
        <div class="table-button">
            <div style="text-align: center">
                <Page :total="40" size="small" show-elevator show-sizer></Page>
            </div>
            <div>
                <i-button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</i-button>  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
        	self: this,
            table: 'table',
            columns1: [
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
                    width: 250,
                    align: 'center',
                    render:(h,params)=>{
                        return h('div',[
                            h('Button', {style:{width:'50px',height:'30px',background:'#3399ff',color:'#fff',align:'center'},on:{click: () =>{this.show(params.index)}}}, '查看'),
                            h('Button', {style:{width:'50px',height:'30px',background:'#ff6600',color:'#fff'},on:{click: () =>{this.remove(params.index)}}}, '删除')
                            ])
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
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
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
            this.data1.splice(index, 1)
        },
        exportData (type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                })
            }
        }
    }
}
</script>