var api_params = 
{
	ecmcGetBizBrandDetail:{
		params_in: ['bizId', 'brandId'],
		params_out: {
			field_name:"BizBrand",
			field_type: "Entity",
			field_data: {}
		}
	},
	ecmcGetBizBrandList:{
		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},

	ecmcGetBizCategoryProductParentList: {
 		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
 	
	ecmcGetBizCategoryProductChildrenList: {
 		params_in: ['bizId','parentCategoryId', 'viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
 	
	ecmcGetBizCategoryProductList: {
 		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityListArray",
			field_key: "categoryId",
			field_parent: "parentCategoryId",
			field_data:{}
		}
	},
 	ecmcGetBizProductList: {
 		params_in: ['bizId','viewSize','viewIndex','brandId','productId','productSku','productName'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
 	},
 	ecmcGetBizHubList: {
 		params_in: ['bizId', 'viewSize', 'viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
 	},
	ecmcGetBizArticleList: {
		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetBizTopProductList: {
 		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetBizLinkUrlList: {
 		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	}
};
