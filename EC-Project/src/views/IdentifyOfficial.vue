<script src="../network/request.js"></script>
<template>
  <div class="form">
    <p class="page-title bold">村官用户验证</p>
    <p class="line"></p>
    <div class="main-form">
      <div class="form-wrap">
        <p class="title">村官信息</p>
        <el-form :model="officialForm" status-icon :rules="rules" ref="officialForm" label-width="125px" class="formStyle">
          <el-form-item label="村庄名称" prop="villageName">
            <locationInput v-model="officialForm.villageName"></locationInput>
          </el-form-item>
          <el-form-item label="真实姓名" prop="villagerName">
            <el-input v-model="officialForm.villagerName" style="width: 430px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="officialForm.villagerSex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="officialForm.villagerNation" placeholder="请选择民族">
              <el-option v-for="(item, index) in allNations" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯" placeholder="请选择籍贯">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="村官资格证明" ref="uploadElement" prop="certificationUrl">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :show-file-list="false"
              :action="uploadAction"
              :before-upload="beforeUpload"
              :on-change="handleUploadChange"
              :on-progress="handleProgress"
              :auto-upload="false"
              :data="officialForm">
              <img v-if="officialForm.certificateUrl" :src="officialForm.certificateUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="officialForm.villagerPoliticalStatus" placeholder="请选择政治面貌">
              <el-option label="中共党员" value="中共党员"></el-option>
              <el-option label="预备党员" value="预备党员"></el-option>
              <el-option label="共青团员" value="共青团员"></el-option>
              <el-option label="群众" value="群众"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="officialForm.villagerBirthday"></el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号" prop="villagerIDNumber">
            <el-input v-model="officialForm.villagerIDNumber" style="width: 430px"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="villagerPhone" autocomplete="off">
            <el-input v-model="officialForm.villagerPhone" style="width: 430px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="villagerEmail">
            <el-input v-model="officialForm.villagerEmail" style="width: 430px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('officialForm')">提交</el-button>
            <el-button @click="resetForm('officialForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="line" style="margin: 39px 0 40px 0;"></p>
    </div>
  </div>
</template>

<script>
import locationInput from "../components/LocationInput"
import {provinceAndCityData, CodeToText} from 'element-china-area-data'
import axios from 'axios'
export default {
  components: {
    locationInput
  },
  data() {
    //自定义身份证号码，手机和邮箱验证
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkPhone = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    var checkIDNumber = (rule, value, callback) => {
      const IDCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (IDCardReg.test(value)) {
        return callback();
      }
      callback(new Error('身份证号格式不正确'))
    }
    return {
      //uploadAction: 图片上传的后端地址
      uploadAction: "/index/upload",
      options: provinceAndCityData,
      selectedOptions: [],
      allNations: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
        "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族",
        "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族",
        "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
      officialForm: {
        //用户名
        officialUsername: '',
        //所属村庄名
        villageName: '',
        //姓名
        officialName: '',
        //性别
        officialSex: '',
        //民族
        officialNation: '',
        //籍贯
        officialOrigin: '',
        //村官资格证明图片
        certificateUrl: '',
        //政治面貌
        officialPoliticalStatus: '',
        //生日
        officialBirthday: '',
        //手机
        officialPhone: '',
        //邮箱
        officialEmail: '',
        //身份证号
        officialIDNumber: ''
      },
      rules: {
        certificateUrl: [
          {required: true, message: '请上传图片', trigger: 'blur'}
        ],
        villageName: [
          {required: true, message: '请输入村庄名', trigger: 'blur'},
        ],
        officialName: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'},
          {min:2, max: 10, message: '真实姓名在2到10个字符之间'}
        ],
        officialPhone: [
          {required: false, message: '请输入手机号', trigger: "blur"},
          {validator: checkPhone, trigger: "blur"},
        ],
        officialEmail: [
          {required: false, message: '请输入邮箱', trigger: "blur"},
          {validator: checkEmail, trigger: "blur"},
        ],
        officialIDNumber: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {validator: checkIDNumber, trigger: "blur"},
        ]
      }
    }
  },
  created() {
    //获取用户名
    this.officialForm.officialUsername = this.$route.params.username;
    // alert(this.officialForm.officialUsername)
  },
  methods: {
    //籍贯
    handleChange () {
      this.officialForm.officialOrigin = CodeToText[this.selectedOptions[0]] + CodeToText[this.selectedOptions[1]]
    },
    //图片上传之前
    beforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      return isImage
    },
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleUploadChange(file, fileList) {
      this.officialForm.certificateUrl = URL.createObjectURL(file.raw);
    },
    //上传图片过程中
    handleProgress(event, file, fileList) {
      this.loading = true;  //  上传时执行loading事件
    },
    //提交表单
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          axios.post(url, data).then(
              res=>{
                if(res.data.code == "200")
                {
                  //上传图片及表格数据至服务器
                  this.$refs.upload.submit();
                }
              }).catch(err=>alert(err))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.officialForm.certificateUrl = ''
    },

  }
}
</script>
<style lang="scss">
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
}
.form {
  padding: 0 40px 20px 40px;
  font-size: 14px;
  min-height: 1000px;

  .page-title {
    font-size: 24px;
    height: 60px;
    line-height: 67px;
  }

  .bold {
    font-weight: bold;
  }

  .line {
    height: 1px;
    border: 1px dashed #e2e7ea;
    border-bottom: 1px dashed #c8d2d7;
    width: 100%;
  }

  .main-form {
    width: 100%;
    height: 1150px;
    //background-color: #00d1b2;
    .form-wrap {
      padding-left: 250px;
      height: 1124px;
      //background-color: white;
      .title {
        padding: 20px 0;
        font-size: 20px;
        line-height: 14px;
      }

      .formStyle .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 18px;
        color: #606266;
        line-height: 41px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }

      .formStyle .el-input__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: 16px;
        height: 41px;
        line-height: 41px;
        outline: 0;
        padding: 0 32px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
      }

      .formStyle .el-form-item {
        margin-bottom: 38px;
      }

      .formStyle .el-form-item__error {
        color: #F56C6C;
        font-size: 15px;
        line-height: 1;
        padding-top: 13px;
        position: absolute;
        top: 100%;
        left: 32px;
      }
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

