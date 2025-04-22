echo "🔄 Installing and starting backend..."
cd backend || exit
npm install
echo "▶️ Backend at http://localhost:3306"
nodemon app.js &

echo "✅ You are done! Open frontend/index.html in your browser."