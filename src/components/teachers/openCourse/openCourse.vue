<template>
    <div>
        <!-- 开设课程 -->
        <div class="openCourse">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span class="course">开设课程</span>
                </div>
                <div>
                    <div class="writeInfo">
                        <span class="input">
                            <div class="font">课程名字：</div>
                            <el-input type="text" v-model="courseData.name" placeholder="课程名字" />
                        </span>
                        <span class="input">
                            <div class="font">课程时长：</div>
                            <el-input type="text" disabled value="30分钟" placeholder="课程时长" />
                        </span>
                        <span class="input">
                            <div class="font">课程等级：</div>
                            <el-select v-model="courseData.grade" placeholder="课程等级">
                                <el-option v-for="item in grade" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </span>
                        <span class="input">
                            <div class="font">开始时间：</div>
                            <el-date-picker v-model="courseData.date" type="datetime" 
                            placeholder="请选择时间" value-format="timestamp"
                            :picker-options="disabledTime"
                            >
                            </el-date-picker>
                        </span>
                         <el-button type="primary">确认开课</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <!--开课记录-->
        <div class="table">
            <div class="course">开课记录</div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="时间" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.date|dateFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="老师" width="180">
                    <template slot-scope="scope">
                        <span @click="JumpPersonalInfo(scope.row.teacherId)">{{scope.row.teacherId.name}}&nbsp;</span>
                    </template>
                </el-table-column>
                <el-table-column label="学生">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.studentsId" :key="index">{{item.name}}&nbsp;</span>
                    </template>
                </el-table-column>
                <el-table-column prop="timeLong" label="时长" width="180"></el-table-column>
                <el-table-column label="评价">
                    <template slot-scope="scope">
                        <span>{{scope.row.evaluate|scoreStatus}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { requestMethod, dataMethod } from "../../../service/index";
import { StatusCode } from "../../../public/message/index";

export default {
    name: "openCourse",
    data() {
        return {
            tableData: [],
            courseData: {},
            grade: StatusCode.GRADE,
            disabledTime:{
                disabledDate(time) {
                return time.getTime()+3600 * 1000 * 24 < Date.now() ;
            },
            }
        };
    },
    created() {
        this.getCourseList();
    },
    mounted() {},
    computed: {
        
    },
    methods: {
        // 获得课程列表
        getCourseList() {
            const teacherId = this.teacher._id;
            const data = { teacherId };
            requestMethod
                .getCourseList(data)
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(res => {
                    this.$message(res);
                });
        },
        addList() {
            const {tableData,teacher } = this;
            const data = {
                teacherId:teacher._id,
                date:tableData.date,
                name:tableData.name,
                grade:tableData.grade,
            };
            requestMethod.addCourse(data).then(res => {
                this.searchData = {};
                this.screenTable();
            });
        },
    },
    components: {},
    watch: {},
}
</script>

<style lang="stylus" scoped>
@import './openCourse.styl';
</style>

