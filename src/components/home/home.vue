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
					<el-submenu :index="item.order.toString()" v-for="(item,i) in menu" :key="i">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item :index="item1.path" v-for="(item1,i) in item.children" :key="i">
							<i class="el-icon-menu"></i>
							<span>{{item1.authName}}</span>
						</el-menu-item>
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
		data(){
			return{
				menu:[]
			}
		},
//		beforeCreate() {
//			const token = localStorage.getItem("token")
//			console.log(token)
//			if(!token) {
//				this.$router.push({
//					name: "login"
//				})
//				this.$message.warning("请先登录");
//			}
//		},
		created(){
			this.getmenus()
		},
		methods: {
//			获取菜单
          getmenus(){
          	this.$http.get("menus").then((res)=>{
          		this.menu=res.data.data
          	})
          },
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