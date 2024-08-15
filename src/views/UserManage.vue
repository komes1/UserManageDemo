<template>
    <div>
        <el-input
                placeholder="输入工号或者名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchContent"
                style="width: 20%">
        </el-input>
      <el-radio-group v-model="enableOptions">
          <el-radio-button v-for="option in enableFilterOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio-button>
      </el-radio-group>
<!--        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>-->
<!--        <el-button type="primary" icon="el-icon-back" @click="returnHome">返回</el-button>-->
        <br>
        <el-table :data="tableData.filter(data=>!searchContent|| data.name.toLowerCase().includes(searchContent.toLowerCase())|| data.id.toLowerCase().includes(searchContent.toLowerCase()))">
            <el-table-column prop="id" label="职工代码" width="140">
            </el-table-column>
            <el-table-column prop="name" label="职工姓名" width="120">
            </el-table-column>
            <el-table-column prop="ksmc" label="科室名称" width="140">
            </el-table-column>
<!--          <el-table-column prop="jlzt" label="启用状态" width="100" >-->
<!--          </el-table-column>-->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
<!--                    <el-button type="primary" size="mini" @click="deleteById(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <br>
<!--        <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :page-size="pageSize"-->
<!--                :total="total"-->
<!--                @current-change="change">-->
<!--        </el-pagination>-->
    </div>
</template>

<script>
    export default {
        methods:{
            returnHome(){
                const _this = this;
              /*  _this.$router.push({
                    path: '/'
                })*/
                window.location.reload();
            },
            search(){
                var _this = this;
                // alert(_this.searchContent)
                if(_this.searchContent.length==0||_this.searchContent===''){
                    _this.$message.warning("请输入查询内容")
                }else{
                    axios.get("http://localhost:8082/books/search?keyword="+_this.searchContent).then(function (resp) {
                        console.log(resp)
                        _this.tableData = resp.data;
                        _this.total = resp.data.length;
                    })
                }
            },
            change(currentPage){
                // console.log(currentPage)
                var _this = this;
                axios.get("http://localhost:8082/books/findAll/"+(currentPage-1)+"/6").then(function (resp) {
                    console.log(resp)
                    _this.tableData = resp.data.content;
                    _this.total  = resp.data.totalElements;
                })
            },
            edit(row){
              this.$store.commit('setSelectedRow',row);
                this.$router.push({
                    path: '/update',
                    query:{
                        id: row.id
                    }
                });

            },
            deleteById(row){
                const _this = this;
                _this.$confirm('确认删除吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("http://localhost:8082/books/delete/"+row.id).then(function (resp) {
                        _this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        clearTimeout(_this.timer);
                        _this.timer = setTimeout(()=>{
                            window.location.reload();
                        },1000)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
          filterData(){
            if (this.enableOptions !== -1) {
              this.tableData=this.allUserData.filter(item => item.jlzt === this.enableOptions);
            }
            else
            {
              this.tableData=this.allUserData;
            }
          }
        },
        data(){
            return {
                searchContent: '',
                pageSize: 6,
                total: 10,
              allUserData: [],
                tableData:[],
              enableFilterOptions:[{value:-1,label:'全部'},{value:1,label: '启用'},{value:0,label: '未启用'}],
              enableOptions:-1

            }
        },
        created(){
            var _this = this;
            axios.get("http://localhost:8183/api/GetAllUserInfos").then(function (resp) {
                // console.log(resp)
                _this.tableData = resp.data;
                _this.allUserData=resp.data;
                // _this.total = resp.data.totalElements;
            })
        },
      watch:{
          enableOptions(){
            this.filterData();
          }
      }
    }
</script>

<style scoped>

</style>