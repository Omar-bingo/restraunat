# استخدام صورة Nginx كقاعدة لتشغيل موقع ويب ثابت
FROM nginx:alpine

# تثبيت Node.js و npm
RUN apk add --update nodejs npm

# نسخ ملفات المشروع إلى مجلد الخادم
COPY . /usr/share/nginx/html/

# تثبيت حزم npm بما في ذلك jQuery
WORKDIR /usr/share/nginx/html
RUN npm install

# إنشاء مجلد للمكتبات وإضافة رابط رمزي لـ jQuery
RUN mkdir -p /usr/share/nginx/html/libs
RUN ln -sf /usr/share/nginx/html/node_modules/jquery/dist/jquery.min.js /usr/share/nginx/html/libs/jquery.min.js

# تعديل مسارات jQuery في ملفات HTML
RUN find /usr/share/nginx/html/Pages -name "*.html" -exec sed -i 's|../../../node_modules/jquery/dist/jquery.min.js|/libs/jquery.min.js|g' {} \;

# تعيين نقطة البداية للموقع
RUN ln -sf /usr/share/nginx/html/Pages/Home/html/index.html /usr/share/nginx/html/index.html

# تعريض المنفذ 80 للوصول إلى الموقع
EXPOSE 80

# أمر بدء تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]