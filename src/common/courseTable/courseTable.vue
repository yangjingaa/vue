<template>
    <div class="tableBox">
        <el-table :data="tableList" style="width: 100%">
            <el-table-column label="课程名字" prop="name" width="180">
            </el-table-column>
            <el-table-column label="上课地点" prop="adress" width="180"></el-table-column>
            <el-table-column label="教练" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.coach.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.startTime|dateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="结束时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.endTime|dateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="最大人数" prop="maxNum" width="180"></el-table-column>
            <el-table-column label="课程简介" prop="message"></el-table-column>
            <el-table-column label="课程状态">
                <template slot-scope="scope">
                    <span :style="courseStatus(scope.row).color">{{courseStatus(scope.row).value}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { sportMethod, dataMethod } from "../../service/index";
import { mapMutations } from "vuex";

export default {
    name: "course-table",
    props: {
        userId: String
    },
    data() {
        return {
            tableList: [],
            couseState: {}
        };
    },
    created() {
        this.getCourseList();
    },
    mounted() {},
    computed: {
       
    },
    methods: {
        getCourseList() {
            if (this.userId) {
                const data = {
                    userId: this.userId
                };
                sportMethod
                    .getCourse(data)
                    .then(result => {
                        this.tableList = result.data;
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
        },
         courseStatus(row) {
            const newDateSti = new Date().getTime();
            const endTime=row.endTime;
            const startTime=row.startTime;
            let result={};
            if (newDateSti > endTime) {
               result={
                    value:"已结束",
                    color:{color:"#3e1b13"}
                }
            } else if (newDateSti < startTime) {
                result={
                    value:"未开始",
                    color:{color:"#e62626"}
                }
            } else {
               result={
                    value:"正进行",
                    color:{color:"#07f710"}
                }
            }
            return result;
        }
    },
    components: {},
    watch: {}
};
</script>

<style lang="stylus" scoped>
@import './courseTable.styl';
</style>
