<template>
	<el-card class="box-card">
				<!-- 面包屑-->
		<my-bread level1="权限管理" level2="角色列表"></my-bread>
	<!--	添加角色按钮-->
	<el-button plain class="addbutton" @click="dialogFormVisible = true">添加角色</el-button>
			<!--表格-->
		<el-table :data="roles" style="width: 100%" height="500">
			<el-table-column type="expand">
			   <template slot-scope="scope">
                     <el-row v-for="(item,i) in scope.row.children" :key="i">
                     	<el-col :span="4"><el-tag closable @close="delright(scope.row,item.id)">{{item.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
                     	<el-col :span="20">
                     		<el-row v-for="(item2,i) in item.children" :key="i">
                     			<el-col :span="4"><el-tag type="success" closable @close="delright(scope.row,item2.id)">{{item2.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
                     			<el-col :span="20">
                     				<el-tag v-for="(item3,i) in item2.children" :key="i" type="danger" closable @close="delright(scope.row,item3.id)">{{item3.authName}}</el-tag>
                     			</el-col>
                     		</el-row>
                     	</el-col>
                     </el-row>
                     <span v-if="scope.row.children.length==0">未分配角色</span>
			   </template>
			</el-table-column>
			<el-table-column type="index" label="#" width="100">
			</el-table-column>
			<el-table-column prop="roleName" label="角色名称" width="200">
			</el-table-column>
			<el-table-column prop="roleDesc" label="角色描述" width="200">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini" ></el-button>
					<el-button type="danger" icon="el-icon-delete" circle :plain="true" size="mini" @click="delrole(scope.row.id)"></el-button>
					<el-button type="success" icon="el-icon-check" circle :plain="true" size="mini" @click="setright(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--修改权限-->
		<el-dialog title="修改权限" :visible.sync="rightFormVisible">
			<!--树状结构图-->
			<el-tree
  :data="treelist"
  show-checkbox
  node-key="id"
default-expand-all
:default-checked-keys="arrcheck"
  :props="defaultProps" ref="tree">
</el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="rightFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setroleright()">确 定</el-button>
  </div>
</el-dialog>
<!--添加角色-->
		<el-dialog title="添加角色" :visible.sync="dialogFormVisible">
           		<el-form :model="formData">
				<el-form-item label="角色名称" label-width="100px" prop="roleName">
					<el-input v-model="formData.roleName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" label-width="100px" prop="roleDesc">
					<el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addrole('formData')">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				roles:[],
				rightFormVisible:false,
				dialogFormVisible:false,
				treelist:[],
                   defaultProps: {
                         children: 'children',
                         label: 'authName'
                  },
                  arritem:[],
                  arrcheck:[],
                  currroleid:-1,
                  formData:{}
			}
		},
		created(){
			this.roleslist()
		},
		methods:{
//			添加角色
addrole(form){
	this.$http.post("roles",this.formData).then((res)=>{
		console.log(res)
		this.dialogFormVisible=false
		this.roleslist()
	})	
},
//			删除角色
delrole(roleid){
	this.$http.delete("roles/"+roleid).then((res)=>{
		const{meta:{msg,status}}=res.data
		if(status===200){
			 this.$message.success(msg)
			 this.roleslist()
		}
	})
},
//			修改权限--发送请求
setroleright(){
	let arr1=this.$refs.tree.getCheckedKeys()
	let arr2=this.$refs.tree.getHalfCheckedKeys()
	let totalarr=[...arr1,...arr2]
	this.$http.post("roles/"+this.currroleid+"/rights",{rids:totalarr.join(",")}).then((res)=>{
			this.rightFormVisible=false
			this.roleslist()
	})
},
//			修改权限
setright(roles){
	this.currroleid=roles.id
	this.$http.get("rights/tree").then((res)=>{
		this.treelist=res.data.data
	})
//	var arritem1=[]
//	this.treelist.forEach(item=>{
//		arritem1.push(item.id)
//		item.children.forEach(item1=>{
//			arritem1.push(item1.id)
//			item1.children.forEach(item2=>{
//				arritem1.push(item2.id)
//			})
//		})
//	})
//  this. arritem=arritem1
	var arritem2=[]
	roles.children.forEach(item=>{
//		arritem2.push(item.id)
		item.children.forEach(item1=>{
//			arritem2.push(item1.id)
			item1.children.forEach(item2=>{
				arritem2.push(item2.id)
			})
		})
	})
    this. arrcheck=arritem2
	this.rightFormVisible=true
},
//			取消权限
			delright(role,rightId){
				this.$http.delete("roles/"+role.id+"/rights/"+rightId).then((res)=>{
					const{meta:{msg,status}}=res.data
					if(status===200){
						 this.$message.success(msg)
						 role.children=res.data.data
//						 this.roleslist()
					}
				})
			},
			roleslist(){
				this.$http.get("roles").then((res)=>{
					this.roles=res.data.data
				})
			}
		}
	}
</script>

<style>
	.addbutton{
		margin-top:10px;
		margin-bottom:20px;
	}
</style>