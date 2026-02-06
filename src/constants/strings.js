export const strings_eng = {
	search_products: 'Search products',
	sign_in: 'Sign in',
	sign_up: 'Sing up',
	departments: 'Departmentsss',
	hot_deals: 'Hot Deals',
	laptops: 'Laptops',
	cell_phones: 'Cell Phones',
	currency: 'Currency',
	best_sellers: 'Best Sellers',
	latest_products: 'Latest Products',
	featured_products: 'Featured Products',
	show_more: 'Show more',
	add_to_cart : 'Add to cart',
}

export const strings_arb = {
	search_products: 'ابحث عن منتج',
	sign_in: 'دخول',
	sign_up: 'تسجيل',
	departments: 'كل الاقسام',
	hot_deals: 'عروض مميزة',
	laptops: 'حاسبات',
	cell_phones: 'هواتف ذكية',
	currency: 'العملة',
	best_sellers: 'الاكثر مبيعاً',
	latest_products: 'احدث منتجات',
	featured_products: 'المنتجات المميزة',
	show_more: 'شاهد المزيد',
	add_to_cart : 'اضف الى السلة',
}

export const iraq_governorates_eng = {
	name: "Baghdad"
}

export const iraq_cities = [
	{
		id: 1, name: 'بغداد',
		districtsList: ["بغداد", "ابوغريب", "التاجي", "الحسينية", "المحمودية", "الطارمية", "المدائن", "الزوراء"],
		name_eng: 'Baghdad'
	},
	{
		id: 2, name: 'نينوى',
		districtsList: ["موصل", "تلعفر", "سنجار", "الحمدانية", "تلكيف", "الحضر"], name_eng: 'Nineveh'
	},
	{
		id: 3, name: 'بصرة',
		districtsList: ["بصرة", "الزبير", "ابي الخصيب", "القرنة", "الفاو", "شط العرب", "المدينة"],
		name_eng: 'Basra'
	}, 
	{
		id: 4, name: 'نجف',
		districtsList: ["نجف", "كوفة", "مشخاب", "المناذرة"],
		name_eng: 'Najaf'
	},
	{
		id: 5, name: 'كربلاء',
		districtsList: ["كربلاء", "الهندية", "عين التمر"],
		name_eng: 'Karbala'
	},
	{
		id: 6, name: 'بابل',
		districtsList: ["الحلة", "المسيب", "المحاويل", "الهاشمية", "الكفل", "الحمزة الغربي"],

		name_eng: 'Babil'
	},
	{
		id: 7, name: 'واسط',
		districtsList: ["الكوت", "الصويرة", "العزيزية", "الحي", "النعمانية", "بدرة"],

		name_eng: 'Wasit'
	},
	{
		id: 8, name: 'ذي قار',
		districtsList: ["الناصرية", "الشطرة", "سوق الشيوخ", "الرفاعي", "الجبايش"],
		name_eng: 'Dhiqar'
	},
	{
		id: 9, name: 'قادسية',
		districtsList: ["الديوانية", "الشامية", "عفك", "الحمزة",],
		name_eng: 'Qadisiya'
	},
	{
		id: 10, name: 'ميسان',
		districtsList: ["العمارة", "المجر الكبير", "قلعة صالح"],
		name_eng: 'Maysan'
	},
	{
		id: 11, name: 'مثنى',
		districtsList: ["السماوة", "الرميثة", "الخضر"],
		name_eng: 'Muthana'
	},
	{
		id: 12, name: 'ديالى',
		districtsList: ["بعقوبة", "الخالص", "المقدادية", "خانقين", "بلدروز", "كفري"],
		name_eng: 'Diyala'
	},
	{
		id: 103, name: 'صلاح الدين',
		districtsList: ["تكريت", "سامراء", "طوزخورماتو", "بيجي", "بلد", "الشرقاط"],
		name_eng: 'Saladin'
	},
	{
		id: 14, name: 'انبار',
		districtsList: ["الرمادي", "الفلوجة", "هيت", "القائم", "حديثة", "الرطبة"],
		name_eng: 'Anbar'
	},
	{
		id: 15, name: 'كركوك',
		districtsList: ["كركوك", "حويجة", "داقوق", "دبس"],
		name_eng: 'Kirkuk'
	},
	{
		id: 16, name: 'اربيل', title: 'اربيل',
		districtsList: ["اربيل", "سوران", "كوي سنجق"],

		name_eng: 'Erbil'
	},
	{
		id: 17, name: 'سليمانية', 
		districtsList: ["سليمانية", "جمجال", "دوكان", "كلار", "رانيا"], 
		name_eng: 'Sulaymani'
	},
	{
		id: 18, name: 'دهوك', 
		districtsList: ["دهوك", "زاخو", "سميل"],
		name_eng: 'Duhok'
	},
	{
		id: 19, name: 'حلبجة',  
		districtsList: ["حلبجة", "خورمال"],
		name_eng: 'Halabja'
	},
]

export function getCityById(id){
	return   iraq_cities.find(item => item.id == id);  
}