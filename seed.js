const { CONSTANTS } = require("./utils/constants");

export const SEED = {
  CONFIGURATION: [
    {
      key: "CUSTOMER_SIGNUP_EMAIL_EXPIRY",
      value: "1",
    },
    {
      key: "CUSTOMER_FP_EMAIL_EXPIRY",
      value: "1",
    },
    {
      key: "MAXIMUM_PRODUCT_IMAGES",
      value: "4",
    },
    {
      key: "MAXIMUM_PRODUCT_VARIANT_IMAGES",
      value: "4",
    },
  ],
  SEQUENCE: [
    {
      name: CONSTANTS.CUSTOMER_NUMBER_SEQ_GEN,
      startValue: 1,
      prefix: "CUST",
      numberofDigit: 6,
      startFrom: 0,
    },
    {
      name: CONSTANTS.PRODUCT_IMAGES_SEQ_GEN,
      startValue: 1,
      prefix: "PRODUCT",
      numberofDigit: 6,
      startFrom: 0,
    },
    {
      name: CONSTANTS.PRODUCT_VARIANT_IMAGES_SEQ_GEN,
      startValue: 1,
      prefix: "VARIANT",
      numberofDigit: 4,
      startFrom: 0,
    },
    {
      name: CONSTANTS.ORDER_SEQ_GEN,
      startValue: 1,
      prefix: "Z",
      numberofDigit: 8,
      startFrom: 0,
    },
    {
      name: CONSTANTS.PRODUCT_SKU_SEQ_GEN,
      startValue: 1,
      prefix: "PRDSKU",
      numberofDigit: 6,
      startFrom: 0,
    },
  ],
  PROMOTION_TYPE: [
    {
      name: "Discount",
    }
  ],
  SITE_SECTION: [
    {
      name: "Trending Product",
    },
    {
      name: "Feature Product",
    }
  ],
  COUNTY: [
    {
      name: "Bristol",
    },
    {
      name: "Cambridgeshire",
    },
    {
      name: "Cumbria",
    },
    {
      name: "Devon",
    },
    {
      name: "Yorkshire",
    },
  ],
  CITY: [
    {
      name: "Ashley Down",
      countyId: 1,
    },
    {
      name: "Yate",
      countyId: 1,
    },
    {
      name: "Bedminster",
      countyId: 1,
    },
    {
      name: "Cambridge",
      countyId: 2,
    },
    {
      name: "Ely",
      countyId: 2,
    },
    {
      name: "Huntingdon",
      countyId: 2,
    },
    {
      name: "City of Carlisle",
      countyId: 3,
    },
    {
      name: "Coniston",
      countyId: 3,
    },
    {
      name: "Penrith",
      countyId: 3,
    },
    {
      name: "Exeter",
      countyId: 4,
    },
    {
      name: "Torquay",
      countyId: 4,
    },
    {
      name: "Dartmouth",
      countyId: 4,
    },
    {
      name: "York",
      countyId: 5,
    },
    {
      name: "Sheffield",
      countyId: 5,
    },
    {
      name: "Kingston upon Hull",
      countyId: 5,
    },
  ],
  UOM: [
    {
      name: "LITRE",
      status: true,
    },
    {
      name: "GRAM",
      status: true,
    },
    {
      name: "KILO_GRAM",
      status: true,
    },
    {
      name: "MILLI_GRAM",
      status: true,
    },
    {
      name: "OTHER",
      status: true,
    },
  ],
  CUSTOMER: [
    {
      firstName: "Waseem",
      lastName: "ahmed",
      email: "waseem@gmail.com",
      password: null,
      mobile: "1234567890",
      telephone: "041741223",
      customerSeqId: null,
      image: "public/images/customers/default_user.png",
      status: true,
      gender: "MALE",
      isNewsLetter: null,
      isPromoDiscount: null,
      otpSignup: null,
      otpFp: null,
      expiryTime: null,
      expiryTimeFp: null,
      isVerified: false,
      otlTime: "2021-10-05T07:47:52.000Z",
      otlTimeFp: "2021-10-05T07:47:52.000Z",
    },
    {
      firstName: "Nadeem",
      lastName: "ahmed",
      email: "nadeem@iwayy.com",
      password: null,
      mobile: "1234567891",
      telephone: "041741224",
      customerSeqId: null,
      image: "public/images/customers/default_user.png",
      status: true,
      gender: "MALE",
      isNewsLetter: null,
      isPromoDiscount: null,
      otpSignup: null,
      otpFp: null,
      expiryTime: null,
      expiryTimeFp: null,
      isVerified: false,
      otlTime: "2021-10-05T07:47:52.000Z",
      otlTimeFp: "2021-10-05T07:47:52.000Z",
    },
    {
      firstName: "John",
      lastName: "Dio",
      email: "john@iwayy.com",
      password: null,
      mobile: "1234567391",
      telephone: "041741124",
      customerSeqId: null,
      image: "public/images/customers/default_user.png",
      status: true,
      gender: "MALE",
      isNewsLetter: null,
      isPromoDiscount: null,
      otpSignup: null,
      otpFp: null,
      expiryTime: null,
      expiryTimeFp: null,
      isVerified: false,
      otlTime: "2021-10-05T07:47:52.000Z",
      otlTimeFp: "2021-10-05T07:47:52.000Z",
    },
  ],
  CUSTOMER_ADDRESS: [
    {
      name: "Muzammil",
      address1: "76/234",
      address2: "London",
      phone: "9876543210",
      postcode: "989898988",
      isDefault: true,
      cityId: 1,
      customersProfileMstId: 1
    },
    {
      name: "Nadeem",
      address1: "74/234",
      address2: "London",
      phone: "9876543210",
      postcode: "989898988",
      isDefault: false,
      cityId: 2,
      customersProfileMstId: 1
    },
    {
      name: "Aasif",
      address1: "76/634",
      address2: "London",
      phone: "9876543210",
      postcode: "989898988",
      isDefault: false,
      cityId: 3,
      customersProfileMstId: 1
    },
    {
      name: "Nadeem",
      address1: "22/554",
      address2: "London",
      phone: "9874543510",
      postcode: "989594988",
      isDefault: true,
      cityId: 4,
      customersProfileMstId: 2
    },
    {
      name: "John",
      address1: "12/644",
      address2: "London",
      phone: "9874543210",
      postcode: "989598988",
      isDefault: true,
      cityId: 3,
      customersProfileMstId: 3
    },
  ],
  CATEGORY: [
    {
      name: "Hair Extension",
      menuPriority: 1,
      image: "public/images/categories/default_category.png",
      banner: "public/images/categories/default_category.png",
      status: true,
    },
    {
      name: "Wigs",
      menuPriority: 2,
      image: "public/images/categories/default_category.png",
      banner: "public/images/categories/default_category.png",
      status: true,
    },
    {
      name: "Hair Care",
      menuPriority: 3,
      image: "public/images/categories/default_category.png",
      banner: "public/images/categories/default_category.png",
      status: true,
    },
    {
      name: "Skin Care",
      menuPriority: 4,
      image: "public/images/categories/default_category.png",
      banner: "public/images/categories/default_category.png",
      status: true,
    },
    {
      name: "Make Up",
      menuPriority: 5,
      image: "public/images/categories/default_category.png",
      banner: "public/images/categories/default_category.png",
      status: true,
    },
  ],
  GROUP: [
    {
      name: "HUMAN HAIR EXTENSIONS",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 1,
    },
    {
      name: "SYNTHETIC HAIR EXTENSION",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 1,
    },
    {
      name: "CLIP IN",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 1,
    },
    {
      name: "BRAIDS",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 1,
    },
    {
      name: "FULL WIGS",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 2,
    },
    {
      name: "HALF WIG",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 2,
    },
    {
      name: "AFRO HAIR CARE",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 3,
    },
    {
      name: "EUROPEAN HAIR CARE",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 3,
    },
    {
      name: "BODY CARE",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 4,
    },
    {
      name: "ETHNIC BODY CARE",
      image: "public/images/groups/default_group.png",
      status: true,
      categoryId: 4,
    },
  ],
  SUBGROUP: [
    {
      name: "Remy Hair Weave",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 1,
    },
    {
      name: "European Hair Weave",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 1,
    },
    {
      name: "Straight Weave",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 2,
    },
    {
      name: "Curly Weave",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 2,
    },
    {
      name: "Human Hair Clip In",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 3,
    },
    {
      name: "Colour Ring",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 3,
    },
    {
      name: "Human Hair Braids",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 4,
    },
    {
      name: "Synthetic Hair Braids",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 4,
    },
    {
      name: "Synthetic Wig",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 5,
    },
    {
      name: "Human Hair Wigs",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 5,
    },
    {
      name: "Human Hair Wig",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 6,
    },
    {
      name: "Synthetic Hair Wig",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 6,
    },
    {
      name: "Shampoo",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 7,
    },
    {
      name: "Conditioner",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 7,
    },
    {
      name: "Dry Shampoo",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 7,
    },
    {
      name: "Leave In-Conditioner",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 7,
    },
    {
      name: "Shampoo",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 8,
    },
    {
      name: "Conditioner",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 8,
    },
    {
      name: "Body Moisturisers",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 9,
    },
    {
      name: "Body Wash & Bathing",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 9,
    },
    {
      name: "Body Moisturisers",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 10,
    },
    {
      name: "Facial Care",
      image: "public/images/categories/default_category.png",
      isReturn: false,
      status: true,
      groupId: 10,
    },
  ],
  BRAND: [
    {
      name: "Lux",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "L???Or??al",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Unilever",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "P&G",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Est??e Lauder",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Avon",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Johnson & Johnson",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Shiseido",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Beiersdorf",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
    {
      name: "Kao",
      image: "public/images/brands/default_brand.png",
      status: true,
    },
  ],
  VARIANT: [
    {
      name: "Color",
      status: true,
      isImage: false,
      subGroupId: 1,
    },
    {
      name: "Size",
      status: true,
      isImage: false,
      subGroupId: 1,
    },
    {
      name: "Flavour",
      status: true,
      isImage: true,
      subGroupId: 1,
    },
  ],
  ATTRIBUTE: [
    {
      name: "Red",
      status: true,
      uomId: 5,
      variantId: 1,
    },
    {
      name: "Blue",
      status: true,
      uomId: 5,
      variantId: 1,
    },
    {
      name: "16",
      status: true,
      uomId: 5,
      variantId: 2,
    },
    {
      name: "18",
      status: true,
      uomId: 5,
      variantId: 2,
    },
    {
      name: "Orange",
      status: true,
      uomId: 5,
      variantId: 3,
    },
    {
      name: "Mango",
      status: true,
      uomId: 5,
      variantId: 3,
    },
    {
      name: "Banana",
      status: true,
      uomId: 5,
      variantId: 3,
    },
  ],
  WAREHOUSE: [
    {
      type: "WAREHOUSE",
      name: "Ambur",
      addressLine1: "#1, 2nd lane",
      addressLine2: null,
      zipcode: "63545",
      status: true,
      contactPerson: "Peter paul",
      email: "peter@iwayy.com",
      phone: "05246852325",
      cityId: 4,
    },
    {
      type: "WAREHOUSE",
      name: "Vaniyambadi",
      addressLine1: "1st Street",
      addressLine2: "Fort",
      zipcode: "635751",
      status: true,
      contactPerson: "John Peter",
      email: "John@iwayy.com",
      phone: "05246852325",
      cityId: 1,
    },
  ],
  PRODUCT: [
    {
      name: "Peruvian Virgin Remi HH Bohemian Wvg",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 0,
      lowStock: 0,
      vat: 10,
      isReturn: false,
      isVariant: true,
      retailPrice: 0,
      costPrice: 0,
      sellPrice: 0,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000001",
      subGroupId: 1,
      brandId: 1,
    },
    {
      name: "Peruvian Virgin Remi HH Bohemian",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 0,
      lowStock: 0,
      vat: 10,
      isReturn: false,
      isVariant: true,
      retailPrice: 0,
      costPrice: 0,
      sellPrice: 0,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000002",
      subGroupId: 1,
      brandId: 1,
    },
    {
      name: "SLEEK REMY COUTURE SILKY WEAVE 113 G",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 0,
      lowStock: 0,
      vat: 23,
      isReturn: false,
      isVariant: true,
      retailPrice: 0,
      costPrice: 0,
      sellPrice: 0,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000003",
      subGroupId: 1,
      brandId: 1,
    },
    {
      name: "SLEEK REMY COUTURE YAKI 100% HUMAN HAIR WEFT 113 G",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 0,
      lowStock: 0,
      vat: 5,
      isReturn: false,
      isVariant: true,
      retailPrice: 0,
      costPrice: 0,
      sellPrice: 0,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000004",
      subGroupId: 1,
      brandId: 2,
    },
    {
      name: "SLEEK REMY COUTURE YAKI 100% HUMAN HAIR WEFT",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 27.69,
      lowStock: 0,
      vat: 5,
      isReturn: false,
      isVariant: false,
      retailPrice: 178,
      costPrice: 130,
      sellPrice: 175,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000005",
      subGroupId: 1,
      brandId: 2,
    },
    {
      name: "Goddess Remi Silky Remy Wvg",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 0,
      lowStock: 0,
      vat: 6,
      isReturn: false,
      isVariant: true,
      retailPrice: 0,
      costPrice: 0,
      sellPrice: 0,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000006",
      subGroupId: 1,
      brandId: 2,
    },
    {
      name: "Goddess Remi Loose Body Wvg",
      description: null,
      returnPolicy: null,
      sku: null,
      status: true,
      gender: "NONE",
      markup: 15.79,
      lowStock: 0,
      vat: 7,
      isReturn: false,
      isVariant: false,
      retailPrice: 120,
      costPrice: 95,
      sellPrice: 119,
      isMultipleListing: false,
      liveRelatedProduct: false,
      seoPageTitle: null,
      seoKeyword: null,
      seoConicals: null,
      seoMetaDescription: null,
      folderName: "PRODUCT000007",
      subGroupId: 1,
      brandId: 2,
    },
  ],
  EMAIL_TEMPLATE: [
    {
      id: 1,
      name: "Signup",
      subject: "Signup Verification - Zab's",
      description:
        "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='description' content=''><meta name='author' content=''><title>ZabsMail</title><link href='css/bootstrap.min.css' rel='stylesheet'><link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=PT+Sans&display=swap' rel='stylesheet'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'><link href='css/theme.css' rel='stylesheet'></head><body id='page-top'><style>*{margin:0;padding:0}body{font-family:'PT Sans',sans-serif}a:hover{color:#00f}#page-top{overflow:hidden}.container{display:flex;justify-content:center;align-items:center;min-height:100vh}.mail{position:relative;width:450px;height:610px;display:grid;grid-template-rows:1fr 5fr 1fr;align-items:center;background:#FFEBCE url(http://${host}/public/images/email/700.png) no-repeat center;background-size:cover;padding:10px}.mail::before{content:'';position:absolute;top:0;left:0;width:100%;height:55%;background-color:#333}.logo{display:flex;justify-content:center}.logo img{max-width:120px;height:auto;z-index:10}.content{background-color:#FFFBF5;margin:1.3rem;z-index:10;box-shadow:0 0 40px #5557;padding:1rem;color:#000;text-align:center;font-size:1.3rem}.content h1,h2,h4{padding-bottom:15px}.content p{font-size:.9rem;margin:0;padding-bottom:15px}.otp{display:flex;flex-direction:row;column-gap:5px;justify-content:center;font-size:2rem;font-weight:700;color:#000;letter-spacing:10px}#help{padding-bottom:8px}#feedback{color:#999}#ftcontent{color:#ff69b4}.footer{text-align:center;color:#000}.footer p{font-size:.7rem;margin:0;padding-bottom:7px}</style><div class='container'><div class='mail'><div class='logo'><img src='http://${host}/public/images/email/ZabsLogo.png' alt=''></div><div class='content'><h2>Welcome !!</h2><h4>We're excited to have you get started. First, we need to confirm your account. Here's your code</h4><div class='otp'>${otpSignup}</div><p id='help'>Need more help?</p><a href='#'><p>We're Here, Ready to talk</p></a><p id='feedback'>Please Send any feedback or bug report to<br>feedback@gmail.com</p></div><div class='footer'><p>Zabs Hair & Beauty</p><p>Address: #495, Oxford Road, Reading, Berkshire, GB.</p><p id='ftcontent'>Privacy Policy | Help | AboutUs</p></div></div></div></body></html>",
    },
    {
      id: 2,
      name: "Forgot Password",
      subject: "Forgot Password Verification - Zab's",
      description:
        "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='description' content=''><meta name='author' content=''><title>ZabsMail</title><link href='css/bootstrap.min.css' rel='stylesheet'><link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=PT+Sans&display=swap' rel='stylesheet'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'><link href='css/theme.css' rel='stylesheet'></head><body id='page-top'><style>*{margin:0;padding:0}body{font-family:'PT Sans',sans-serif}a:hover{color:#00f}#page-top{overflow:hidden}.container{display:flex;justify-content:center;align-items:center;min-height:100vh}.mail{position:relative;width:450px;height:610px;display:grid;grid-template-rows:1fr 5fr 1fr;align-items:center;background:#FFEBCE url(http://${host}/public/images/email/700.png) no-repeat center;background-size:cover;padding:10px}.mail::before{content:'';position:absolute;top:0;left:0;width:100%;height:55%;background-color:#333}.logo{display:flex;justify-content:center}.logo img{max-width:120px;height:auto;z-index:10}.content{background-color:#FFFBF5;margin:1.3rem;z-index:10;box-shadow:0 0 40px #5557;padding:1rem;color:#000;text-align:center;font-size:1.3rem}.content h1,h2,h4{padding-bottom:15px}.content p{font-size:.9rem;margin:0;padding-bottom:15px}.otp{display:flex;flex-direction:row;column-gap:5px;justify-content:center;font-size:2rem;font-weight:700;color:#000;letter-spacing:10px}#help{padding-bottom:8px}#feedback{color:#999}#ftcontent{color:#ff69b4}.footer{text-align:center;color:#000}.footer p{font-size:.7rem;margin:0;padding-bottom:7px}</style><div class='container'><div class='mail'><div class='logo'><img src='http://${host}/public/images/email/ZabsLogo.png' alt=''></div><div class='content'><h2>Welcome !!</h2><h4>We're excited to have you get started. First, we need to confirm your account. Here's your code</h4><div class='otp'>${otpSignup}</div><p id='help'>Need more help?</p><a href='#'><p>We're Here, Ready to talk</p></a><p id='feedback'>Please Send any feedback or bug report to<br>feedback@gmail.com</p></div><div class='footer'><p>Zabs Hair & Beauty</p><p>Address: #495, Oxford Road, Reading, Berkshire, GB.</p><p id='ftcontent'>Privacy Policy | Help | AboutUs</p></div></div></div></body></html>",
    },
  ],
  PRODUCT_IMAGE: [
    {
      image: "public/images/products/PRODUCT000001/2021-10-07-06-154386.jpg",
      originalName: "bohemian.jpg",
      isDefault: true,
      productId: 1,
    },
    {
      image: "public/images/products/PRODUCT000002/2021-10-07-06-175585.jpg",
      originalName: "loosedeep.jpg",
      isDefault: true,
      productId: 2,
    },
    {
      image: "public/images/products/PRODUCT000003/2021-10-07-06-206983.jpg",
      originalName: "loosedeep.jpg",
      isDefault: true,
      productId: 3,
    },
    {
      image: "public/images/products/PRODUCT000004/2021-10-07-06-227451.jpg",
      originalName: "yaki.jpg",
      isDefault: true,
      productId: 4,
    },
    {
      image: "public/images/products/PRODUCT000005/2021-10-07-06-249797.jpg",
      originalName: "yaki.jpg",
      isDefault: true,
      productId: 5,
    },
    {
      image: "public/images/products/PRODUCT000006/2021-10-07-06-264395.jpg",
      originalName: "remisilky.jpg",
      isDefault: true,
      productId: 6,
    },
    {
      image: "public/images/products/PRODUCT000007/2021-10-07-06-308333.jpg",
      originalName: "loose.jpg",
      isDefault: true,
      productId: 7,
    },
  ],
  PRODUCT_ATTRIBUTE_IMAGE: [
    {
      image: "public/images/products/PRODUCT000002/2021-10-07-06-183431.png",
      originalName: "bleach-brown.png",
      isPrimary: true,
      productId: 2,
      productVariantId: 1,
    },
    {
      image: "public/images/products/PRODUCT000002/2021-10-07-06-184797.jpg",
      originalName: "bohemian.jpg",
      isPrimary: false,
      productId: 2,
      productVariantId: 1,
    },
    {
      image: "public/images/products/PRODUCT000002/2021-10-07-06-188400.png",
      originalName: "bleach-honey.png",
      isPrimary: true,
      productId: 2,
      productVariantId: 2,
    },
    {
      image: "public/images/products/PRODUCT000002/2021-10-07-06-187486.jpg",
      originalName: "bohemian.jpg",
      isPrimary: false,
      productId: 2,
      productVariantId: 2,
    },
    {
      image: "public/images/products/PRODUCT000003/2021-10-07-06-214030.png",
      originalName: "1b.png",
      isPrimary: true,
      productId: 3,
      productVariantId: 5,
    },
    {
      image: "public/images/products/PRODUCT000003/2021-10-07-06-213292.jpg",
      originalName: "loosedeep.jpg",
      isPrimary: false,
      productId: 3,
      productVariantId: 5,
    },
    {
      image: "public/images/products/PRODUCT000003/2021-10-07-06-214677.png",
      originalName: "bleach-honey.png",
      isPrimary: true,
      productId: 3,
      productVariantId: 6,
    },
    {
      image: "public/images/products/PRODUCT000003/2021-10-07-06-219208.jpg",
      originalName: "loosedeep.jpg",
      isPrimary: false,
      productId: 3,
      productVariantId: 6,
    },
    {
      image: "public/images/products/PRODUCT000004/2021-10-07-06-222749.png",
      originalName: "tr-honey.png",
      isPrimary: true,
      productId: 4,
      productVariantId: 8,
    },
    {
      image: "public/images/products/PRODUCT000004/2021-10-07-06-221455.jpg",
      originalName: "yaki.jpg",
      isPrimary: false,
      productId: 4,
      productVariantId: 8,
    },
    {
      image: "public/images/products/PRODUCT000004/2021-10-07-06-221147.png",
      originalName: "tr-brown.png",
      isPrimary: true,
      productId: 4,
      productVariantId: 9,
    },
    {
      image: "public/images/products/PRODUCT000006/2021-10-07-06-279672.png",
      originalName: "27a.png",
      isPrimary: true,
      productId: 6,
      productVariantId: 11,
    },
    {
      image: "public/images/products/PRODUCT000006/2021-10-07-06-271348.jpg",
      originalName: "remisilky.jpg",
      isPrimary: false,
      productId: 6,
      productVariantId: 11,
    },
    {
      image: "public/images/products/PRODUCT000006/2021-10-07-06-271366.png",
      originalName: "bleach-honey.png",
      isPrimary: true,
      productId: 6,
      productVariantId: 12,
    },
    {
      image: "public/images/products/PRODUCT000006/2021-10-07-06-272690.jpg",
      originalName: "remisilky.jpg",
      isPrimary: false,
      productId: 6,
      productVariantId: 12,
    },
  ],
  PRODUCT_VARIANT: [
    {
      productId: 2,
      variantId: 1,
      attributeId: 2,
    },
    {
      productId: 2,
      variantId: 1,
      attributeId: 1,
    },
    {
      productId: 2,
      variantId: 2,
      attributeId: 3,
    },
    {
      productId: 2,
      variantId: 2,
      attributeId: 4,
    },
    {
      productId: 3,
      variantId: 1,
      attributeId: 2,
    },
    {
      productId: 3,
      variantId: 1,
      attributeId: 1,
    },
    {
      productId: 3,
      variantId: 2,
      attributeId: 4,
    },
    {
      productId: 4,
      variantId: 1,
      attributeId: 2,
    },
    {
      productId: 4,
      variantId: 1,
      attributeId: 1,
    },
    {
      productId: 4,
      variantId: 2,
      attributeId: 4,
    },
    {
      productId: 6,
      variantId: 1,
      attributeId: 2,
    },
    {
      productId: 6,
      variantId: 1,
      attributeId: 1,
    },
    {
      productId: 6,
      variantId: 2,
      attributeId: 4,
    },
    {
      productId: 6,
      variantId: 2,
      attributeId: 3,
    },
  ],
  PRODUCT_VARIANT_DETAIL: [
    {
      combinationName: "2-3",
      markup: 5.45,
      retailPrice: 130,
      costPrice: 110,
      sellPrice: 129,
      sku: null,
      status: true,
      productId: 2,
    },
    {
      combinationName: "2-4",
      markup: null,
      retailPrice: null,
      costPrice: null,
      sellPrice: null,
      sku: null,
      status: true,
      productId: 2,
    },
    {
      combinationName: "1-3",
      markup: 2.5,
      retailPrice: 140,
      costPrice: 120,
      sellPrice: 137,
      sku: null,
      status: true,
      productId: 2,
    },
    {
      combinationName: "1-4",
      markup: 10.83,
      retailPrice: 150,
      costPrice: 120,
      sellPrice: 148,
      sku: null,
      status: true,
      productId: 2,
    },
    {
      combinationName: "2-4",
      markup: 18,
      retailPrice: 78,
      costPrice: 50,
      sellPrice: 77,
      sku: null,
      status: true,
      productId: 3,
    },
    {
      combinationName: "1-4",
      markup: 9.09,
      retailPrice: 80,
      costPrice: 55,
      sellPrice: 79,
      sku: null,
      status: true,
      productId: 3,
    },
    {
      combinationName: "2-4",
      markup: null,
      retailPrice: null,
      costPrice: null,
      sellPrice: null,
      sku: null,
      status: true,
      productId: 4,
    },
    {
      combinationName: "1-4",
      markup: 14.62,
      retailPrice: 160,
      costPrice: 130,
      sellPrice: 157,
      sku: null,
      status: true,
      productId: 4,
    },
    {
      combinationName: "2-4",
      markup: 50,
      retailPrice: 167,
      costPrice: 100,
      sellPrice: 160,
      sku: null,
      status: true,
      productId: 6,
    },
    {
      combinationName: "2-3",
      markup: 17.5,
      retailPrice: 155,
      costPrice: 120,
      sellPrice: 150,
      sku: null,
      status: true,
      productId: 6,
    },
    {
      combinationName: "1-4",
      markup: null,
      retailPrice: null,
      costPrice: null,
      sellPrice: null,
      sku: null,
      status: true,
      productId: 6,
    },
    {
      combinationName: "1-3",
      markup: 9.85,
      retailPrice: 156,
      costPrice: 132,
      sellPrice: 155,
      sku: null,
      status: true,
      productId: 6,
    },
  ],
  WAREHOUSE_STOCK: [
    {
      qty: 10,
      productId: 2,
      productVariantDetailId: 1,
      warehouseId: 1,
    },
    {
      qty: null,
      productId: 2,
      productVariantDetailId: 2,
      warehouseId: 1,
    },
    {
      qty: 29,
      productId: 2,
      productVariantDetailId: 3,
      warehouseId: 1,
    },
    {
      qty: 67,
      productId: 2,
      productVariantDetailId: 4,
      warehouseId: 1,
    },
    {
      qty: 90,
      productId: 3,
      productVariantDetailId: 5,
      warehouseId: 1,
    },
    {
      qty: 90,
      productId: 3,
      productVariantDetailId: 6,
      warehouseId: 1,
    },
    {
      qty: null,
      productId: 4,
      productVariantDetailId: 7,
      warehouseId: 1,
    },
    {
      qty: 66,
      productId: 4,
      productVariantDetailId: 8,
      warehouseId: 1,
    },
    {
      qty: 12,
      productId: 5,
      productVariantDetailId: null,
      warehouseId: 1,
    },
    {
      qty: 78,
      productId: 6,
      productVariantDetailId: 9,
      warehouseId: 1,
    },
    {
      qty: 78,
      productId: 6,
      productVariantDetailId: 10,
      warehouseId: 1,
    },
    {
      qty: null,
      productId: 6,
      productVariantDetailId: 11,
      warehouseId: 1,
    },
    {
      qty: 88,
      productId: 6,
      productVariantDetailId: 12,
      warehouseId: 1,
    },
    {
      qty: 12,
      productId: 7,
      productVariantDetailId: null,
      warehouseId: 1,
    },
  ],
  RELATED_PRODUCT: [
    {
      actualProductId: 2,
      productId: 1,
    },
  ],
  SITE_SECTION_ITEM: [
    {
      productId: 1,
      siteSectionId: 1,
    },
    {
      productId: 2,
      siteSectionId: 1,
    },
    {
      productId: 4,
      siteSectionId: 1,
    },
    {
      productId: 3,
      siteSectionId: 1,
    },
    {
      productId: 6,
      siteSectionId: 1,
    },
    {
      productId: 1,
      siteSectionId: 2,
    },
    {
      productId: 3,
      siteSectionId: 2,
    },
    {
      productId: 4,
      siteSectionId: 2,
    },
    {
      productId: 6,
      siteSectionId: 2,
    },
    {
      productId: 2,
      siteSectionId: 2,
    },
  ],
};
