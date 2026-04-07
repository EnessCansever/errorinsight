# ErrorInsight

Junior seviyeye uygun bir full stack proje iskeleti.

## Teknolojiler
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express.js

## Kurulum
1. Kök dizindeki `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli alanları doldurun.
2. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
3. Backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`

## API İskeleti
- `POST /api/analyze`
- `GET /api/history`

## Not
Backend için gerekli env değişkenleri:
- `PORT`
- `MONGODB_URI`
- `GEMINI_API_KEY`
- `GEMINI_MODEL` (isteğe bağlı, varsayılan: `gemini-2.5-flash`)

MongoDB için örnek URI:
- `mongodb://127.0.0.1:27017/errorinsight`