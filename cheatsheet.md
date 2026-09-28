جهت چیدمان
css
flex-direction: row;            /* چپ به راست (پیش‌فرض) */
flex-direction: row-reverse;    /* راست به چپ */
flex-direction: column;         /* بالا به پایین */
flex-direction: column-reverse; /* پایین به بالا */
ترازبندی افقی
css
justify-content: flex-start;    /* چپ */
justify-content: flex-end;      /* راست */
justify-content: center;        /* وسط */
justify-content: space-between; /* فاصله بین */
justify-content: space-around;  /* فاصله دور */
justify-content: space-evenly;  /* فاصله یکسان */
ترازبندی عمودی
css
align-items: flex-start;  /* بالا */
align-items: flex-end;    /* پایین */
align-items: center;      /* وسط */
align-items: stretch;     /* کشیده (پیش‌فرض) */
شکستن خط
css
flex-wrap: nowrap;        /* نمی‌شکنه (پیش‌فرض) */
flex-wrap: wrap;          /* می‌شکنه */
فاصله بین آیتم‌ها
css
gap: 10px;
الگوی وسط چین کامل
css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
🌱 Grid
فعال‌سازی
css
display: grid;
تعریف ستون‌ها
css
grid-template-columns: 100px 100px 100px;   /* ۳ ستون ثابت */
grid-template-columns: 20% 20% 20%;         /* درصدی */
grid-template-columns: 1fr 2fr 1fr;         /* کسری */
grid-template-columns: repeat(3, 1fr);      /* تکرار */
تعریف ردیف‌ها
css
grid-template-rows: 100px 1fr 1fr;
ترکیب (راحت‌ترین)
css
grid-template: 1fr 50px / 1fr 4fr 1fr;
/* rows / columns */
قرار دادن آیتم
css
.item {
  grid-column: 1 / 6;   /* از ستون ۱ تا ۶ */
  grid-row: 5 / 6;      /* از ردیف ۵ تا ۶ */
}
ناحیه‌بندی با نام
css
.container {
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
}

.item {
  grid-area: header;
}
الگوی ۳ ستونی
css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
📋 واحدها
واحد	معنی
px	پیکسل (ثابت)
%	درصد (نسبت به والد)
em	نسبت به فونت
fr	کسری (فقط Grid)
vh	ارتفاع صفحه (Viewport Height)
vw	عرض صفحه (Viewport Width)
🎨 ویژگی‌های مهم
رنگ و پس‌زمینه
css
background: #667eea;
background: linear-gradient(135deg, #667eea, #764ba2);
color: white;
فاصله
css
padding: 30px;           /* فاصله داخلی */
margin: 20px;            /* فاصله خارجی */
margin-bottom: 15px;     /* فقط پایین */
گوشه‌ها و سایه
css
border-radius: 20px;     /* گوشه گرد */
border-radius: 50%;      /* دایره */
box-shadow: 0 10px 30px rgba(0,0,0,0.2);
متن
css
font-size: 24px;
font-weight: bold;
text-align: center;
line-height: 1.6;
عکس
css
object-fit: cover;       /* قاب رو پر کن، نسبت حفظ شه */
انتقال (نرم شدن)
css
transition: background 0.3s;
transition: all 0.3s ease;
هاور
css
.btn:hover {
  background: #764ba2;
}
🎯 الگوهای پرکاربرد
وسط چین کردن کارت
css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
کارت
css
.card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 350px;
  width: 100%;
}
دکمه
css
.btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #764ba2;
}
💡 نکات مهم
display: flex روی والد می‌ذاریم، تا فرزندان رو بچینه

gfr = سهم از فضای باقی‌مانده

gap = فاصله بین آیتم‌ها (بهتر از margin)

transition روی عنصر اصلی، نه :hover

object-fit: cover برای عکس‌ها

text

---
