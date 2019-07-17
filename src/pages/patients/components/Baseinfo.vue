<template>
    <div class="b-content">
        <Row>
            <Col span="6">
                <span>患者姓名：{{infoData.name}}</span>
            </Col>
            <Col span="6">
                <span>床号： {{infoData.bed_no}}</span>
            </Col>
            <Col span="6">
                <span>病历号/ID号： {{infoData.idcard}}</span>
            </Col>
            <Col span="6">
                <span>性别： {{infoData.sex == 1 ? '男' : '女'}}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span>年龄： {{infoData.age}}</span>
            </Col>
            <Col span="6">
                <span>身高： {{infoData.height}}cm</span>
            </Col>
            <Col span="6">
                <span>体重： {{infoData.weight}}kg</span>
            </Col>
            <Col span="6">
                <span>体表面积： {{infoData.body_area}}㎡</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span>手机号码： {{infoData.phone}}</span>
            </Col>
            <Col span="6">
                <span>临床诊断： {{infoData.clinical_diagnosis}}</span>
            </Col>
            <Col span="6">
                <span>化疗史： {{infoData.chemotherapy_history}}</span>
            </Col>
            <Col span="6">
                <span>过敏史： {{infoData.allergy_history}}</span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span class="title">危险因素：</span>
                <div style="display: inline-block;" v-if="infoData.physical_power || infoData.pleural_effussion || infoData.loose_stools || infoData.infection || infoData.renal_disease || infoData.hepatosis || infoData.radiation || infoData.other">
                    <span v-if="infoData.physical_power">体力状态≥3分、</span>
                    <span v-if="infoData.pleural_effussion">胸腔积液或腹水、</span>
                    <span v-if="infoData.loose_stools">便稀、</span>
                    <span v-if="infoData.infection">存在感染、</span>
                    <span v-if="infoData.renal_disease">肾功能障碍、</span>
                    <span v-if="infoData.hepatosis">肝功能障碍、</span>
                    <span v-if="infoData.radiation">放疗史、</span>
                    <span v-if="infoData.other">其它({{infoData.other_desc}})</span>
                </div>
                <span v-else>无</span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span class="title">个体化用药相关基因检测：</span>
                <div style="display: inline-block;" v-if="infoData.ugt1a1_28 || infoData.ugt1a1_6">
                    <span v-if="infoData.ugt1a1_28">
                        <template v-if="infoData.ugt1a1_28_type == 0">UGT1A1*28*1*1</template>
                        <template v-else-if="infoData.ugt1a1_28_type == 1">UGT1A1*28*1*28</template>
                        <template v-else>UGT1A1*28*28*28</template> &nbsp;
                    </span>
                    <span v-if="infoData.ugt1a1_6">
                        <template v-if="infoData.ugt1a1_6_type == 0">UGT1A1*6*1*1</template>
                        <template v-else-if="infoData.ugt1a1_6_type == 1">UGT1A1*6*1*6</template>
                        <template v-else>UGT1A1*6*6*6</template>
                    </span>
                </div>
                <span v-else>无</span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span class="title">β-葡萄糖醛酸酶活性检测：</span>
                <span v-if="infoData.glucuronidase_undo">未做</span>
                <div style="display: inline-block;" v-else>
                    <span v-if="infoData.glucuronidase_blood">血清(浓度{{infoData.glucuronidase_blood_concentration}}) &nbsp;</span>
                    <span v-if="infoData.glucuronidase_shit">粪便(浓度{{infoData.glucuronidase_shit_concentration}})</span>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: "Baseinfo",
    props: {
        infoData: {
            type: Object,
            default: null
        }
    }
}
</script>
<style scoped>
    .b-content {
        padding: 10px 5px;
    }
    .b-content span {
        line-height: 2;
    }
</style>