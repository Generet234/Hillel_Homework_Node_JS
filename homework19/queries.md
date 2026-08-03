GET /api/products – отримати всі товари
GET /api/products/:id – отримати один товар
POST /api/products – створити товар
PUT /api/products/:id – оновити товар
DELETE /api/products/:id – видалити товар


COLLSCAN та IXSCAN сканують зовсім різні параметри. COLLSCAN послідовно сканує усю колекцію, тим часом як IXSCAN шукає за допомогою індексу.

Бо mongoose автоматично генерує цей індекс для гарантії цілісності даних.

У першому результаті IXSCAN знайде тільки знайдені документи, а COLLSCAN знайде усі документи у колекції

MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "existing_email@example.com" } виводить, бо у нас дублюється ключ.

У IXSCAN кількість переглянутих документів буде менша, юо вона читає тільки ті документи, котрі їй підходять за умовою, а COLLSCAN кількість переглянутих документів буде кількістю документів у колекції. 