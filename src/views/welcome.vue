<template>
  <div>
    <el-card class="welcome-card note mx-3">
      <div class="clearfix" slot="header">
        <span>30天内接口访问情况</span>
      </div>

      <el-col :span="24" class="echarts-item">
        <ve-line :data="chartData" :extend="extend" :settings="chartSettings"></ve-line>
      </el-col>
    </el-card>
    <el-card class="welcome-card m-3">
      <div class="clearfix" slot="header">
        <span>访问日志</span>
      </div>
      <el-table :data="logsData" border highlight-current-row style="width: 100%;font-size: 12px;" v-loading="isLogLoading">
        <el-table-column align="center" label="访问者" prop="operater" width="100px"></el-table-column>
        <el-table-column align="center" label="请求地址" prop="ipAddress" width="100px"></el-table-column>
        <el-table-column align="center" label="请求时间" prop="operateTime" width="135px"></el-table-column>
        <el-table-column header-align="center" label="访问接口" prop="url" width="250"></el-table-column>
        <el-table-column align="center" label="请求方式" prop="httpMethod" width="65"></el-table-column>
        <el-table-column align="center" label="耗时(毫秒)" prop="elapsedTime" width="65"></el-table-column>
        <el-table-column header-align="center" label="请求参数" prop="param" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" label="Agent" prop="agent" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column align="center" header-align="center" label="执行成功" prop="isEnabled" width="90">
          <template slot-scope="scope">
            <el-tag :type="scope.row.success?'success':'danger'" disable-transitions>{{scope.row.success ? "成功":"失败"}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-end align-items-center">
        <el-pagination
          :current-page.sync="logQueryParam.PageIndex"
          :page-size="logQueryParam.PageSize"
          :total="logsTotalCount"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
      <br />
    </el-card>

    <el-card class="mx-3">
      <div class="clearfix" slot="header">
        <span>相关配置</span>
      </div>
      <el-aside>1、动态添加一个vue页面：</el-aside>
      <br />
      <div class="text item">
        <i class="el-icon-edit"></i>、更多内容，查看博客园文档：
        <a
          href="https://www.cnblogs.com/laozhang-is-phi/p/10643993.html#autoid-2-6-0"
          target="_blank"
        >https://www.cnblogs.com/laozhang-is-phi/p/10643993.html#autoid-2-6-0</a>。
      </div>
      <br />
      <hr />
      <br />
      <el-aside>2、快速配置接口权限：</el-aside>
      <br />
      <div style="height: 300px;overflow-y: auto;">
        <el-steps direction="vertical">
          <el-step description="创建一个测试控制器 DemoController" title="步骤 1"></el-step>
          <el-step description="修改接口路由地址，带上 [action] ，比如，/api/[controller]/[action]，编译是否正常" title="步骤 2"></el-step>
          <el-step description="给需要加权限的路由api上，增加授权特性[[Authorize(Permissions.Name)]]" title="步骤 3"></el-step>
          <el-step description="测试 /api/demo/get 接口，是否已经被保护" title="步骤 4"></el-step>
          <el-step description="vueadmin 后台 配置权限：第一步：登录后台，新建api接口" title="步骤 5.1"></el-step>
          <el-step description="第二步：添加一个菜单，可以是一个查询按钮，也可以是一个路由页面" title="步骤 5.2"></el-step>
          <el-step description="第三步：权限分配！勾选角色和刚刚的菜单" title="步骤 5.3"></el-step>
          <el-step description="如果后端netcore资源服务器有缓存，记得清理" title="步骤 6"></el-step>
          <el-step description="重新登录Admin管理后台，访问接口，查看是否有权限" title="步骤 7"></el-step>
        </el-steps>
      </div>
    </el-card>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import homeApi from '../api/admin/home'
import * as signalR from '@aspnet/signalr'
export default {

  name: 'Welcome',
  components: { VeLine },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      listLoading: false,
      welcomeInitData: {},
      logsData: [],
      isLogLoading: false,
      logsTotalCount: 0,
      logQueryParam: {
        pageIndex: 1,
        pageSize: 5,
        sortKey: '',
        sortType: 0,
        isWelCome: true
      },
      serverInfo: {},
      extend: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      chartData: {
        columns: [],
        rows: [],
        today: 0
      },
      // chartData: {
      //   columns: ['日期', '访问用户', '下单用户', '下单率'],
      //   rows: [
      //     { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      //     { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      //     { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      //     { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      //     { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      //     { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
      //   ]
      // },
      chartSettings: {
        metrics: ['count'],
        dimension: ['name'],
        legendName: { 'count': '访问次数' }
      },
      connection: ''
    }
  },
  methods: {
    getBck(index) {
      return `background: rgb(${43 + index * 20}, ${148 +
        index * 10}, 255) none repeat scroll 0% 0%;`
    },
    handleCurrentChange(val) {
      this.logQueryParam.PageIndex = val
      this.getLogsList()
    },
    handleSizeChange(val) {
      this.logQueryParam.PageSize = val
      this.getLogsList()
    },
    getLogsList() {
      var that = this
      homeApi.getLogsPage(that.logQueryParam)
        .then((res) => {
          that.logsTotalCount = res.data.totalCount
          that.logsData = res.data.items
        })
    },
    getLineData() {
      homeApi.getLineData()
        .then(res => {
          this.chartData = res.data
        })
    },
    buildConnection() {
      var that = this
      // 1、首先我们实例化一个连接器
      this.connection = new signalR.HubConnectionBuilder()
        // 然后配置通道路由
        .withUrl(`${that.baseUrl}/api/chathub`, {
          accessTokenFactory: () => that.$store.getters.auth.access_token
        })
        // 日志信息
        .configureLogging(signalR.LogLevel.Information)
        // 创建
        .build()

      // 开始通讯，并成功呼叫服务器
      that.connection.start().then(() => {
        // that.connection.invoke('GetLatestCount', '2222').catch(function (err) {
        //   return console.error(err)
        // })

        // that.connection.invoke('SendMessage', this.$store.getters.user.userId, '哈哈哈哈').catch(function (err) {
        //   return console.error(err)
        // })
        console.log('连接成功')
      })

      that.connection.on('ReceiveUpdate', function (update) {
        console.info('update ReceiveUpdate success!', update)
        // that.tableData = update;//将返回的数据，实时的赋值给当前页面的 data 中；
      })

      that.connection.on('ReceiveMessage', function (update, message) {
        debugger
        console.info('update ReceiveMessage success!', update, message)
        // that.tableData = update;//将返回的数据，实时的赋值给当前页面的 data 中；
      })
    }
  },
  created() {
    this.getLogsList()
    this.getLineData()
    this.buildConnection()
  }
}
</script>

<style scoped>
.bg-blue-sub-item {
  max-width: 120px !important;
  height: 50px;
  float: left;
  color: #fff;
  font-size: 15px;
  line-height: 50px;
  padding: 0 10px;
}
.note .text {
  font-size: 14px;
}

.note .item {
  margin-bottom: 18px;
}
</style>

<style scoped>
.panel-group {
  margin-top: 18px;
}
.card-panel-col {
  margin-bottom: 32px;
  width: 115px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-right: 2%;
  float: right;
}

.card-panel {
  height: 108px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.card-panel .card-panel-icon-wrapper {
  color: #fff;
}

.card-panel .card-panel .icon-people {
  background: #40c9c6;
}

.card-panel .card-panel .icon-message {
  background: #36a3f7;
}

.card-panel .card-panel .icon-money {
  background: #f4516c;
}

.card-panel .card-panel .icon-shopping {
  background: #34bfa3;
}

.card-panel .icon-people {
  color: #40c9c6;
}

.card-panel .icon-message {
  color: #36a3f7;
}

.card-panel .icon-money {
  color: #f4516c;
}

.card-panel .icon-shopping {
  color: #34bfa3;
}

.card-panel .card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}

.card-panel .card-panel-icon {
  float: left;
  font-size: 48px;
}

.card-panel .card-panel-description {
  float: left;
  font-weight: bold;
  margin-left: 30px;
  margin-top: 20px;
}
.card-panel .card-panel-description .card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.card-panel .card-panel-description .card-panel-num {
  font-size: 36px;
  color: #f4516c;
}
.extoday {
  cursor: pointer;
}
.card-acuser-num {
  font-size: 36px;
  color: #40c9c6;
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
  .card-panel-icon-wrapper .svg-icon {
    display: block;
    margin: 14px auto !important;
    float: none !important;
  }
}
</style>