echo "🔄 Installing and starting backend..."
cd backend || exit
npm install
echo "▶️ Backend at http://localhost:3306"
nodemon app.js &

echo "✅ You are done! Open frontend/index.html in your browser."

echo "🔄 Installing frontend dependencies..."
cd ../frontend || exit
npm install
echo "📦 Building the Angular frontend..."
ng build --prod
echo "▶️ Frontend running at http://localhost:4200"
ng serve --open

echo "✅ You are done! Backend and frontend are running."