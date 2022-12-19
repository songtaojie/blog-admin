<template>
	<div class="blog-container">
		<el-card :body-style="{ paddingBottom: '0' }" shadow="hover">
			<el-form :inline="true" :model="queryParams" ref="queryForm">
				<el-form-item label="开始时间" prop="name">
					<el-date-picker :shortcuts="shortcuts" placeholder="开始时间" type="datetime" v-model="queryParams.startTime" />
				</el-form-item>
				<el-form-item label="结束时间" prop="code">
					<el-date-picker :shortcuts="shortcuts" placeholder="结束时间" type="datetime" v-model="queryParams.endTime" />
				</el-form-item>
				<el-form-item>
					<el-button @click="resetQuery" icon="ele-Refresh">重置</el-button>
					<el-button @click="handleQuery" icon="ele-Search" type="primary" v-auth="'blodManage:page'">查询</el-button>
					<!-- <el-button icon="ele-Plus" @click="openAddConfig" v-auth="'blodManage:add'"> 新增 </el-button> -->
					<!-- <el-button icon="ele-DeleteFilled" type="danger" @click="clearLog" v-auth="'sysVislog:clear'"> 清空 </el-button> -->
				</el-form-item>
			</el-form>
		</el-card>

		<el-card shadow="hover" style="margin-top: 8px">
			<el-table :data="logData" border style="width: 100%" v-loading="loading">
				<el-table-column align="center" label="序号" type="index" width="55" />
				<el-table-column header-align="center" label="标题" prop="title"></el-table-column>
				<el-table-column align="center" label="浏览量" prop="readCount" width="70"></el-table-column>
				<el-table-column align="center" label="评论数" prop="cmtCount" width="70"></el-table-column>
				<el-table-column align="center" label="是否置顶" prop="isTop" width="100">
					<template #default="scope">
						<el-switch active-value="true" disabled inactive-value="false" v-model="scope.row.isTop"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="success" width="70">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status === 1">发布</el-tag>
						<el-tag type="danger" v-else>草稿</el-tag>
					</template>
				</el-table-column>
				<el-table-column header-align="center" label="发布时间" prop="publishDate" show-overflow-tooltip></el-table-column>
				<el-table-column header-align="center" label="创建时间" prop="createDate" show-overflow-tooltip></el-table-column>
				<el-table-column align="center" fixed="right" label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<!-- <el-button icon="ele-Edit" size="small" text type="primary" @click="openEditConfig(scope.row)" v-auth="'sysConfig:update'"> 编辑 </el-button> -->
						<el-button
							:disabled="scope.row.sysFlag == 1"
							@click="delBlog(scope.row)"
							icon="ele-Delete"
							size="small"
							text
							type="danger"
							v-auth="'blogManage:delete'"
						>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				:page-sizes="[10, 20, 50, 100]"
				:total="tableParams.total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
				background
				layout="total, sizes, prev, pager, next, jumper"
				small
				v-model:currentPage="tableParams.page"
				v-model:page-size="tableParams.pageSize"
			/>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

import { getAPI } from '/@/utils/axios-utils';
import { BlogApi } from '/@/api-services/_business/api';
import { HtBlog } from '/@/api-services/_business/models';

export default defineComponent({
	name: 'sysVisLog',
	components: {},
	setup() {
		const state = reactive({
			loading: false,
			queryParams: {
				startTime: undefined,
				endTime: undefined,
			},
			tableParams: {
				page: 1,
				pageSize: 10,
				total: 0 as any,
			},
			logData: [] as Array<HtBlog>,
		});
		onMounted(async () => {
			handleQuery();
		});
		// 查询操作
		const handleQuery = async () => {
			if (state.queryParams.startTime == null) state.queryParams.startTime = undefined;
			if (state.queryParams.endTime == null) state.queryParams.endTime = undefined;
			state.loading = true;
			var res = await getAPI(BlogApi).blogPageGet(state.queryParams.startTime, state.queryParams.endTime, state.tableParams.page, state.tableParams.pageSize);
			state.logData = res.data.result?.items ?? [];
			state.tableParams.total = res.data.result?.total;
			state.loading = false;
		};
		// 重置操作
		const resetQuery = () => {
			state.queryParams.startTime = undefined;
			state.queryParams.endTime = undefined;
			handleQuery();
		};
		// 清空日志
		// const clearLog = async () => {
		// 	state.loading = true;
		// 	await getAPI(BlogApi).sysLogVisClearPost();
		// 	state.loading = false;

		// 	ElMessage.success('清空成功');
		// 	handleQuery();
		// };
		// 删除
		const delBlog = (row: any) => {
			ElMessageBox.confirm(`确定删除博客：【${row.title}】?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					await getAPI(BlogApi).sysConfigDeletePost({ id: row.id });
					handleQuery();
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 改变页面容量
		const handleSizeChange = (val: number) => {
			state.tableParams.pageSize = val;
			handleQuery();
		};
		// 改变页码序号
		const handleCurrentChange = (val: number) => {
			state.tableParams.page = val;
			handleQuery();
		};
		const shortcuts = [
			{
				text: '今天',
				value: new Date(),
			},
			{
				text: '昨天',
				value: () => {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					return date;
				},
			},
			{
				text: '上周',
				value: () => {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					return date;
				},
			},
		];
		return {
			handleQuery,
			resetQuery,
			// clearLog,
			delBlog,
			shortcuts,
			handleSizeChange,
			handleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
