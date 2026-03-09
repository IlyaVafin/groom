# Backend
- `cd backend` Переходим в папку с бэкендом
- Запустить docker desktop
- `docker-compose up -d` запускаем postgres контейнер
- `python -m venv venv` создаем виртуальное окружение
- `venv\Scripts\activate` активируем 
- `cd app` 
- `pip install -r requirements.txt` устанавливаем зависимости 
- `python main.py` запускаем бэкенд

# Frontend
- Выходим из директории бэкенда `cd ../..`
- Заходим во фронтенд `cd frontend`
- `npm i`
- После установки зависимостей запускаем `npm run dev`
