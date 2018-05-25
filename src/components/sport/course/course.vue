<template>

    <div class="course">
        <div class="top">
            <!-- {{userPrower}} -->
            <el-button type="danger" @click="showModel('addCourse')">添加课程</el-button>
        </div>
        <hr>
        <div class="contents">
            <div class="courseList" v-for="(item,index) in courseList" :key="index">
                <CourseBox :course-list="item" @edit="editCourse" @resCourse="resCourse" />
            </div>
        </div>
        <!-- molde -->
        <div v-if="modelState==='addCourse'">
            <Model @cancel="hided" @confirm="addCourse">
                <span slot="head">
                    {{renderTitle}}
                </span>
                <div slot="content" class="courseContent">
                    <div class="addInput">
                        <span>课程名字</span>
                        <el-input type="text" placeholder="课程名字" v-model="courseEdit.name" />
                    </div>
                    <div class="addInput">
                        <span>教练名字</span>
                        <el-autocomplete style="width:440px" v-model="courseEdit.coach.name" :fetch-suggestions="findCoachSelect" placeholder="请输入内容" @select="handleCoachSelect"></el-autocomplete>
                    </div>
                    <!-- <div class="addInput">
                        <span>上课地点</span>
                        <el-input type="text" v-model="courseEdit.adress" />
                    </div> -->
                    <div class="addInput">
                        <span>最大预约人数：</span>
                        <el-input type="text" v-model="courseEdit.maxNum" />
                    </div>
                    <div class="addInput">
                        <span>开课时间</span>
                        <el-date-picker v-model="courseEdit.startTime" type="datetime" placeholder="选择开始时间" value-format="timestamp">
                        </el-date-picker>
                        <el-date-picker v-model="courseEdit.endTime" type="datetime" placeholder="选择结束时间" value-format="timestamp">
                        </el-date-picker>
                    </div>
                    <div class="addInput">
                        <span>课程介绍</span>
                        <el-input type="textarea" v-model="courseEdit.message" />
                    </div>
                </div>
            </Model>
        </div>
    </div>

</template>

<script>
import { sportMethod, dataMethod } from "../../../service/index";
import { mapGetters, mapMutations, mapState } from "vuex";
import CourseBox from "../../../common/courseBox/courseBox";
import Model from "../../../common/model/model";
import elementsVue from "../elements/elements.vue";
export default {
    name: "home",
    data() {
        return {
            courseEdit: {},
            modelState: null,
            coachId: null,
            courseList: [],
            modelStatus: "add"
        };
    },
    created() {
        this.getCourse();
    },
    mounted() {},
    computed: {
        minTime() {
            return this.courseEdit.startTime || undefined;
        },
        renderTitle() {
            let ele = null;
            switch (this.modelStatus) {
                case "add":
                    ele = "添加课程";
                    break;
                case "edit":
                    ele = "编辑课程";
            }
            return ele;
        },
        ...mapState(["userInfo"])
    },
    methods: {
        showModel(value, list) {
            this.modelState = value;
            if (list) {
                this.courseEdit = list;
            } else {
                this.courseEdit = {
                    coach: {
                        name: undefined
                    }
                };
            }
        },
        //编辑课程
        editCourse(list) {
            if (list) {
                this.modelStatus = "edit";
                this.showModel("addCourse", list);
            }
        },
        //预约课程
        resCourseList(id) {
            const userId = dataMethod.getLocalData("user")[0]._id;
            const data = {
                _id: id,
                userId
            };
            sportMethod
                .resCourseList(data)
                .then(result => {
                    this.$message.success(result.message);
                     this.getCourse();
                    this.hided();
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        //预约课程提示
        resCourse(id) {
            this.$confirm("请确定是否预约?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
            }).then(() => {
                this.resCourseList(id);
            });
        },
        //隐藏model
        hided() {
            this.modelState = " ";
        },
        //添加课程
        addCourse() {
            const { courseEdit } = this;
            const data = {
                ...courseEdit,
                coach: this.coachId
            };
            if(!courseEdit.name&&!courseEdit.coach.name&&!courseEdit.adress&&!courseEdit.maxNum&&!courseEdit.startTime&&!courseEdit.endTime&&!courseEdit.message){
                this.$message.error("请检查输入 不可为空！");
                return false;
            }
            switch (this.modelStatus) {
                case "add":
                    sportMethod
                        .addCourse(data)
                        .then(result => {
                            this.$message.success("添加成功");
                            this.getCourse();
                            this.hided();
                        })
                        .catch(err => {
                            this.$message.error(err);
                            this.hided();
                        });
                    break;
                case "edit":
                    sportMethod
                        .editCourse(data)
                        .then(result => {
                            this.$message.success("修改成功");
                            this.getCourse();
                            this.hided();
                        })
                        .catch(err => {
                            this.$message.error(err);
                            this.hided();
                        });
                    break;
            }
        },
        //获取教练列表
        getCoach(findValue = {}) {
            return new Promise((resolve, reject) => {
                sportMethod
                    .getCoachSever(findValue)
                    .then(result => {
                        if(result.data){
                          const detail = this.coachDetail(result.data);
                         resolve(detail);  
                        }
                        
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            });
        },
        //动态查找教练
        findCoachSelect(query, cb) {
            let findqQuery = {};
            if (query) {
                findqQuery = {
                    name: query
                };
            }
            this.getCoach(findqQuery)
                .then(result => {
                    cb(result);
                })
                .catch(err => {});
        },
        handleCoachSelect(value) {
            this.coachId = value._id;
        },
        coachDetail(valueCoach) {
            let coachDetail = [];
            if (Array.isArray(valueCoach) && valueCoach.length > 0) {
                valueCoach.forEach(value => {
                    const list = {
                        value: value.name,
                        _id: value._id
                    };
                    coachDetail.push(list);
                });
            }
            return coachDetail;
        },
        //获取课程信息
        getCourse() {
            sportMethod
                .getCourse()
                .then(result => {
                    this.courseList = result.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        ...mapGetters(["get_user_info"])
    },
    components: {
        Model,
        CourseBox
    },
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './course.styl';
</style>
