<template>
  <div>
    <div class="big">
      <div class="inner">
        <el-row>
          <el-col :span="12">
            <img src="../../assets/not_found.png" style="width: 350px;height: 300px">
          </el-col>
          <el-col :span="12">
            <p>Bạn không có đủ quyền để truy cập nội dung này!您的账号没有权限访问</p>
            <p style="font-size:18px;line-height:40px;">Liên hệ IT để giải quyết vấn đề này! 请联系IT部门</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style>
.big {
  width: 100%;
  height: calc(100vh - 55px);
  background-color: rgb(244, 244, 244);
  position: relative;
}

.inner {
  position: absolute;
  flex-direction: row;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.inner p {
  text-align: center;
  font-size: 24px;
}

.inner .leftPic {
  width: 60px;
  height: 60px;
  margin-left: 44%;
  margin-top: 20px;
}
</style>
