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
                    <div class="p-table">
                        <div class="table-title"">
                            <span>患者合并用药情况</span>
                            <a class="p-title-a" @click="addCombinationModal">
                                <Icon type="md-add" /><span>新增数据</span>
                            </a>
                        </div>
                        <i-table border highlight-row :columns="combinationColumns" :data="combinationData"></i-table>
                    </div>
                    <div class="p-table">
                        <div class="table-title">
                            <span>化疗前后实验检查</span>
                            <a class="p-title-a" @click="addLaboratoryModal">
                                <Icon type="md-add" /><span>新增数据</span>
                            </a>
                        </div>
                        <i-table border highlight-row :columns="laboratoryColumns" :data="laboratoryData"></i-table>
                    </div>
                </div>
                <span v-else>暂无预处理</span>
            </div>
        </div>
        <div class="p-card">
            <div class="p-title">化疗期间的监护 
                <i-button type="success" size="small" class="p-title-btn" v-if="!tutelage">添加监护</i-button>
                <i-button type="success" size="small" class="p-title-btn" v-if="tutelage">编辑监护</i-button>
            </div>
            <div class="p-content">
                <div v-if="tutelage" class="table-content"></div>
                <span v-else>暂无监护</span>
            </div>
        </div>
        <div class="p-card">
            <div class="p-title">样本采集记录表</div>
            <div class="p-content">
                <div class="table-content">
                    <div class="p-table">
                        <div class="table-title">
                            <span>样本采集记录表（表格内打”√”）</span>
                            <a class="p-title-a">
                                <Icon type="md-add" /><span>新增数据</span>
                            </a>
                        </div>
                        <i-table border highlight-row :columns="collectColumns" :data="laboratoryData"></i-table>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="addPretreatmentFlag" title="预处理信息" :mask-closable="false" width="600">
            <Form :model="pretreatmentFormItem" :label-width="100">
                <Row>
                    <Col span="24">
                        <FormItem label="日期：">
                            <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="pretreatmentFormItem.create_date"></DatePicker>
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
        <Modal v-model="addCombinationFlag" title="合并用药信息" :mask-closable="false" width="600">
            <Form :model="combinationFormItem" :label-width="100">
                <Row>
                    <Col span="24">
                        <FormItem label="药物：">
                            <Input v-model="combinationFormItem.drug_name" placeholder="请输入药物名..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="用药时间：">
                            <DatePicker format="yyyy/MM/dd" type="daterange" placeholder="请选择日期" v-model="combinationFormItem.date_range"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="用途：">
                            <Input v-model="combinationFormItem.purpose" placeholder="请输入用途..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="用量：">
                            <Input v-model="combinationFormItem.dosage" placeholder="请输入用量..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="给药方式：">
                            <Input v-model="combinationFormItem.drug_way" placeholder="请输入给药方式..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="有无相互作用：">
                            <RadioGroup v-model="combinationFormItem.is_interaction">
                                <Radio :label="0">无</Radio>
                                <Radio :label="1">有</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注：">
                            <Input v-model="combinationFormItem.remark" type="textarea" placeholder="请输入备注内容..."></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addCombinationFlag=false">取消</Button>
                <Button type="primary" @click="addCombinationOk" v-if="addCombinationType == 'new'">确定</Button>
                <Button type="primary" @click="editCombinationOk" v-else>修改</Button>
           </div>
        </Modal>
        <Modal v-model="addLaboratoryFlag" title="患者化疗前后实验室检查" :mask-closable="false" width="800">
            <Form :model="laboratoryFormItem" :label-width="100">
                <Row>
                    <Col span="24">
                        <FormItem label="日期：">
                            <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="laboratoryFormItem.use_date"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Divider orientation="left" size="small">肝功能</Divider>
                <Row>
                    <Col span="12">
                        <FormItem label="ALT(U/L)：">
                            <Input v-model="laboratoryFormItem.liver_alt"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="AST(U/L)：">
                            <Input v-model="laboratoryFormItem.liver_ast"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="ALP(U/L)：">
                            <Input v-model="laboratoryFormItem.liver_alp"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="TBil(umol/L)：">
                            <Input v-model="laboratoryFormItem.liver_tbil"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Divider orientation="left" size="small">肾功能</Divider>
                <Row>
                    <Col span="8">
                        <FormItem label="肌酐(umol/L)：">
                            <Input v-model="laboratoryFormItem.kidney_crea"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="尿酸(umol/L)：">
                            <Input v-model="laboratoryFormItem.kidney_trioxypurine"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="LDH(U/L)：">
                            <Input v-model="laboratoryFormItem.kidney_ldh"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Divider orientation="left" size="small">血常规</Divider>
                <Row>
                    <Col span="8">
                        <FormItem label="WBC(×109/L)：">
                            <Input v-model="laboratoryFormItem.blood_wbc"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="PLT(×109/L)：">
                            <Input v-model="laboratoryFormItem.blood_plt"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="Hb(g/L)：">
                            <Input v-model="laboratoryFormItem.blood_hb"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Divider orientation="left" size="small">电解质</Divider>
                <Row>
                    <Col span="8">
                        <FormItem label="Na(mmol/L)：">
                            <Input v-model="laboratoryFormItem.electrolyte_na"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="K(mmol/L)：">
                            <Input v-model="laboratoryFormItem.electrolyte_k"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="Ca(mmol/L)：">
                            <Input v-model="laboratoryFormItem.electrolyte_ca"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="addLaboratoryFlag=false">取消</Button>
                <Button type="primary" @click="addLaboratoryOk" v-if="addLaboratoryType == 'new'">确定</Button>
                <Button type="primary" @click="editLaboratoryOk" v-else>修改</Button>
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
            tutelage: null,
            addPretreatmentFlag: false,
            addCombinationFlag: false,
            addLaboratoryFlag: false,
            addPretreatmentType: 'new',
            addCombinationType: 'new',
            addLaboratoryType: 'new',
            pretreatmentFormItem: {
                patient_id: this.$route.params.id,
                create_date: '',
                is_alkalization: 0,
                is_alkalization_remark: '',
                is_prevent_diarrhea: 0,
                is_prevent_diarrhea_remark: ''
            },
            combinationFormItem: {
                patient_id: this.$route.params.id,
                drug_name: '',
                date_range: [],
                purpose: '',
                dosage: '',
                drug_way: '',
                is_interaction: 0,
                remark: ''
            },
            laboratoryFormItem: {
                patient_id: this.$route.params.id,
                use_date: null,
                liver_alt: '',
                liver_ast: '',
                liver_alp: '',
                liver_tbil: '',
                kidney_crea: '',
                kidney_trioxypurine: '',
                kidney_ldh: '',
                blood_wbc: '',
                blood_plt: '',
                blood_hb: '',
                electrolyte_na: '',
                electrolyte_k: '',
                electrolyte_ca:''
            },
            pretreatmentFormItemAdd: {
                patient_id: this.$route.params.id,
                create_date: '',
                is_alkalization: 0,
                is_alkalization_remark: '',
                is_prevent_diarrhea: 0,
                is_prevent_diarrhea_remark: ''
            },
            combinationFormItemAdd: {
                patient_id: this.$route.params.id,
                drug_name: '',
                date_range: [],
                purpose: '',
                dosage: '',
                drug_way: '',
                is_interaction: 0,
                remark: ''
            },
            laboratoryFormItemAdd: {
                patient_id: this.$route.params.id,
                use_date: null,
                liver_alt: '',
                liver_ast: '',
                liver_alp: '',
                liver_tbil: '',
                kidney_crea: '',
                kidney_trioxypurine: '',
                kidney_ldh: '',
                blood_wbc: '',
                blood_plt: '',
                blood_hb: '',
                electrolyte_na: '',
                electrolyte_k: '',
                electrolyte_ca:''
            },
            combinationColumns: [{
                title: '药物',
                key: 'drug_name',
                align: 'center'
            }, {
                title: '开始时间',
                key: 'start_date',
                align: 'center'
            }, {
                title: '结束时间',
                key: 'end_date',
                align: 'center'
            }, {
                title: '用途',
                key: 'purpose',
                align: 'center'
            }, {
                title: '用量',
                key: 'dosage',
                align: 'center'
            }, {
                title: '给药方式',
                key: 'drug_way',
                align: 'center'
            }, {
                title: '有无相互作用',
                key: 'is_interaction',
                align: 'center',
                render: (h, params) => {
                    if (params.row.is_interaction) {
                        return <span>有</span>
                    } else {
                        return <span>无</span>
                    }
                }
            }, {
                title: '备注',
                key: 'remark',
                align: 'center'
            }, {
                title: '操作',
                key: 'action',
                width: 120,
                align: 'center',
                render: (h, params) => {
                    return <div class='ope-btns'>
                        <a on-click={() => this.editCombination(this, params)}>编辑</a>
                        <a on-click={() => this.deleteCombinationModal(this, params)}>删除</a>
                    </div>
                }
            }],
            laboratoryColumns: [{
                title: '日期',
                key: 'use_date',
                width: 120,
                align: 'center'
            }, {
                title: '肝功能',
                align: 'center',
                children: [{
                    title: 'ALT (U/L)',
                    key: 'liver_alt',
                    align: 'center'
                }, {
                    title: 'AST (U/L)',
                    key: 'liver_ast',
                    align: 'center'
                }, {
                    title: 'ALP (U/L)',
                    key: 'liver_alp',
                    align: 'center'
                }, {
                    title: 'TBil (umol/L)',
                    key: 'liver_tbil',
                    align: 'center'
                }]
            }, {
                title: '肾功能',
                align: 'center',
                children: [{
                    title: '肌酐 (umol/L)',
                    key: 'kidney_crea',
                    align: 'center'
                }, {
                    title: '尿酸 (umol/L)',
                    key: 'kidney_trioxypurine',
                    align: 'center'
                }, {
                    title: 'LDH (U/L)',
                    key: 'kidney_ldh',
                    align: 'center'
                }]
            }, {
                title: '血常规',
                align: 'center',
                children: [{
                    title: 'WBC (×109/L)',
                    key: 'blood_wbc',
                    align: 'center'
                }, {
                    title: 'PLT (×109/L)',
                    key: 'blood_plt',
                    align: 'center'
                }, {
                    title: 'Hb (g/L)',
                    key: 'blood_hb',
                    align: 'center'
                }]
            }, {
                title: '电解质',
                align: 'center',
                children: [{
                    title: 'Na (mmol/L)',
                    key: 'electrolyte_na',
                    align: 'center'
                }, {
                    title: 'K (mmol/L)',
                    key: 'electrolyte_k',
                    align: 'center'
                }, {
                    title: 'Ca (mmol/L)',
                    key: 'electrolyte_ca',
                    align: 'center'
                }]
            }, {
                title: '操作',
                key: 'action',
                width: 120,
                align: 'center',
                render: (h, params) => {
                    return <div class='ope-btns'>
                        <a on-click={() => this.editLaboratory(this, params)}>编辑</a>
                        <a on-click={() => this.deleteLaboratoryModal(this, params)}>删除</a>
                    </div>
                }
            }],
            collectColumns: [{
                title: '采集时间',
                key: 'collect_time',
                width: 120,
                align: 'center'
            }, {
                title: '血清',
                align: 'center',
                children: [{
                    title: '化疗前',
                    key: 'blood_before_chem',
                    align: 'center'
                }, {
                    title: '腹泻后',
                    key: 'blood_after_diarrhea',
                    align: 'center'
                }, {
                    title: '骨髓抑制后',
                    key: 'blood_after_marrow',
                    align: 'center'
                }, {
                    title: '1.5h',
                    key: 'blood_1_5_h',
                    align: 'center'
                }, {
                    title: '2.0h',
                    key: 'blood_2_0_h',
                    align: 'center'
                }]
            }, {
                title: '粪便',
                align: 'center',
                children: [{
                    title: '化疗前',
                    key: 'shit_before_chem',
                    align: 'center'
                }, {
                    title: '腹泻后',
                    key: 'shit_after_diarrhea',
                    align: 'center'
                }, {
                    title: '骨髓抑制后',
                    key: 'shit_after_marrow',
                    align: 'center'
                }]
            }, {
                title: '尿液',
                align: 'center',
                children: [{
                    title: '化疗前',
                    key: 'urine_before_chem',
                    align: 'center'
                }, {
                    title: '腹泻后',
                    key: 'urine_after_diarrhea',
                    align: 'center'
                }, {
                    title: '骨髓抑制后',
                    key: 'urine_after_marrow',
                    align: 'center'
                }]
            }, {
                title: '操作',
                key: 'action',
                width: 120,
                align: 'center',
                render: (h, params) => {
                    return <div class='ope-btns'>
                        <a on-click={() => this.editLaboratory(this, params)}>编辑</a>
                        <a on-click={() => this.deleteLaboratoryModal(this, params)}>删除</a>
                    </div>
                }
            }],
            combinationData: [],
            laboratoryData: []
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
                    if (_this.pretreatment && _this.pretreatment.combinationList.length) {
                        _this.combinationData = _this.pretreatment.combinationList
                    }
                    if (_this.pretreatment && _this.pretreatment.laboratoryList.length) {
                        _this.laboratoryData = _this.pretreatment.laboratoryList
                    }
                } else {
                    _this.$Message.error(res.data)
                }
            }).catch(function (error) {
                _this.$Message.error('获取患者详情失败')
            })
        },
        addPretreatmentModal () {
            this.addPretreatmentType = 'new'
            this.pretreatmentFormItem = Object.assign({}, this.pretreatmentFormItemAdd)
            this.addPretreatmentFlag = true
        },
        addCombinationModal () {
            this.addCombinationType = 'new'
            this.combinationFormItem = Object.assign({}, this.combinationFormItemAdd)
            this.addCombinationFlag = true
        },
        addLaboratoryModal () {
            this.addLaboratoryType = 'new'
            this.laboratoryFormItem = Object.assign({}, this.laboratoryFormItemAdd)
            this.addLaboratoryFlag = true
        },
        editPretreatmentModal () {
            this.addPretreatmentType = 'edit'
            this.pretreatmentFormItem = Object.assign({}, this.pretreatment)
            this.addPretreatmentFlag = true
        },
        editPretreatmentModal () {
            this.addPretreatmentType = 'edit'
            this.pretreatmentFormItem = Object.assign({}, this.pretreatment)
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
            let _this = this
            axios.post(`${api.basehost}/patient/editPretreatment`, this.pretreatmentFormItem).then(function (response) {
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
        addCombinationOk () {
            let _this = this
            if (this.combinationFormItem.date_range.length) {
                this.combinationFormItem.start_date = this.combinationFormItem.date_range[0]
                this.combinationFormItem.end_date = this.combinationFormItem.date_range[1]
            } else {
                this.combinationFormItem.start_date = ""
                this.combinationFormItem.end_date = ""
            }
            axios.post(`${api.basehost}/patient/addCombination`, this.combinationFormItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addCombinationFlag = false
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('新增合并用药情况失败')
            })
        },
        addLaboratoryOk () {
            let _this = this
            axios.post(`${api.basehost}/patient/addLaboratory`, this.laboratoryFormItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addLaboratoryFlag = false
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('新增患者化疗前后实验室检查失败')
            })
        },
        editCombination (vm, params) {
            this.addCombinationType = 'edit'
            this.combinationFormItem = Object.assign({}, params.row)
            this.combinationFormItem.date_range = [params.row.start_date, params.row.end_date]
            this.addCombinationFlag = true
        },
        editCombinationOk () {
            let _this = this
            if (this.combinationFormItem.date_range.length) {
                this.combinationFormItem.start_date = this.combinationFormItem.date_range[0]
                this.combinationFormItem.end_date = this.combinationFormItem.date_range[1]
            } else {
                this.combinationFormItem.start_date = ""
                this.combinationFormItem.end_date = ""
            }
            axios.post(`${api.basehost}/patient/editCombination`, this.combinationFormItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addCombinationFlag = false
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('编辑合并用药情况失败')
            })
        },
        editLaboratory (vm, params) {
            this.addLaboratoryType = 'edit'
            this.laboratoryFormItem = Object.assign({}, params.row)
            this.addLaboratoryFlag = true
        },
        editLaboratoryOk () {
            let _this = this
            axios.post(`${api.basehost}/patient/editLaboratory`, this.laboratoryFormItem).then(function (response) {
                if (response.data.code == 1) {
                    _this.addLaboratoryFlag = false
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('编辑患者化疗前后实验室检查失败')
            })
        },
        deleteCombinationModal (vm, params) {
            this.$Modal.confirm({
                title: '警告',
                content: '<p>是否确认删除这条合并用药情况</p>',
                onOk: () => {
                    this.deleteCombination(params)
                },
                onCancel: () => {
                    console.log('关闭对话框')
                }
            });
        },
        deleteLaboratoryModal (vm, params) {
            this.$Modal.confirm({
                title: '警告',
                content: '<p>是否确认删除这条患者化疗前后实验室检查</p>',
                onOk: () => {
                    this.deleteLaboratory(params)
                },
                onCancel: () => {
                    console.log('关闭对话框')
                }
            });
        },
        deleteCombination (params) {
            let _this = this
            axios.delete(`${api.basehost}/patient/removeCombination/${params.row.id}`).then(function (response) {
                if (response.data.code == 1) {
                    _this.$Message.success("删除合并用药情况成功")
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('删除合并用药情况失败')
            })
        },
        deleteLaboratory (params) {
            let _this = this
            axios.delete(`${api.basehost}/patient/removeLaboratory/${params.row.id}`).then(function (response) {
                if (response.data.code == 1) {
                    _this.$Message.success("删除患者化疗前后实验室检查成功")
                    _this.pretreatmentDetail(_this.$route.params.id)
                } else {
                    _this.$Message.error(response.data.msg)
                }
            }).catch(function (error) {
                _this.$Message.error('删除患者化疗前后实验室检查失败')
            })
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
        line-height: 1.8;
        padding: 10px;
        background-color: #ccc;
    }
    .p-card .p-content {
        padding: 10px 0;
        text-align: center;
    }
    .p-title-btn {
        float: right;
        margin-right: 20px;
    }
    .p-title-a {
        position: absolute;
        right: 20px;
        top: 0px;
    }
    .table-content {
        text-align: left;
    }
    .p-table {
        margin-top: 20px;
    }
    .table-title {
        text-align: center;
        line-height: 40px;
        position: relative;
        border-right: 1px solid #e8eaec;
        border-top: 1px solid #e8eaec;
        border-left: 1px solid #e8eaec;
    }
    /deep/ .ope-btns a {
        margin: 0 5px;
    }
</style>