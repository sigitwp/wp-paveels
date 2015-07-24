var api_params =
{
	ecmcGetBizArticleList: {
		params_in: ['bizId','viewSize','viewIndex'],
		params_out: {
			field_name: "entityList",
			field_type: "EntityList",
			field_data: {}
		}
	},
	ecmcGetBizProdCatalogItemList: {
		params_in: ['bizId','bizCatalogId','viewSize','viewIndex'],
		params_out: {
			field_name: "entityList",
			field_type: "EntityList",
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
	ecmcGetBizLinkUrlList: {
		params_in: ['bizId','viewSize','viewIndex'],
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
	ecmcGetBizBrandDetail:{
		params_in: ['bizId', 'brandId'],
		params_out: {
			field_name:"BizBrand",
			field_type: "Entity",
			field_data: {}
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
	ecmcGetBizProductList: {
		params_in: ['bizId','viewSize','viewIndex','brandId','productId','productSku','productName'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetBizProductDetail: {
		params_in: ['bizProductId'],
		params_out: {
			field_name:"BizProduct",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetBizProductRelatedList: {
		params_in: ['bizId','bizProductId','viewSize','viewIndex'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetShoppingCart: {
		params_in: ['bizId'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcGetWishList: {
		params_in: ['bizId'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcPutItemToShoppingCart: {
		params_in: ['bizId','bizProductId'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	},
	ecmcCheckOutShoppingCart: {
		params_in: ['bizId','bizProductId'],
		params_out: {
			field_name:"entityList",
			field_type: "EntityList",
			field_data:{}
		}
	}

};
