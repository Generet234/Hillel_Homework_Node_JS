Було 4 залежності: 
	1.cors - залежність для того, щоб використовувати HTTP-запити. Встановити його можна за npm install cors
	2.dotenv - залежність для того, щоб завантажувати змінні із файлу .env. Встановити його можна за npm install dotenv --save
	3.express - залежність для того, щоб використовувати бібліотеку express для легко створення серверів. Встановити його можна за npm install express
	4.mongoose - залежність для того, щоб використовувати базу даних mongodb. Встановити його можна за npm install mongoose
У .env потрібні змінні, котрі ніхто не повинен знати з незнайомих людей. Ця інформація тільки для тебе.
Щоб запустити проєкт, треба спочатку запустити на своєму IDE програму, також у mongoDB треба підключити бази даних, щоб вони працювали. І через postman чи через термінал можна перевіряти роботу цього проєкту.

Обробка помилок:
	GET /api/products body:products error: Products not found
	GET /api/products/:id body:product error: Product not found
	POST /api/products body:updatedProduct error: Product not updated
	PUT /api/products/:id body:newProduct error: Product not created
	DELETE /api/products/:id body:deletedProduct error: Product not deleted

Кешування :
	Перший запит прийде зі старими даними, а вже через 30 секунд будуть нові дані.