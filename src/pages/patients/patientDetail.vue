<template>
    <div class="p-detail-main">
        <div class="p-card">
            <div class="title">基本信息</div>
            <Baseinfo :info-data="baseInfo" v-if="baseInfo != null"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { api } from '../../config'
import Baseinfo from './components/Baseinfo'
export default {
    name: "PatientDetail",
    components: {
        Baseinfo
    },
    data () {
        return {
            msg: 'test',
            baseInfo: null
        }
    },
    methods: {
        patientDetail (id) {
            let _this = this
            axios.get(`${api.basehost}/patient/patientDetail/${id}`).then(function (res) {
                if (res.data.code == 1) {
                    _this.baseInfo = res.data.data
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
    .p-card .title {
        line-height: 1.4;
        padding: 10px;
        background-color: #eee;
    }
</style>