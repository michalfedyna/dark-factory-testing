export const prices: Record<string, number> = { road: 199999, helmet: 12000, mountain: 399999, electric: 249900 };
export type Address = Record<'name'|'street'|'city'|'region'|'postalCode'|'country', string>;
export const blankAddress: Address = {name:'',street:'',city:'',region:'',postalCode:'',country:''};
export type Route = 'catalog'|'details'|'cart'|'address'|'confirmation';
export interface Session {
 route: Route; selected: string; tab: 'description'|'specification'; query: string;
 category: string; searchVisible: boolean; favorites: string[]; cart: Record<string,number>;
 code: string; discounted: boolean; feedback: string; invalid: boolean;
 address: Address; errors: Partial<Address>; confirmation: {total:number;address:Address}|null;
}
export const initialSession: Session = {route:'catalog',selected:'road',tab:'description',query:'',category:'All',searchVisible:false,favorites:[],cart:{},code:'',discounted:false,feedback:'',invalid:false,address:{...blankAddress},errors:{},confirmation:null};
export function totals(cart: Record<string,number>, discounted: boolean) {
 const subtotal = Object.entries(cart).reduce((sum,[id,qty])=>sum+(prices[id] ?? 0)*qty,0);
 const discount = discounted ? Math.round(subtotal*30/100) : 0;
 return {subtotal,discount,total:subtotal-discount};
}
export function money(cents:number) { return `$ ${ (cents/100).toFixed(2) }`; }
export function validateAddress(address:Address): Partial<Address> {
 return Object.fromEntries(Object.entries(address).filter(([,value])=>!value.trim()).map(([key])=>[key,'This field is required.']));
}
export function matches(product:{name:string;category:string;categoryLabel:string}, query:string, category:string) {
 return (category==='All'||product.category===category) && `${product.name} ${product.categoryLabel}`.toLowerCase().includes(query.trim().toLowerCase());
}
export type Event =
 | {type:'open'|'favorite'|'add'|'increase'|'decrease'|'remove';id:string}
 | {type:'back'|'cart'|'browse'|'checkout'|'apply'|'submit'|'continue'|'searchToggle'}
 | {type:'query'|'category'|'code';value:string}
 | {type:'tab';value:Session['tab']}
 | {type:'address';key:keyof Address;value:string};
export function reducer(s:Session,e:Event):Session {
 switch(e.type) {
 case 'open': return prices[e.id] ? {...s,selected:e.id,route:'details',tab:'description'} : s;
 case 'back': return {...s,route:s.route==='address'?'cart':'catalog'};
 case 'cart': return {...s,route:'cart'};
 case 'browse': return {...s,route:'catalog'};
 case 'favorite': return {...s,favorites:s.favorites.includes(e.id)?s.favorites.filter(id=>id!==e.id):[...s.favorites,e.id]};
 case 'query': return {...s,query:e.value};
 case 'category': return {...s,category:e.value};
 case 'searchToggle': return {...s,searchVisible:!s.searchVisible};
 case 'tab': return {...s,tab:e.value};
 case 'code': return {...s,code:e.value,feedback:'',invalid:false};
 case 'apply': { const valid=s.code.trim()==='Bike'; return {...s,discounted:valid,invalid:!valid,feedback:valid?'Bike applied: 30% off items. Shipping is free.':'Invalid code. Try Bike for 30% off.'}; }
 case 'add': case 'increase': case 'decrease': case 'remove': {
  if (!prices[e.id]) return s;
  const cart={...s.cart}; const quantity=e.type==='remove'?0:(cart[e.id]??0)+(e.type==='decrease'?-1:1);
  if(quantity<=0) delete cart[e.id]; else cart[e.id]=quantity;
  return {...s,cart,route:e.type==='add'?'cart':s.route};
 }
 case 'checkout': return Object.keys(s.cart).length?{...s,route:'address'}:s;
 case 'address': return {...s,address:{...s.address,[e.key]:e.value},errors:{...s.errors,[e.key]:undefined}};
 case 'submit': {
  if(!Object.keys(s.cart).length) return {...s,route:'cart'};
  const errors=validateAddress(s.address);
  if(Object.keys(errors).length) return {...s,errors};
  const address=Object.fromEntries(Object.entries(s.address).map(([k,v])=>[k,v.trim()])) as Address;
  return {...s,route:'confirmation',errors:{},confirmation:{total:totals(s.cart,s.discounted).total,address},cart:{},discounted:false,code:'',feedback:'',invalid:false};
 }
 case 'continue': return {...s,route:'catalog',confirmation:null,address:{...blankAddress}};
 }
}
