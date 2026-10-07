// Money is kept in hundredths of a dinar. This is a normalized CSV model,
// not an adapter for any platform's native export or contract.
export const ORDER_COLUMNS = ['order_id','platform','date','gross','food_cost','packaging'];
export const PAYOUT_COLUMNS = ['order_id','platform','commission','promo','ads','refund','other','paid'];
export const FEE_COLUMNS = ['commission','promo','ads','refund','other'];
export function money(value, signed=false) {
 const s=String(value).trim();
 if(!(signed ? /^-?\d+(?:[.,]\d{1,2})?$/ : /^\d+(?:[.,]\d{1,2})?$/).test(s)) throw new Error(`Некорректная сумма: ${s.slice(0,40)}`);
 const negative=s.startsWith('-'); const [a,b='']=s.replace('-','').split(/[.,]/);
 const n=Number(a)*100+Number(b.padEnd(2,'0'));
 if(!Number.isSafeInteger(n)||n>1e11) throw new Error('Сумма слишком велика (максимум 1 млрд RSD)');
 return negative?-n:n;
}
export function parseCSV(text) {
 const input=text.replace(/^\uFEFF/,'');
 const first=input.split(/\r?\n/)[0];
 const delimiter=first.includes(';')?';':',';
 const rows=[];let row=[],field='',quoted=false,closed=false,rowLine=1,line=1;
 function pushField(){row.push(field);field='';closed=false;}
 function pushRow(){pushField();if(row.some(v=>v.trim()!==''))rows.push({values:row,line:rowLine});row=[];rowLine=line+1;}
 for(let i=0;i<input.length;i++){
  const c=input[i];
  if(quoted){if(c==='"'){if(input[i+1]==='"'){field+='"';i++;}else {quoted=false;closed=true;}}else{field+=c;if(c==='\n')line++;}continue;}
  if(c==='"'){if(field!==''||closed)throw new Error(`Лишняя кавычка, строка ${line}`);quoted=true;}
  else if(c===delimiter)pushField();
  else if(c==='\n'){pushRow();line++;}
  else if(c==='\r' && input[i+1]==='\n')continue;
  else{if(closed)throw new Error(`Лишний текст после кавычки, строка ${line}`);field+=c;}
 }
 if(quoted)throw new Error('Незакрытая кавычка в CSV');
 if(field!==''||row.length)pushRow();
 if(rows.length<2)throw new Error('CSV должен содержать заголовки и хотя бы одну строку');
 const headers=rows.shift().values.map(s=>s.trim());
 if(new Set(headers).size!==headers.length)throw new Error('Повторяющиеся заголовки CSV');
 if(rows.length>5000)throw new Error('Допустимо не более 5000 строк');
 return {headers,rows:rows.map(({values,line})=>{if(values.length!==headers.length)throw new Error(`Неверное число столбцов, строка ${line}`);return Object.assign(Object.fromEntries(headers.map((h,i)=>[h,values[i].trim()])),{sourceLine:line});})};
}
const key=r=>`${r.platform}\u0000${r.order_id}`;
export function readRecords(text,type,filename='CSV') {
 const {headers,rows}=parseCSV(text);const columns=type==='orders'?ORDER_COLUMNS:PAYOUT_COLUMNS;
 const absent=columns.filter(c=>!headers.includes(c));if(absent.length)throw new Error(`Отсутствуют столбцы: ${absent.join(', ')}`);
 const seen=new Set();return rows.map(r=>{
  if(!r.order_id||r.order_id.length>120)throw new Error(`Нет ID или ID слишком длинный, строка ${r.sourceLine}`);
  if(!['Wolt','Glovo'].includes(r.platform))throw new Error(`platform должен быть Wolt или Glovo, строка ${r.sourceLine}`);
  if(seen.has(key(r)))throw new Error(`Повтор пары ${r.platform} / ${r.order_id}, строка ${r.sourceLine}. Объедините частичные выплаты заранее.`);seen.add(key(r));
  const out={order_id:r.order_id,platform:r.platform,sourceLine:r.sourceLine,sourceFile:filename};
  if(type==='orders'){
   if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||isNaN(Date.parse(r.date))||new Date(r.date).toISOString().slice(0,10)!==r.date)throw new Error(`Некорректная дата, строка ${r.sourceLine}`);
   out.date=r.date;for(const c of ['gross','food_cost','packaging'])out[c]=money(r[c]);
  }else for(const c of [...FEE_COLUMNS,'paid'])out[c]=money(r[c],c==='paid');
  return out;
 });
}
export function reconcile(orders,payouts,rules={}) {
 const ps=new Map(payouts.map(p=>[key(p),p]));const os=new Set(orders.map(key));
 const records=orders.map(o=>{
  const p=ps.get(key(o));if(!p)return {...o,payout:null,kind:'pending',issues:['Нет выплаты за этот период'],gap:null,contribution:null};
  const fees=FEE_COLUMNS.reduce((s,c)=>s+p[c],0),expected=o.gross-fees,gap=expected-p.paid;
  const rule=rules[o.platform];let contractFee=null,commissionExcess=null;
  if(rule?.verified&&['gross','after_promo'].includes(rule.base)&&Number.isInteger(rule.bps)&&rule.bps>=0&&rule.bps<=10000){const base=rule.base==='after_promo'?Math.max(0,o.gross-p.promo):o.gross;contractFee=Math.round(base*rule.bps/10000);commissionExcess=p.commission-contractFee;}
  const issues=[];
  if(Math.abs(gap)>1)issues.push(gap>0?'Выплата ниже расчета':'Выплата выше расчета');
  if(commissionExcess>1)issues.push('Комиссия выше заданной ставки');
  const contribution=p.paid-o.food_cost-o.packaging;
  if(contribution<0)issues.push('Отрицательный вклад заказа');
  return {...o,payout:p,fees,expected,gap,contribution,contractFee,commissionExcess,issues,kind:issues.length?'review':'ok'};
 });
 for(const p of payouts)if(!os.has(key(p)))records.push({order_id:p.order_id,platform:p.platform,payout:p,date:null,kind:'orphan',issues:['Выплата без заказа'],gap:null,contribution:null});
 return records;
}
export function summarize(records) {
 const matched=records.filter(r=>r.payout&&r.gap!==null),t={count:matched.length,gross:0,paid:0,food_cost:0,packaging:0,contribution:0,gap:0,balanceGap:0,review:records.filter(r=>r.kind==='review').length,pending:records.filter(r=>r.kind==='pending').length,orphan:records.filter(r=>r.kind==='orphan').length};
 for(const c of FEE_COLUMNS)t[c]=0;
 for(const r of matched){for(const c of ['gross','food_cost','packaging','contribution'])t[c]+=r[c];t.paid+=r.payout.paid;t.balanceGap+=r.gap;t.gap+=Math.abs(r.gap)>1?Math.abs(r.gap):0;for(const c of FEE_COLUMNS)t[c]+=r.payout[c];}
 t.fees=FEE_COLUMNS.reduce((s,c)=>s+t[c],0);return t;
}
export function csvExport(records) {
 const headers=['order_id','platform','date','status','gross_RSD','fees_RSD','expected_RSD','paid_RSD','difference_RSD','contribution_RSD','commission_check_RSD','issues','order_file','order_line','payout_file','payout_line'];
 const m=v=>v===null||v===undefined?'':(v/100).toFixed(2);
 const escape=v=>{let s=String(v??'');const start=s.replace(/^[\s\u0000-\u001f]+/,'');if(/^[=+@-]/.test(start)&&!(/^-?\d+(\.\d+)?$/.test(s)))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
 return '\uFEFF'+[headers,...records.map(r=>[r.order_id,r.platform,r.date,r.kind,m(r.gross),m(r.fees),m(r.expected),m(r.payout?.paid),m(r.gap),m(r.contribution),m(r.commissionExcess),r.issues.join('; '),r.sourceFile,r.sourceLine,r.payout?.sourceFile,r.payout?.sourceLine])].map(row=>row.map(escape).join(',')).join('\r\n');
}
