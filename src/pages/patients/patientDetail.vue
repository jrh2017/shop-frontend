<template>
    <div class="p-detail-main">
        <div class="p-card">
            <div class="p-title">基本信息</div>
            <Baseinfo :info-data="baseInfo" v-if="baseInfo != null"/>
        </div>
        <div class="p-card">
            <div class="p-title">预处理情况 
                <i-button type="success" size="small" class="p-title-btn" v-if="!pretreatment" @click="addPretreatmentModal">添加预处理</i-button>
                <i-button type="success" size="small" class="p-title-btn" v-if="pretreatment" @click="editPretreatmentModal">编辑预处理</i-button>
            </div>
            <div class="p-content">
                <div v-if="pretreatment" class="table-content">
                    <Row>
                        <Col span="8">
                            <span>日期：{{pretreatment.create_date}}</span>
                        </Col>
                        <Col span="8">
                            <span>是否碱化：
                                <template v-if="pretreatment.is_alkalization">是</template>
                                <template v-else>否</template>
                            </span> &nbsp;&nbsp;&nbsp;&nbsp; 
                            <span>备注：{{pretreatment.is_alkalization_remark}}</span>
                        </Col>
                        <Col span="8">
                            <span>是否预防腹泻：
                                <template v-if="pretreatment.is_prevent_diarrhea">是</template>
                                <template v-else>否</template>
                            </span> &nbsp;&nbsp;&nbsp;&nbsp; 
                            <span>备注：{{pretreatment.is_prevent_diarrhea_remark}}</span>
                        </Col>
                    </Row>
                </div>
                <span v-else>暂无预处理</span>
            </div>
        </div>
        <Modal v-model="addPretreatmentFlag" title="患者基本信息" :mask-closable="false" width="600">
            <Form :model="pretreatmentFormItem" :label-width="100">
                <Row>
                    <Col span="24">
                        <FormItem label="日期：">
                            <DatePicker type="date" placeholder="请选择日期" v-model="pretreatmentFormItem.create_date"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="是否碱化：">
                            <RadioGroup v-model="pretreatmentFormItem.is_alkalization">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="16">
                        <FormItem label="备注：">
                            <Input v-model="pretreatmentFormItem.is_alkalization_remark" placeholder="请输入备注..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="是否预防腹泻：">
                            <RadioGroup v-model="pretreatmentFormItem.is_prevent_diarrhea">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="16">
                        <FormItem label="备注：">
                            <Input v-model="pretreatmentFormItem.is_prevent_diarrhea_remark" placeholder="请输入备注..."></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addPretreatmentFlag=false">取消</Button>
                <Button type="primary" @click="addPretreatmentOk" v-if="addPretreatmentType == 'new'">确定</Button>
                <Button type="primary" @click="editPretreatmentOk" v-else>修改</Button>
           </div>
        </Modal>
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
            baseInfo: null,
            pretreatment: null,
            addPretreatmentFlag: false,
            addPretreatmentType: 'new',
            pretreatmentFormItem: {
                patient_id: this.$route.params.id,
                create_date: '',
                is_alkalization: 0,
                is_alkalization_remark: '',
                is_prevent_diarrhea: 0,
                is_prevent_diarrhea_remark: ''
            },
            pretreatmentFormItemFormItemAdd: {
                patient_id: this.$route.params.id,
                create_date: '',
                is_alkalization: 0,
                is_alkalization_remark: '',
                is_prevent_diarrhea: 0,
                is_prevent_diarrhea_remark: ''
            }
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
        },
        pretreatmentDetail (id) {
            let _this = this
            axios.get(`${api.basehost}/patient/pretreatmentDetail/${id}`).then(function (res) {
                if (res.data.code == 1) {
                    _this.pretreatment = res.data.data
                } else {
                    _this.$Message.error(res.data)
                }
            }).catch(function (error) {
                _this.$Message.error('获取患者详情失败')
            })
        },
        addPretreatmentModal () {
            this.addPretreatmentType = 'new'
            this.pretreatmentFormItem = this.pretreatmentFormItemFormItemAdd
            this.addPretreatmentFlag = true
        },
        editPretreatmentModal () {
            this.addPretreatmentType = 'edit'
            this.pretreatmentFormItem = this.pretreatment
            this.addPretreatmentFlag = true
        },
        addPretreatmentOk () {
            let _this = this
            axios.post(`${api.basehost}/patient/addPretreatment`, this.pretreatmentFormItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addPretreatmentFlag = false
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('新增预处理失败')
            })
        },
        editPretreatmentOk () {
            console.log('编辑预处理')
        }
    },
    mounted() {
        let id = this.$route.params.id
        this.patientDetail(id)
        this.pretreatmentDetail(id)
    }
}
</script>
<style scoped>
    .p-card .p-title {
        line-height: 2;
        padding: 10px;
        background-color: #eee;
    }
    .p-card .p-content {
        padding: 10px 0;
        text-align: center;
    }
    .p-title-btn {
        float: right;
    }
    .table-content {
        text-align: left;
    }
</style>