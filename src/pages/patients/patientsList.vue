<template>
    <div class="p-main">
        <i-button type="success" @click="addShowModal">新增患者</i-button>
        <div class="form-search-table">
            <i-table border highlight-row :columns="columns3" :data="data1" :content="self"></i-table>
            <div style="margin-top: 20px;">
                <Page :current="pageNumber" :total="totalNumber" :page-size="pageSize" show-elevator style="float: right;" @on-change="searchTableData"/>
            </div>
        </div>
        <Modal v-model="addFlag" title="患者基本信息" :mask-closable="false" width="800">
            <Form :model="formItem" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="患者姓名">
                            <Input v-model="formItem.name" placeholder="请输入患者姓名..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="床号">
                            <Input v-model="formItem.bed_no" placeholder="请输入患者床号..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="病历号/ID号">
                            <Input v-model="formItem.idcard" placeholder="请输入患者病历号/ID号..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="性别">
                            <RadioGroup v-model="formItem.sex">
                                <Radio :label="1">男</Radio>
                                <Radio :label="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="年龄">
                            <Input v-model.number="formItem.age" :number="true" placeholder="请输入患者年龄..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="身高(cm)">
                            <Input v-model.number="formItem.height" :number="true" placeholder="请输入患者身高..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="体重(kg)">
                            <Input v-model.number="formItem.weight" :number="true" placeholder="请输入患者体重..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="体表面积(㎡)">
                            <Input v-model.number="formItem.body_area" :number="true" placeholder="请输入患者体表面积..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话">
                            <Input v-model="formItem.phone" placeholder="请输入联系方式..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="临床诊断">
                            <Input v-model="formItem.clinical_diagnosis" placeholder="请输入临床诊断..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="化疗史">
                            <Input v-model="formItem.chemotherapy_history" placeholder="请输入化疗史..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="过敏史">
                            <Input v-model="formItem.allergy_history" placeholder="请输入过敏史..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <div class="area-wapper">
                    <div class="title">危险因素：</div>
                    <Checkbox v-model="formItem.physical_power" :true-value="1" :false-value="0">体力状态≥3分</Checkbox>
                    <Checkbox v-model="formItem.pleural_effussion" :true-value="1" :false-value="0">胸腔积液或腹水</Checkbox>
                    <Checkbox v-model="formItem.loose_stools" :true-value="1" :false-value="0">便稀</Checkbox>
                    <Checkbox v-model="formItem.infection" :true-value="1" :false-value="0">存在感染</Checkbox>
                    <Checkbox v-model="formItem.renal_disease" :true-value="1" :false-value="0">肾功能障碍</Checkbox>
                    <Checkbox v-model="formItem.hepatosis" :true-value="1" :false-value="0">肝功能障碍</Checkbox>
                    <Checkbox v-model="formItem.radiation" :true-value="1" :false-value="0">放疗史</Checkbox>
                    <Checkbox v-model="formItem.other" :true-value="1" :false-value="0">其它请注明</Checkbox>
                </div>
                <div class="area-wapper">
                    <div class="title">个体化用药相关基因检测：</div>
                    <Row>
                        <Col>
                            <Checkbox v-model="formItem.ugt1a1_28" :true-value="1" :false-value="0">UGT1A1*28</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_28_1_1" :true-value="1" :false-value="0">*1*1</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_28_1_28" :true-value="1" :false-value="0">*1*28</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_28_28_28" :true-value="1" :false-value="0">*28*28</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Checkbox v-model="formItem.ugt1a1_6" :true-value="1" :false-value="0">UGT1A1*6</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_6_1_1" :true-value="1" :false-value="0">*1*1</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_6_1_6" :true-value="1" :false-value="0">*1*6</Checkbox>
                            <Checkbox v-model="formItem.ugt1a1_6_6_6" :true-value="1" :false-value="0">*6*6</Checkbox>
                        </Col>
                    </Row>
                </div>
                <div class="area-wapper">
                    <div class="title">β-葡萄糖醛酸酶活性检测：</div>
                    <Row>
                        <Col span="2">
                            <FormItem label="" :label-width="0">
                                <Checkbox v-model="formItem.glucuronidase_blood" :true-value="1" :false-value="0">血清</Checkbox>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="浓度">
                                <Input v-model="formItem.glucuronidase_blood_concentration"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="2">
                            <FormItem label="" :label-width="0">
                                <Checkbox v-model="formItem.glucuronidase_shit" :true-value="1" :false-value="0">粪便</Checkbox>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="浓度">
                                <Input v-model="formItem.glucuronidase_shit_concentration"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Checkbox v-model="formItem.glucuronidase_undo" :true-value="1" :false-value="0">未做</Checkbox>
                        </Col>
                    </Row>
                </div>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addFlag=false">取消</Button>
                <Button type="primary" @click="addOk" v-if="formType == 'new'">确定</Button>
                <Button type="primary" @click="editOk" v-else>修改</Button>
           </div>
        </Modal>
    </div>
</template>
<script>
import axios from 'axios'
import { api } from '../../config'
export default {
    name: "PatientsList",
    data () {
        return {
            self: this,
            addFlag: false,
            pageSize: 10,
            pageNumber: 1,
            totalNumber: 0,
            formType: 'new',
            formItemAdd: {
                name: '',
                bed_no: '',
                idcard: '',
                sex: 1,
                age: null,
                height: null,
                weight: null,
                body_area: null,
                phone: '',
                clinical_diagnosis: '',
                chemotherapy_history: '',
                allergy_history: '',
                physical_power: 0,
                pleural_effussion: 0,
                loose_stools: 0,
                infection: 0,
                renal_disease: 0,
                hepatosis: 0,
                radiation: 0,
                other: 0,
                other_desc: '',
                ugt1a1_28: 0,
                ugt1a1_28_1_1: 0,
                ugt1a1_28_1_28: 0,
                ugt1a1_28_28_28: 0,
                ugt1a1_6: 0,
                ugt1a1_6_1_1: 0,
                ugt1a1_6_1_6: 0,
                ugt1a1_6_6_6: 0,
                glucuronidase_blood: 0,
                glucuronidase_blood_concentration: '',
                glucuronidase_shit: 0,
                glucuronidase_shit_concentration: '',
                glucuronidase_undo: 0
            },
            formItem: {},
            columns3: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '病历号/ID号',
                    key: 'idcard',
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '年龄',
                    key: 'age',
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'sex',
                    align: 'center',
                    render: (h, params) => {
                        return <span>{params.row.sex == 1 ? '男' : '女'}</span>
                    }
                },
                {
                    title: '临床诊断',
                    key: 'clinical_diagnosis',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return <div class='ope-btns'>
                            <a on-click={() => this.gotoDetail(params)}>查看详情</a>
                            <a on-click={() => this.editBaseInfo(this, params)}>编辑基本信息</a>
                            <a on-click={() => this.deletePatientModal(this, params)}>删除</a>
                        </div>
                    }
                }
            ],
            data1: []
        }
    },
    methods: {
        addShowModal () {
            this.formType = 'new'
            this.formItem = this.formItemAdd
            this.addFlag = true
        },
        addOk () {
            let _this = this
            axios.post(`${api.basehost}/patient/addPatient`, this.formItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addFlag = false
                    _this.pageNumber = 1
                    _this.searchTableData()
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('新增患者失败')
            })
        },
        editOk () {
            let _this = this
            axios.post(`${api.basehost}/patient/editPatient`, this.formItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.$Message.success("修改基本信息成功")
                    _this.addFlag = false
                    _this.pageNumber = 1
                    _this.searchTableData()
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('编辑患者失败')
            })
        },
        deletePatientModal (vm, params) {
            this.$Modal.confirm({
                title: '警告',
                content: '<p>是否确认删除这条记录</p>',
                onOk: () => {
                    this.deletePatient(params)
                },
                onCancel: () => {
                    console.log('关闭对话框')
                }
            });
        },
        deletePatient (params) {
            let _this = this
            axios.get(`${api.basehost}/patient/removePatient/${params.row.id}`).then(function (response) {
                if (response.data.code == 1) {
                    _this.$Message.success("删除基本信息成功")
                    _this.pageNumber = 1
                    _this.searchTableData()
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('删除患者失败')
            })
        },
        searchTableData (n) {
            if (n) {
                this.pageNumber = n
            }
            let _this = this
            axios.post(`${api.basehost}/patient/searchPatients`, {
                "page_size": this.pageSize,
                "page_number": this.pageNumber
            }).then(function (res) {
                if (res.data.code == 1) {
                    // console.log(res.data.data)
                    _this.data1 = res.data.data
                    _this.totalNumber = res.data.total
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('查询失败')
            })
        },
        editBaseInfo (vm, params) {
            this.formType = 'edit'
            this.formItem = Object.assign({}, params.row)
            this.addFlag = true
        },
        gotoDetail (params) {
            this.$router.push({path: `/pages/home/detail/${params.row.id}`})
        }
    },
    mounted() {
        this.searchTableData()
    }
}
</script>
<style scoped>
    .form-search-table {
        margin-top: 20px;
    }
    .area-wapper {
        border: 1px solid #ccc;
        padding: 5px 20px;
        margin-bottom: 24px;
    }
    .area-wapper .title {
        line-height: 1;
        padding: 10px 12px 10px 0;
    }
    .area-wapper .ivu-form-item {
        margin-bottom: 10px;
    }
    /deep/ .ope-btns a {
        margin: 0 5px;
    }
</style>