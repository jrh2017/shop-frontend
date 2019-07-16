<template>
    <div class="b-content">
        <Row>
            <Col span="6">
                <span>患者姓名: {{infoData.name}}</span>
            </Col>
            <Col span="6">
                <span>床号: {{infoData.bed_no}}</span>
            </Col>
            <Col span="6">
                <span>病历号/ID号: {{infoData.idcard}}</span>
            </Col>
            <Col span="6">
                <span>性别: {{infoData.sex == 1 ? '男' : '女'}}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span>年龄: {{infoData.age}}</span>
            </Col>
            <Col span="6">
                <span>身高: {{infoData.height}}cm</span>
            </Col>
            <Col span="6">
                <span>体重: {{infoData.weight}}kg</span>
            </Col>
            <Col span="6">
                <span>体表面积: {{infoData.body_area}}㎡</span>
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