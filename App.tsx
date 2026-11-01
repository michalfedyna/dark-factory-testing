import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, BackHandler, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CatalogScreen, ProductDetailsScreen, CartScreen, AddressScreen, ConfirmationScreen } from './src/ui/screens';
import { Label } from './src/ui/primitives';
import { sampleProducts } from './src/ui/sampleContent';
import { theme } from './src/ui/theme';
import { initialSession, reducer, matches, money, prices, totals } from './src/shop';
import type { Category } from './src/ui/types';
export default function App() {
 const [s,dispatch]=useReducer(reducer,initialSession);
 const [loaded,error]=useFonts({Poppins_400Regular,Poppins_500Medium,Poppins_700Bold,...Ionicons.font});
 useEffect(()=>{
  if(Platform.OS!=='android') return;
  const sub=BackHandler.addEventListener('hardwareBackPress',()=>{
   if(s.route==='catalog') return false;
   dispatch({type:s.route==='confirmation'?'continue':'back'}); return true;
  });
  return ()=>sub.remove();
 },[s.route]);
 const products=sampleProducts.map(p=>({...p,priceLabel:money(prices[p.id]!),favorite:s.favorites.includes(p.id)}));
 const numeric=totals(s.cart,s.discounted);
 const summary={subtotal:money(numeric.subtotal),discount:money(numeric.discount),shipping:'Free',total:money(numeric.total)};
 const back=()=>dispatch({type:'back'});
 const product=products.find(p=>p.id===s.selected)!;
 let screen;
 if(s.route==='details') screen=<ProductDetailsScreen product={product} tab={s.tab} onTab={value=>dispatch({type:'tab',value})} onBack={back} onFavorite={()=>dispatch({type:'favorite',id:product.id})} onAdd={()=>dispatch({type:'add',id:product.id})}/>;
 else if(s.route==='cart') screen=<CartScreen lines={products.filter(p=>s.cart[p.id]).map(product=>({product,quantity:s.cart[product.id]!}))} totals={summary} code={s.code} feedback={s.feedback} codeInvalid={s.invalid} checkoutDisabled={!Object.keys(s.cart).length} onCodeChange={value=>dispatch({type:'code',value})} onApply={()=>dispatch({type:'apply'})} onIncrease={id=>dispatch({type:'increase',id})} onDecrease={id=>dispatch({type:'decrease',id})} onRemove={id=>dispatch({type:'remove',id})} onBack={back} onCheckout={()=>dispatch({type:'checkout'})} onBrowse={()=>dispatch({type:'browse'})}/>;
 else if(s.route==='address') screen=<AddressScreen address={s.address} errors={s.errors} totals={summary} onChange={(key,value)=>dispatch({type:'address',key,value})} onBack={back} onSubmit={()=>dispatch({type:'submit'})} disabled={!Object.keys(s.cart).length}/>;
 else if(s.route==='confirmation'&&s.confirmation) {const a=s.confirmation.address;screen=<ConfirmationScreen total={money(s.confirmation.total)} addressLines={[a.name,a.street,`${a.city}, ${a.region} ${a.postalCode}`,a.country]} onContinue={()=>dispatch({type:'continue'})}/>;}
 else screen=<CatalogScreen products={products.filter(p=>matches(p,s.query,s.category))} heroImage={products[0]!.image} category={s.category as Category} search={s.query} searchVisible={s.searchVisible} cartCount={Object.values(s.cart).reduce((a,b)=>a+b,0)} onSearchToggle={()=>dispatch({type:'searchToggle'})} onSearchChange={value=>dispatch({type:'query',value})} onCategoryChange={value=>dispatch({type:'category',value})} onOpenProduct={id=>dispatch({type:'open',id})} onFavorite={id=>dispatch({type:'favorite',id})} onCart={()=>dispatch({type:'cart'})}/>;
 return <SafeAreaProvider><StatusBar barStyle="light-content"/>{error?<View style={{flex:1,backgroundColor:theme.color.background,justifyContent:'center',padding:24}}><Label>Unable to load demo fonts. Please restart the app.</Label></View>:!loaded?<View style={{flex:1,backgroundColor:theme.color.background,justifyContent:'center'}}><ActivityIndicator color={theme.color.accent}/></View>:screen}</SafeAreaProvider>;
}
