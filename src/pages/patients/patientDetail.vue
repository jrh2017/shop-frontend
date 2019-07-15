<template>
    <div>测试测试测试</div>
</template>
<script>
import axios from 'axios'
import { api } from '../../config'
export default {
    name: "PatientDetail",
    data () {
        return {
            msg: 'test'
        }
    },
    methods: {
        patientDetail (id) {
            let _this = this
            axios.get(`${api.basehost}/patient/patientDetail/${id}`).then(function (res) {
                if (res.data.code == 1) {
                    console.log()
                } else {
                    _this.$Message.error(res.data)
                }
            }).catch(function (error) {
                _this.$Message.error('获取患者详情失败')
            })
        }
    },
    mounted() {
        let id = this.$route.params.id
        this.patientDetail(id)
    }
}
</script>
<style scoped>
    
</style>