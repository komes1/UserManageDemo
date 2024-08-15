<template>
    <el-form :model="selectedRow" :rules="rules" ref="selectedRow"  class="demo-selectedRow" :inline="true"  label-width="80px"  style="width:80%">
        <el-form-item label="编码:" prop="id">
            <el-input v-model="selectedRow.id" readonly ></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
            <el-input v-model="selectedRow.name"></el-input>
        </el-form-item>
      <el-form-item label="性别:" prop="sex" >
        <el-select v-model="selectedRow.sex" size="30px">
          <el-option label="男" :value=1></el-option>
          <el-option label="女" :value=2></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期:" prop="birthDate">
        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择日期" v-model="selectedRow.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="身份证:" prop="sfzh">
        <el-input v-model="selectedRow.sfzh" ></el-input>
      </el-form-item>
      <el-form-item label="科室:" prop="departmentId">
        <el-select v-model="selectedRow.ksdm" filterable placeholder="请选择">
          <el-option
              v-for="item in departmentInfosOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          <span style="float: left">{{ item.id }}</span>
          <span style="float: right">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="科室:" prop="departmentId" >-->
<!--        <el-select v-model="selectedRow.ksmc" aria-readonly="true">-->
<!--          <el-option-->
<!--             :label="selectedDepartmentName"-->
<!--             :value="selectedDepartmentName">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="启用状态:" prop="jlzt">
      <el-switch
          v-model="selectedRow.jlzt"
          active-text="启用" :active-value=1
          inactive-text="禁用" :inactive-value=0>
      </el-switch>
      </el-form-item>



        <el-form-item>
            <el-button type="primary" @click="submitForm('selectedRow')">更新</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
    import router from "@/router";

    export default {
      computed:{
        selectedRow(){
          return this.$store.state.selectedRow;
        }
      },
        data() {
            return {
              departmentInfosOptions:[],
              selectedOptions:'',
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                  sfzh: [
                    // { required: false, message: '请输入身份证', trigger: 'blur' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式不正确', trigger: 'blur' }
                  ]
                },
            };
        },
        methods: {
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8183/api/UpdateUserInfo",this.selectedRow).then(function (resp) {
                             console.log(resp)
                            if(resp.data.code=='200'){
                                _this.$alert('更新成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push("/manage")
                                    }
                                });
                            }else{
                                _this.$alert('更新失败')
                            }
                        })
                    } else {
                      _this.$alert('更新失败,请检查数据！')
                        return false;
                    }
                });
            },
          async fetchOptions() {
            try {
              const response = await axios.get('http://localhost:8183/api/GetAllDepartmentInfos');
              this.departmentInfosOptions = response.data;
            } catch (error) {
              console.error('科室选项集赋值失败:', error);
            }
          },
          goBack() {
            this.$router.go(-1);
          }
        },
        created() {
            var _this = this;
            this.fetchOptions();
            // axios.get("http://localhost:8183/api/GetAllDepartmentInfos/"+this.$route.query.id).then(function (resp) {
            //     // console.log(resp)
            //     _this.userForm = resp.data;
            // })
        },

    }
</script>