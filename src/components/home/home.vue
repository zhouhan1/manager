<template>
	<el-container class="container">
		<el-header class="header">
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<img src="../../assets/logo.png" alt="" />
					</div>
				</el-col>
				<el-col :span="19">
					<div class="grid-content bg-purple">
						<h2>电商后台管理系统</h2>
					</div>
				</el-col>
				<el-col :span="1">
					<div class="grid-content bg-purple">
						<a href="#" class="loginout" @click.prevent="tuichu()">退出</a>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class="aside" width="200px">
				<el-menu default-active="2" class="menu" :unique-opened="true" :router="true">
					<!-- 用户管理-->
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用戶管理</span>
						</template>
						<el-menu-item index="user">
							<i class="el-icon-menu"></i>
							<span>用戶列表</span>
						</el-menu-item>
					</el-submenu>
					<!-- 权限管理-->
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item>
							<i class="el-icon-menu"></i>
							<span> 角色列表</span>
						</el-menu-item>
						<el-menu-item>
							<i class="el-icon-menu"></i>
							<span> 權限列表</span>
						</el-menu-item>
						</el-submenu>
						<!-- 商品管理-->
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>商品管理</span>
							</template>
							<el-menu-item>
								<i class="el-icon-menu"></i> 商品列表
							</el-menu-item>
							<el-menu-item>
								<i class="el-icon-view"></i> 分類參數
							</el-menu-item>
							<el-menu-item>
								<i class="el-icon-view"></i> 商品分類
							</el-menu-item>
						</el-submenu>
						<!--订单管理-->
						<el-submenu index="4">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>訂單管理</span>
							</template>
							<el-menu-item>
								<i class="el-icon-location"></i> 訂單列表
							</el-menu-item>
						</el-submenu>
						<!--数据统计-->
						<el-submenu index="5">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>數據統計</span>
							</template>
							<el-menu-item>
								<i class="el-icon-location"></i> 數據報表
							</el-menu-item>
						</el-submenu>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		beforeCreate() {
			const token = localStorage.getItem("token")
			if(!token) {
				this.$router.push({
					name: "login"
				})
				this.$message.warning("请先登录");
			}
		},
		methods: {
			tuichu() {
				localStorage.clear()
				this.$router.push({
					name: "login"
				})
				this.$message.success('退出成功')
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
	}
	
	.header {
		background-color: #b3c0d1;
	}
	
	.header .middle {
		line-height: 60px;
		color: #fff;
		text-align: center;
	}
	
	.header .loginout {
		line-height: 60px;
		text-decoration: none;
	}
	
	.aside {
		background-color: #d3dce6;
	}
	  .aside .menu{
    height: 100%;
  }
	.main {
		background-color: #e9eef3;
		height: 100%;
	}
</style>