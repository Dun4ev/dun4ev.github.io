import {readRecords} from './engine.mjs';
export function demoCSV(){
 const orders=['order_id,platform,date,gross,food_cost,packaging'];const payouts=['order_id,platform,commission,promo,ads,refund,other,paid'];
 for(let i=0;i<32;i++){
  const platform=i%2===0?'Wolt':'Glovo',id=(platform==='Wolt'?'W-':'G-')+(84210+i),gross=1800+(i*137)%2800;
  const food=Math.round(gross*.29),packaging=75;
  orders.push([id,platform,`2026-10-${String(1+i%7).padStart(2,'0')}`,gross,food,packaging].join(','));
  if(i>=30)continue;
  let commission=Math.round(gross*(platform==='Wolt'?.30:.28)*100)/100,promo=i%4===0?Math.round(gross*.20):0,ads=i%5===0?280:0,refund=i===7?850:0,other=0;
  if(i===4||i===9)commission+=165;
  if(i===12){promo=Math.round(gross*.45);ads=600;}
  const gap=i===2?250:i===5?340:i===16?180:0;
  const paid=gross-commission-promo-ads-refund-other-gap;
  payouts.push([id,platform,...[commission,promo,ads,refund,other,paid].map(n=>n.toFixed(2))].join(','));
 }
 payouts.push('W-UNKNOWN,Wolt,300,0,0,0,0,700');
 return {orders:orders.join('\n'),payouts:payouts.join('\n')};
}
export function demo(){const d=demoCSV();return {orders:readRecords(d.orders,'orders','orders-demo.csv'),payouts:readRecords(d.payouts,'payouts','payouts-demo.csv'),rules:{Wolt:{bps:3000,base:'gross',verified:true},Glovo:{bps:2800,base:'gross',verified:true}}};}
