Jalankan migrasi Supabase untuk menambahkan kolom/tabel baru

Prasyarat:
- Supabase CLI terpasang (https://supabase.com/docs/guides/cli)
- Anda memiliki `VITE_SUPABASE_URL` dan `VITE_SUPABASE_PUBLISHABLE_KEY` serta akses ke project Supabase

Opsi A — pakai Supabase CLI (direkomendasikan):
1. Masuk ke root repo dan login supabase:

```bash
supabase login
```

2. Set project untuk menjalankan migration (ganti <PROJECT_REF> dengan ref project Anda):

```bash
supabase link --project-ref <PROJECT_REF>
```

3. Jalankan semua migration file di folder `supabase/migrations`:

```bash
supabase db reset --confirm <PROJECT_REF>
# atau jika tidak mau reset, jalankan migrate
supabase db push
```

Catatan: `supabase db reset` akan menghapus data; gunakan dengan hati-hati. Untuk hanya menjalankan migration baru, gunakan `supabase db push`.

Opsi B — pakai psql langsung (jika Anda punya URL DB dan role yang sesuai):
1. Export DATABASE_URL (dapatkan dari Supabase > Settings > Database > Connection string)

```bash
export DATABASE_URL="postgresql://..."
```

2. Jalankan setiap file .sql di `supabase/migrations`:

```bash
for f in supabase/migrations/*.sql; do psql "$DATABASE_URL" -f "$f"; done
```

Setelah migrasi:
- Pastikan bucket Storage `media` dibuat di Supabase (Settings > Storage > New bucket) dan atur akses jika perlu (public/private).
- Jalankan aplikasi dev:

```bash
pnpm install # atau npm install
pnpm dev
```

Jika mau, saya bisa membuat skrip npm di `package.json` untuk mengeksekusi migration dengan satu perintah (catatan: tetap membutuhkan akses/credential lokal).