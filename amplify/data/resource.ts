import { a, defineData } from '@aws-amplify/backend';

//
// PRODUCT 
//
const ProductCategory = a.enum(['ZINS', 'VV', 'NH', 'AV', 'MT', 'EO', 'CI']);
const ProductStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const ProductInvestmentHorizon = a.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
const ProductInvestmentTarget = a.enum(['RETIREMENT', 'INCREASE', 'SHORT', 'STAY', 'SECURE', 'WISH']);

const ProductData = a.model({
  id: a.id(),
  category: ProductCategory,
  createdAt: a.timestamp(),
  name: a.string(),
  openedAt: a.timestamp().optional(),
  updatedAt: a.timestamp().optional(),
  balance: a.float(),
  balanceDate: a.timestamp(),
  eod: a.float(),
  eodDate: a.timestamp(),
  twr: a.float(),
  mwr: a.float(),
  balanceDepot: a.float(),
  status: ProductStatus,
  strategie: a.string(),
  iconName: a.string(),
  showIcon: a.boolean(),
  horizon: ProductInvestmentHorizon,
  target: ProductInvestmentTarget,
  subId: a.string(),
  depotItems: a.hasMany('DepotItemData', 'productDataDepotItemsId'),
  accounts: a.hasMany('BankAccountData', 'productDataAccountsId'),
  savingsplans: a.hasMany('SavingsplanData', 'productDataSavingsplansId'),
  events: a.hasMany('EventData', 'productDataEventsId'),
  contractDataProductsId: a.string().optional(),
});


//
// TODO
//
const TodoCategoryData = a.enum(['USER', 'CONTRACT', 'PRODUCT']);
const TodoStatus = a.enum(['OPEN', 'CLOSED']);

const TodoData = a.model({
  id: a.id(),
  category: TodoCategoryData,
  createdAt: a.timestamp(),
  closedAt: a.timestamp().optional(),
  name: a.string(),
  description: a.string(),
  status: TodoStatus,
  image: a.string(),
  order: a.integer(),
  subId: a.string(),
  updatedAt: a.timestamp(),
  userDetailDataTodosId: a.string().optional(),
  contractDataTodosId: a.string().optional(),
});


//
// WPHG
//
const WphgData = a.model({
  id: a.id(),
  createdAt: a.timestamp(),
  events: a.hasMany('EventData', 'wphgDataEventsId'),
  subId: a.string(),
  updatedAt: a.timestamp(),
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
  id: a.id(),
  category: ContractCategory,
  accountType: ContractAccountType,
  createdAt: a.timestamp(),
  name: a.string(),
  openedAt: a.timestamp().optional(),
  role: ContractRole,
  status: ContractStatus,
  updatedAt: a.timestamp().optional(),
  wphgExpiresAt: a.timestamp().optional(),
  performanceStartDate: a.timestamp().optional(),
  servicePackage: ContractServicePackage,
  servicePackageStartDate: a.timestamp().optional(),
  balance: a.float(),
  balanceDate: a.timestamp(),
  eod: a.float(),
  eodDate: a.timestamp(),
  twr: a.float(),
  mwr: a.float(),
  twrYear: a.float(),
  mwrYear: a.float(),
  iconName: a.string(),
  showIcon: a.boolean(),
  agbVersion: a.string(),
  activeProducts: a.array(ActiveProductCategory),
  riskClass: a.string(),
  subId: a.string(),
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
  id: a.id(),
  name: a.string(),
  stuecke: a.float(),
  amount: a.float(),
  currency: a.string(),
  startRate: a.float(),
  currentRate: a.float(),
  notRealGUV: a.float(),
  notRealGUVCurrency: a.float(),
  notRealGUVPercentage: a.float(),
  referenceDate: a.timestamp(),
  assetId: a.string(),
  depotItemClass: DepotItemClassData,
  subId: a.string(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp().optional(),
  productDataDepotItemsId: a.string().optional(),
});

//
// EXTERNAL ACCOUNT
//
const ExternalAccountData = a.model({
  id: a.id(),
  accountHolder: a.string(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp(),
  iban: a.string(),
  bic: a.string(),
  name: a.string(),
  subId: a.string(),
  savingsplanDataDebitAccountId: a.string(),
});

//
// ALLOCATION
//
const AllocationIntervalData = a.enum(['DAY', 'MONTH', 'QUARTER', 'YEAR']);
const AllocationStatus = a.enum(['OPEN', 'PENDING', 'CLOSED']);

const AllocationData = a.model({
  id: a.id(),
  amount: a.float().optional(),
  createdAt: a.timestamp().optional(),
  counter: a.integer(),
  interval: AllocationIntervalData,
  endDate: a.timestamp().optional(),
  nextDate: a.timestamp().optional(),
  startDate: a.timestamp().optional(),
  mandate: a.string().optional(),
  mandateDate: a.timestamp().optional(),
  allocation: a.string(),
  status: AllocationStatus,
  updatedAt: a.timestamp().optional(),
  subId: a.string(),
  accounts: a.hasMany('BankAccountData', 'allocationDataAccountsId'),
  contractDataAllocationsId: a.string(),
});


//
// ASSET
//
const AssetClassData = a.enum(['STOCKS', 'BONDS', 'COMMODITIES']);

const AssetData = a.model({
  id: a.id(),
  assetClass: AssetClassData,
  assetClass1: a.string(),
  assetClass2: a.string(),
  category: a.string(),
  currency: a.string(),
  exchangeRate: a.float(),
  isin: a.string(),
  paperLink: a.string().optional(),
  name: a.string(),
  shortName: a.string(),
  ter: a.float(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp(),
});


//
// CONFIG
//
const ConfigData = a.model({
  id: a.id(),
  sort: a.string(),
  value: a.string().optional(),
  data: a.string().optional(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp(),
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
  id: a.id(),
  iconName: a.string(),
  name: a.string(),
  description: a.string(),
  category: EventCategoryData,
  searchId: SearchIdentification,
  subcategory: EventSubCategoryData,
  createdAt: a.timestamp(),
  updatedAt: a.timestamp().optional(),
  status: EventStatus,
  deviceName: a.string(),
  deviceModel: a.string(),
  deviceType: a.string(),
  note: a.string().optional(),
  url: a.string().optional(),
  value: a.string().optional(),
  subId: a.array(a.string()),
  userDetailDataEventsId: a.string().optional(),
  contractDataEventsId: a.string().optional(),
  productDataEventsId: a.string().optional(),
  bankAccountDataEventsId: a.string().optional(),
  wphgDataEventsId: a.string().optional(),
  savingsplanDataEventsId: a.string().optional(),
});

//
// SAVINGSPLAN 
//
const SavingsplanCategoryData = a.enum(['PORTFOLIO', 'INSTRUMENT']);
const SavingsplanPeriodData = a.enum(['MONTH', 'QUARTER']);
const SavingsplanStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'IN_CLOSE', 'CLOSED']);

const SavingsplanData = a.model({
  id: a.id(),
  name: a.string(),
  category: SavingsplanCategoryData,
  amount: a.float(),
  currency: a.string(),
  startDate: a.timestamp().optional(),
  nextDate: a.timestamp().optional(),
  endDate: a.timestamp().optional(),
  period: SavingsplanPeriodData,
  interval: a.integer(),
  status: SavingsplanStatus,
  createdAt: a.timestamp(),
  updatedAt: a.timestamp().optional(),
  split: a.hasMany('SavingsplanSplitData', 'savingsplanDataSplitId'),
  debitAccount: a.hasMany('ExternalAccountData', 'savingsplanDataDebitAccountId'),
  events: a.hasMany('EventData', 'savingsplanDataEventsId'),
  subId: a.string(),
  contractDataSavingsplansId: a.string().optional(),
  productDataSavingsplansId: a.string().optional(),
});


//
// SAVINGSPLAN SPLIT 
//
const SavingsplanSplitData = a.model({
  id: a.id(),
  productId: a.string(),
  percentage: a.float(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp().optional(),
  subId: a.string(),
  savingsplanDataSplitId: a.string().optional(),
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
  id: a.id(),
  status: UserStatus,
  authStatus: UserAuthStatus,
  confirmedAt: a.timestamp().optional(),
  subId: a.string(),
  totalLoginAttempts: a.integer().optional(),
  lastLoginAt: a.timestamp().optional(),
  lastAttemptedLoginAt: a.timestamp().optional(),
  mfa: a.boolean(),
  mfaCreatedAt: a.timestamp().optional(),
  mfaConfirmedAt: a.timestamp().optional(),
  email: a.string().optional(),
  emailConfirmedAt: a.timestamp().optional(),
  phone: a.string().optional(),
  phoneCode: a.string().optional(),
  phoneConfirmedAt: a.timestamp().optional(),
  birthDate: a.date().optional(),
  birthName: a.string().optional(),
  birthCountry: a.string().optional(),
  street: a.string().optional(),
  streetNumber: a.string().optional(),
  additionalAddressInfo: a.string().optional(),
  city: a.string().optional(),
  state: a.string().optional(),
  zip: a.string().optional(),
  country: a.string().optional(),
  firstName: a.string().optional(),
  firstNameInUse: a.string().optional(),
  middleName: a.string().optional(),
  lastName: a.string().optional(),
  gender: UserGender.optional(),
  maritalStatus: UserMaritalStatus.optional(),
  nationality: a.string().optional(),
  title: UserTitle.optional(),
  occupation: UserOccupation.optional(),
  occupationIndustry: UserOccupationIndustry.optional(),
  qTag: a.string(),
  taxIds: a.array(UserTaxIds),
  landline: a.string().optional(),
  isPoliticallyExposed: a.boolean().optional(),
  isIdentified: a.boolean(),
  riskClass: UserRiskClass.optional(),
  platformUserId: a.string().optional(),
  platformUpdatedAt: a.timestamp().optional(),
  platformKycProcessId: a.string().optional(),
  emailOptIn: a.boolean(),
  phoneOptIn: a.boolean(),
  offeringOptIn: a.boolean(),
  createdAt: a.timestamp(),
  updatedAt: a.timestamp(),
  events: a.hasMany('EventData', 'userDetailDataEventsId'),
  todos: a.hasMany('TodoData', 'userDetailDataTodosId'),
});


//
// BANK ACCOUNT
//
const BankAccountCategoryData = a.enum(['CLEARING', 'LIQUID']);
const BankAccountStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);

const BankAccountData = a.model({
  id: a.id(),
  category: BankAccountCategoryData,
  accountHolder: a.string(),
  balance: a.float(),
  balanceDate: a.timestamp(),
  bic: a.string(),
  currency: a.string(),
  createdAt: a.timestamp(),
  eod: a.float(),
  exchangeRate: a.float(),
  iban: a.string(),
  name: a.string(),
  plus: a.boolean(),
  status: BankAccountStatus,
  updatedAt: a.timestamp(),
  events: a.hasMany('EventData', 'bankAccountDataEventsId'),
  subId: a.string(),
  contractDataAccountsId: a.string(),
  productDataAccountsId: a.string(),
  allocationDataAccountsId: a.string(),
});


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
  enums: {
    BankAccountCategoryData,
    BankAccountStatus,
    UserStatus,
    UserAuthStatus,
    UserGender,
    UserTitle,
    UserMaritalStatus,
    UserOccupation,
    UserOccupationIndustry,
    UserRiskClass,
    EventCategoryData,
    EventSubCategoryData,
    EventStatus,
    SearchIdentification,
    SavingsplanCategoryData,
    SavingsplanPeriodData,
    SavingsplanStatus,
    AllocationIntervalData,
    AllocationStatus,
    AssetClassData,
    ContractCategory,
    ContractAccountType,
    ContractRole,
    ContractStatus,
    ContractServicePackage,
    ActiveProductCategory,
    DepotItemClassData,
    ProductCategory,
    ProductStatus,
    ProductInvestmentHorizon,
    ProductInvestmentTarget,
    TodoCategoryData,
    TodoStatus,
  },
  customTypes: { UserTaxIds },
});