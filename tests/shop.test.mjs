import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialSession, reducer, totals, money, matches, validateAddress} from '../src/shop.ts';
const act=(s,type,extra={})=>reducer(s,{type,...extra});
test('empty cart blocks checkout; session navigation retains quantities and favorites',()=>{
 let s=structuredClone(initialSession);
 assert.deepEqual(s.cart,{}); assert.equal(act(s,'checkout').route,'catalog');
 s=act(s,'favorite',{id:'road'}); s=act(s,'open',{id:'road'}); s=act(s,'tab',{value:'specification'});
 assert.equal(s.tab,'specification'); s=act(s,'add',{id:'road'});
 s=act(s,'back'); assert.equal(s.cart.road,1); assert.deepEqual(s.favorites,['road']);
 s=act(s,'favorite',{id:'road'}); assert.deepEqual(s.favorites,[]);
 s=act(s,'increase',{id:'road'}); assert.equal(s.cart.road,2);
 s=act(s,'decrease',{id:'road'}); s=act(s,'decrease',{id:'road'}); assert.deepEqual(s.cart,{});
 s=act(s,'add',{id:'helmet'}); s=act(s,'remove',{id:'helmet'}); assert.deepEqual(s.cart,{});
});
test('search and categories combine with whitespace/case normalization',()=>{
 const p={name:'PEUGEOT - LR01',category:'Road',categoryLabel:'Road Bike'};
 assert.equal(matches(p,' peuGEot ','All'),true); assert.equal(matches(p,'bike','Road'),true);
 assert.equal(matches(p,'','Electric'),false); assert.equal(matches(p,'helmet','All'),false);
});
test('Bike applies once, totals track current items, invalid clears discount',()=>{
 let s=act(initialSession,'add',{id:'road'}); s=act(s,'code',{value:'Bike'}); s=act(s,'apply');
 assert.deepEqual(totals(s.cart,s.discounted),{subtotal:199999,discount:60000,total:139999});
 s=act(s,'apply'); assert.equal(totals(s.cart,s.discounted).total,139999);
 s=act(s,'add',{id:'helmet'}); assert.deepEqual(totals(s.cart,s.discounted),{subtotal:211999,discount:63600,total:148399});
 s=act(s,'increase',{id:'road'}); assert.equal(totals(s.cart,true).total,288399);
 s=act(s,'remove',{id:'road'}); assert.equal(totals(s.cart,true).total,8400);
 s=act(s,'code',{value:'invalid'}); s=act(s,'apply'); assert.equal(s.invalid,true); assert.equal(s.discounted,false);
 assert.equal(money(totals(s.cart,s.discounted).total),'$ 120.00');
 assert.equal(money(0),'$ 0.00'); assert.equal(money(1),'$ 0.01');
});
test('required address prevents submission; valid mock snapshots address and discounted total then empties cart',()=>{
 let s=act(initialSession,'add',{id:'road'}); s=act(s,'checkout'); s=act(s,'submit');
 assert.equal(s.route,'address'); assert.equal(Object.keys(s.errors).length,6);
 const address={name:' Alex ',street:'1 Demo St',city:'London',region:'London',postalCode:'SW1A 1AA',country:'UK'};
 assert.deepEqual(validateAddress({...address,name:'   '}),{name:'This field is required.'});
 for(const [key,value] of Object.entries(address)) s=act(s,'address',{key,value});
 s=act(s,'back'); assert.equal(s.route,'cart'); assert.equal(s.address.name,' Alex ');
 s=act(s,'code',{value:'Bike'}); s=act(s,'apply'); s=act(s,'checkout'); s=act(s,'submit');
 assert.equal(s.route,'confirmation'); assert.equal(s.confirmation.total,139999); assert.equal(s.confirmation.address.name,'Alex'); assert.deepEqual(s.cart,{});
 s=act(s,'continue'); assert.equal(s.route,'catalog'); assert.equal(s.confirmation,null); assert.equal(s.address.name,'');
 assert.equal(act(initialSession,'submit').route,'cart');
});
