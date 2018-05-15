<template>
    <div>
        <!-- 开设课程 -->
        <div class="openCourse">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span class="course">{{$t("message.startClass.openCourses")}}</span>
                    <hr>
                    <p>{{$t("message.startClass.top1")}}
                        <span style="color:red">{{gradeLange}}</span>
                    </p>
                    <p>{{$t("message.startClass.top2")}}{{$t("message.startClass.top3")}}
                        <span style="color:red">{{gradeLange}}</span>
                        {{$t("message.startClass.top4")}}
                    </p>
                </div>
                <div>
                    <div class="writeInfo">
                        <span class="input">
                            <div class="font">{{$t("message.startClass.coueseName")}}：</div>
                            <el-input type="text" v-model="courseData.name" placeholder="name" />
                        </span>
                        <span class="input">
                            <div class="font">{{$t("message.startClass.CourseDuration")}}：</div>
                            <el-input type="text" disabled value="30minute" placeholder="CourseDuration" />
                        </span>
                        <span class="input">
                            <div class="font">{{$t("message.startClass.CourseGrade")}}：</div>
                            <el-select v-model="courseData.grade" placeholder="grade">
                                <el-option v-for="item in grade" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </span>
                        <span class="input">
                            <div class="font">{{$t("message.startClass.StartTime")}}：</div>
                            <el-date-picker v-model="courseData.date" type="datetime" placeholder="time" value-format="timestamp" :picker-options="disabledTime">
                            </el-date-picker>
                        </span>
                        <el-button type="primary" @click="addList">{{$t("message.determine")}}</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <!--开课记录-->
        <div class="table">
            <div class="course">{{$t("message.startClass.CourseRecord")}}</div>
            <br>
            <hr>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column :label="$t('message.table.date')" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.date|dateFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.table.courseName')" width="180" prop="name">
                </el-table-column>
                <el-table-column :label="$t('message.table.teacher')" width="180">
                    <template slot-scope="scope">
                        <span @click="JumpPersonalInfo(scope.row.teacherId)">{{scope.row.teacherId.name}}&nbsp;</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.table.students')">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.studentsId" :key="index">{{item.name}}&nbsp;</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.table.CourseDuration')" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.timeLong}}minute</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.table.Evaluation')">
                    <template slot-scope="scope">
                        <span>{{scope.row.evaluate|scoreStatusEnglish}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { requestMethod, dataMethod } from "../../../service/index";
import { StatusCode } from "../../../public/message/index";
import { mapState } from "vuex";

export default {
    name: "openCourse",
    data() {
        return {
            tableData: [],
            courseData: {},
            grade: [],
            disabledTime: {
                disabledDate(time) {
                    return time.getTime() + 3600 * 1000 * 24 < Date.now();
                }
            }
        };
    },
    created() {
        this.getCourseList();
    },
    mounted() {
        this.gradelimit();
    },
    computed: {
        gradeLange() {
            const num = this.teacher.grade;
            if (num === 0) {
                return this.$t("message.garde.primary");
            } else if (num === 1) {
                return this.$t("message.garde.middleLevel");
            } else if (num === 2) {
                return this.$t("message.garde.advanced");
            } else if (num === 3) {
                return this.$t("message.garde.middleLevel");
            }
        },
        ...mapState(["lange"])
    },
    methods: {
        // 获得课程列表
        getCourseList() {
            const teacherId = this.teacher._id;
            const data = { teacherId };
            requestMethod
                .getCourseList(data)
                .then(res => {
                    if (res.data) {
                        this.tableData = res.data;
                    }
                })
                .catch(res => {
                    this.$message(res);
                });
        },
        addList() {
            const { courseData, teacher } = this;
            const data = {
                teacherId: teacher._id,
                date: courseData.date,
                name: courseData.name,
                grade: courseData.grade
            };
            if (!courseData.date || !courseData.name) {
                if (localStorage.getItem("language") === "en") {
                    this.$message.error(
                        "Please check the input, can not be empty"
                    );
                    return false;
                }
                this.$message.error("请检查输入，不可为空");
                return;
            }
            requestMethod
                .addCourse(data)
                .then(res => {
                    if (localStorage.getItem("language") === "en") {
                        this.$message.success("success");
                    } else {
                        this.$message.success(res.message);
                    }
                    this.getCourseList();
                })
                .catch(err => {
                    if (localStorage.getItem("language") === "en") {
                        this.$message.error(
                            "Only one class per person per day"
                        );
                        return false;
                    }
                    this.$message.error(err);
                });
        },
        gradelimit() {
            const gradeNum = this.teacher.grade;
            // const langue=localStorage.getItem("language")
            const gradeLi = dataMethod.gradeDisabled(gradeNum, this.lange);
            this.grade = gradeLi;
        }
    },
    components: {},
    watch: {
        lange(value) {
            this.gradelimit();
        }
    }
};
</script>

<style lang="stylus" scoped>
@import './openCourse.styl';
</style>

