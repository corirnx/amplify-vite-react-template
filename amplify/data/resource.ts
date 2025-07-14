import { a, defineData } from '@aws-amplify/backend';

//
// PRODUCT 
//
const ProductCategory = a.enum(['ZINS', 'VV', 'NH', 'AV', 'MT', 'EO', 'CI']);
const ProductStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const ProductInvestmentHorizon = a.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
const ProductInvestmentTarget = a.enum(['RETIREMENT', 'INCREASE', 'SHORT', 'STAY', 'SECURE', 'WISH']);

const ProductData = a.model({
  id: a.id().required(),
  category: ProductCategory,
  createdAt: a.timestamp().required(),
  name: a.string().required(),
  openedAt: a.timestamp(),
  updatedAt: a.timestamp(),
  balance: a.float().required(),
  balanceDate: a.timestamp().required(),
  eod: a.float().required(),
  eodDate: a.timestamp().required(),
  twr: a.float().required(),
  mwr: a.float().required(),
  balanceDepot: a.float().required(),
  status: ProductStatus,
  strategie: a.string().required(),
  iconName: a.string().required(),
  showIcon: a.boolean().required(),
  horizon: ProductInvestmentHorizon,
  target: ProductInvestmentTarget,
  subId: a.string().required(),
  depotItems: a.hasMany('DepotItemData', 'productDataDepotItemsId'),
  accounts: a.hasMany('BankAccountData', 'productDataAccountsId'),
  savingsplans: a.hasMany('SavingsplanData', 'productDataSavingsplansId'),
  events: a.hasMany('EventData', 'productDataEventsId'),
  contractDataProductsId: a.string(),
  contractData: a.belongsTo('ContractData', 'contractDataProductsId'),
});


//
// TODO
//
const TodoCategoryData = a.enum(['USER', 'CONTRACT', 'PRODUCT']);
const TodoStatus = a.enum(['OPEN', 'CLOSED']);

const TodoData = a.model({
  id: a.id().required(),
  category: TodoCategoryData,
  createdAt: a.timestamp().required(),
  closedAt: a.timestamp(),
  name: a.string().required(),
  description: a.string().required(),
  status: TodoStatus,
  image: a.string().required(),
  order: a.integer().required(),
  subId: a.string().required(),
  updatedAt: a.timestamp().required(),
  userDetailDataTodosId: a.string(),
  contractDataTodosId: a.string(),
  userDetail: a.belongsTo('UserDetailData', 'userDetailDataTodosId'),
  contract: a.belongsTo('ContractData', 'contractDataTodosId'),
});


//
// WPHG
//
const WphgData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  events: a.hasMany('EventData', 'wphgDataEventsId'),
  subId: a.string().required(),
  updatedAt: a.timestamp().required(),
});


//
// CONTRACT
//
const ContractCategory = a.enum(['PORTFOLIO', 'JUNIOR']);
const ContractAccountType = a.enum(['SINGLE', 'JOINT', 'CHILD_SINGLE', 'CHILD_JOINT']);
const ContractRole = a.enum(['OWNER', 'ATTORNEY', 'LEGAL_GUARDIAN']);
const ContractStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const ContractServicePackage = a.enum(['DIGITAL', 'PREMIUM', 'PRIVATE']);
const ActiveProductCategory = a.enum(['ZINS', 'VV', 'NH', 'AV', 'MT', 'EO', 'CI']);

const ContractData = a.model({
  id: a.id().required(),
  category: ContractCategory,
  accountType: ContractAccountType,
  createdAt: a.timestamp().required(),
  name: a.string().required(),
  openedAt: a.timestamp(),
  role: ContractRole,
  status: ContractStatus,
  updatedAt: a.timestamp(),
  wphgExpiresAt: a.timestamp(),
  performanceStartDate: a.timestamp(),
  servicePackage: ContractServicePackage,
  servicePackageStartDate: a.timestamp(),
  balance: a.float().required(),
  balanceDate: a.timestamp().required(),
  eod: a.float().required(),
  eodDate: a.timestamp().required(),
  twr: a.float().required(),
  mwr: a.float().required(),
  twrYear: a.float().required(),
  mwrYear: a.float().required(),
  iconName: a.string().required(),
  showIcon: a.boolean().required(),
  agbVersion: a.string().required(),
  activeProducts: ActiveProductCategory, // TODO: What's the right value here? a.string().array() ???
  riskClass: a.string().required(),
  subId: a.string().required(),
  products: a.hasMany('ProductData', 'contractDataProductsId'),
  accounts: a.hasMany('BankAccountData', 'contractDataAccountsId'),
  allocations: a.hasMany('AllocationData', 'contractDataAllocationsId'),
  todos: a.hasMany('TodoData', 'contractDataTodosId'),
  savingsplans: a.hasMany('SavingsplanData', 'contractDataSavingsplansId'),
  events: a.hasMany('EventData', 'contractDataEventsId'),
});


//
// DEPOT ITEM
//
const DepotItemClassData = a.enum(['STOCKS', 'BONDS', 'COMMODITIES']);

const DepotItemData = a.model({
  id: a.id().required(),
  name: a.string().required(),
  stuecke: a.float().required(),
  amount: a.float().required(),
  currency: a.string().required(),
  startRate: a.float().required(),
  currentRate: a.float().required(),
  notRealGUV: a.float().required(),
  notRealGUVCurrency: a.float().required(),
  notRealGUVPercentage: a.float().required(),
  referenceDate: a.timestamp().required(),
  assetId: a.string().required(),
  depotItemClass: DepotItemClassData,
  subId: a.string().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  productDataDepotItemsId: a.string(),
  product: a.belongsTo('ProductData', 'productDataDepotItemsId'),
});

//
// EXTERNAL ACCOUNT
//
const ExternalAccountData = a.model({
  id: a.id().required(),
  accountHolder: a.string().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp().required(),
  iban: a.string().required(),
  bic: a.string().required(),
  name: a.string().required(),
  subId: a.string().required(),
  savingsplanDataDebitAccountId: a.string().required(),
  savingsplan: a.belongsTo('SavingsplanData', 'savingsplanDataDebitAccountId'),
});

//
// ALLOCATION
//
const AllocationIntervalData = a.enum(['DAY', 'MONTH', 'QUARTER', 'YEAR']);
const AllocationStatus = a.enum(['OPEN', 'PENDING', 'CLOSED']);

const AllocationData = a.model({
  id: a.id().required(),
  amount: a.float(),
  createdAt: a.timestamp(),
  counter: a.integer().required(),
  interval: AllocationIntervalData,
  endDate: a.timestamp(),
  nextDate: a.timestamp(),
  startDate: a.timestamp(),
  mandate: a.string(),
  mandateDate: a.timestamp(),
  allocation: a.string().required(),
  status: AllocationStatus,
  updatedAt: a.timestamp(),
  subId: a.string().required(),
  accounts: a.hasMany('BankAccountData', 'allocationDataAccountsId'),
  contractDataAllocationsId: a.string().required(),
  contract: a.belongsTo('ContractData', 'contractDataAllocationsId'),
});


//
// ASSET
//
const AssetClassData = a.enum(['STOCKS', 'BONDS', 'COMMODITIES']);

const AssetData = a.model({
  id: a.id().required(),
  assetClass: AssetClassData,
  assetClass1: a.string().required(),
  assetClass2: a.string().required(),
  category: a.string().required(),
  currency: a.string().required(),
  exchangeRate: a.float().required(),
  isin: a.string().required(),
  paperLink: a.string(),
  name: a.string().required(),
  shortName: a.string().required(),
  ter: a.float().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp().required(),
});


//
// CONFIG
//
const ConfigData = a.model({
  id: a.id().required(),
  sort: a.string().required(),
  value: a.string(),
  data: a.string(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp().required(),
});


//
// EVENT
//
const EventCategoryData = a.enum(['USER', 'CONTRACT', 'PRODUCT']);
const EventSubCategoryData = a.enum([
  'LOGIN', 'LOGOUT', 'CONFIRM_LOGIN', 'DEBIT', 'WITHDRAWAL', 'WIRE', 'DISBURSEMENT', 'TRANSFER', 'DEPOT',
  'ACCOUNT_STATEMENT', 'INVOICE_STATEMENT', 'QUARTERLY_STATEMENT', 'TAX_STATEMENT', 'PM_REPORT',
  'INVESTMENT_GUIDELINE', 'COST_SHEET', 'ONBOARDING_PROTOCOL', 'PROCEED_SETTLEMENT', 'COST_REPORT',
  'FINANCE_REPORT', 'REBALANCING_INFORMATION', 'FACT_SHEET', 'IN_BOOKING', 'OUT_BOOKING', 'TANDA', 'FONDS',
  'AGB', 'LOSS', 'CONDITION', 'DEPOSIT_GUARANTEE', 'CONTRACT', 'ADDITIONAL'
]);
const EventStatus = a.enum(['OPEN', 'CLOSED', 'PENDING', 'READ', 'UNREAD']);
const SearchIdentification = a.enum(['USER', 'TRANSACTIONS', 'DOCS']);

const EventData = a.model({
  id: a.id().required(),
  iconName: a.string().required(),
  name: a.string().required(),
  description: a.string().required(),
  category: EventCategoryData,
  searchId: SearchIdentification,
  subcategory: EventSubCategoryData,
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  status: EventStatus,
  deviceName: a.string().required(),
  deviceModel: a.string().required(),
  deviceType: a.string().required(),
  note: a.string(),
  url: a.string(),
  value: a.string(),
  subId: a.string().array(),
  userDetailDataEventsId: a.string(),
  contractDataEventsId: a.string(),
  productDataEventsId: a.string(),
  bankAccountDataEventsId: a.string(),
  wphgDataEventsId: a.string(),
  savingsplanDataEventsId: a.string(),
  userDetail: a.belongsTo('UserDetailData', 'userDetailDataEventsId'),
  contract: a.belongsTo('ContractData', 'contractDataEventsId'),
  product: a.belongsTo('ProductData', 'productDataEventsId'),
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataEventsId'),
  wphg: a.belongsTo('WphgData', 'wphgDataEventsId'),
  savingsplan: a.belongsTo('SavingsplanData', 'savingsplanDataEventsId'),
});

//
// SAVINGSPLAN 
//
const SavingsplanCategoryData = a.enum(['PORTFOLIO', 'INSTRUMENT']);
const SavingsplanPeriodData = a.enum(['MONTH', 'QUARTER']);
const SavingsplanStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'IN_CLOSE', 'CLOSED']);

const SavingsplanData = a.model({
  id: a.id().required(),
  name: a.string().required(),
  category: SavingsplanCategoryData,
  amount: a.float().required(),
  currency: a.string().required(),
  startDate: a.timestamp(),
  nextDate: a.timestamp(),
  endDate: a.timestamp(),
  period: SavingsplanPeriodData,
  interval: a.integer().required(),
  status: SavingsplanStatus,
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  split: a.hasMany('SavingsplanSplitData', 'savingsplanDataSplitId'),
  debitAccount: a.hasMany('ExternalAccountData', 'savingsplanDataDebitAccountId'),
  events: a.hasMany('EventData', 'savingsplanDataEventsId'),
  subId: a.string().required(),
  contractDataSavingsplansId: a.string(),
  productDataSavingsplansId: a.string(),
  contract: a.belongsTo('ContractData', 'contractDataSavingsplansId'),
  product: a.belongsTo('ProductData', 'productDataSavingsplansId'),
});


//
// SAVINGSPLAN SPLIT 
//
const SavingsplanSplitData = a.model({
  id: a.id().required(),
  productId: a.string().required(),
  percentage: a.float().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  subId: a.string().required(),
  savingsplanDataSplitId: a.string(),
  savingsplan: a.belongsTo('SavingsplanData', 'savingsplanDataSplitId'),
});


//
// USER 
//
const UserStatus = a.enum(['IDENTIFIED', 'INACTIVE', 'ACTIVE']);
const UserAuthStatus = a.enum([
  'RESET_PASSWORD_REQUIRED',
  'FORCE_CHANGE_PASSWORD',
  'DISABLED',
  'UNCONFIRMED',
  'CONFIRMED',
]);
const UserGender = a.enum(['MALE', 'FEMALE', 'DIVERSE', 'EMPTY']);
const UserTitle = a.enum(['DOCTOR', 'PROFESSOR', 'EMPTY']);
const UserMaritalStatus = a.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'EMPTY']);
const UserRiskClass = a.enum(['A', 'B', 'C', 'D', 'E', 'EMPTY']);
const UserOccupation = a.enum([
  'EMPLOYED',
  'UNEMPLOYED',
  'CIVIL_SERVANT',
  'RETIRED',
  'INDEPENDENT_MEANS',
  'HOMEMAKER',
  'STUDENT',
  'APPRENTICE',
  'CIVILIAN_SERVICE',
  'SELF_EMPLOYED',
  'OTHER_PRIVATE_INDIVIDUAL',
  'EMPTY',
]);
const UserOccupationIndustry = a.enum([
  'UNKNOWN',
  'INFORMATION_AND_COMMUNICATION',
  'HEALTHCARE',
  'ARTS_ENTERTAINMENT_AND_RECREATION',
  'MANUFACTURING',
  'FINANCIAL_AND_INSURANCE_SERVICES',
  'TRADE',
  'GASTRONOMY',
  'PUBLIC_RELATIONS_AND_BUSINESS_CONSULTING',
  'TRAVEL_SERVICES',
  'ENERGY_SUPPLY',
  'WATER_SUPPLY',
  'HOSPITALITY',
  'MINING',
  'AGRICULTURE_FORESTRY_AND_FISHING',
  'REAL_ESTATE',
  'OTHER_SERVICES',
  'LEGAL_TAX_AND_AUDITING',
  'CONSTRUCTION',
  'EDUCATION_AND_TEACHING',
  'VEHICLE_MAINTENANCE_AND_REPAIR',
  'TRANSPORTATION_AND_STORAGE',
  'EMPTY',
]);

const UserTaxIds = a.customType({
  country: a.string(),
  tin: a.string(),
});

const UserDetailData = a.model({
  id: a.id().required(),
  status: UserStatus,
  authStatus: UserAuthStatus,
  confirmedAt: a.timestamp(),
  subId: a.string().required(),
  totalLoginAttempts: a.integer(),
  lastLoginAt: a.timestamp(),
  lastAttemptedLoginAt: a.timestamp(),
  mfa: a.boolean().required(),
  mfaCreatedAt: a.timestamp(),
  mfaConfirmedAt: a.timestamp(),
  email: a.string(),
  emailConfirmedAt: a.timestamp(),
  phone: a.string(),
  phoneCode: a.string(),
  phoneConfirmedAt: a.timestamp(),
  birthDate: a.date(),
  birthName: a.string(),
  birthCountry: a.string(),
  street: a.string(),
  streetNumber: a.string(),
  additionalAddressInfo: a.string(),
  city: a.string(),
  state: a.string(),
  zip: a.string(),
  country: a.string(),
  firstName: a.string(),
  firstNameInUse: a.string(),
  middleName: a.string(),
  lastName: a.string(),
  gender: UserGender,
  maritalStatus: UserMaritalStatus,
  nationality: a.string(),
  title: UserTitle,
  occupation: UserOccupation,
  occupationIndustry: UserOccupationIndustry,
  qTag: a.string().required(),
  taxIds: UserTaxIds, // TODO: what's the right value here? a.string().array() ??
  landline: a.string(),
  isPoliticallyExposed: a.boolean(),
  isIdentified: a.boolean().required(),
  riskClass: UserRiskClass,
  platformUserId: a.string(),
  platformUpdatedAt: a.timestamp(),
  platformKycProcessId: a.string(),
  emailOptIn: a.boolean().required(),
  phoneOptIn: a.boolean().required(),
  offeringOptIn: a.boolean().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp().required(),
  events: a.hasMany('EventData', 'userDetailDataEventsId'),
  todos: a.hasMany('TodoData', 'userDetailDataTodosId'),
});


//
// BANK ACCOUNT
//
const BankAccountCategoryData = a.enum(['CLEARING', 'LIQUID']);
const BankAccountStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);

const BankAccountData = a.model({
  id: a.id().required(),
  category: BankAccountCategoryData,
  accountHolder: a.string().required(),
  balance: a.float().required(),
  balanceDate: a.timestamp().required(),
  bic: a.string().required(),
  currency: a.string().required(),
  createdAt: a.timestamp().required(),
  eod: a.float().required(),
  exchangeRate: a.float().required(),
  iban: a.string().required(),
  name: a.string().required(),
  plus: a.boolean().required(),
  status: BankAccountStatus,
  updatedAt: a.timestamp().required(),
  events: a.hasMany('EventData', 'bankAccountDataEventsId'),
  subId: a.string().required(),
  contractDataAccountsId: a.string().required(),
  productDataAccountsId: a.string().required(),
  allocationDataAccountsId: a.string().required(),
  contract: a.belongsTo('ContractData', 'contractDataAccountsId'),
  product: a.belongsTo('ProductData', 'productDataAccountsId'),
  allocation: a.belongsTo('AllocationData', 'allocationDataAccountsId'),
}).authorization((allow) => [
  // TODO: What needs to be set here?  
  allow.owner('userPools')
]);


const schema = a.schema({
  BankAccountData,
  UserDetailData,
  EventData,
  SavingsplanData,
  SavingsplanSplitData,
  AllocationData,
  AssetData,
  ConfigData,
  ContractData,
  DepotItemData,
  ExternalAccountData,
  ProductData,
  TodoData,
  WphgData,
});

export const data = defineData({
  schema,
});

export type Schema = typeof schema;