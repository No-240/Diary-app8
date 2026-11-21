# Diary-app8
# Cara Menjalankan
npm install
npx expo start

## Perbedaan Local State, Global Redux State, dan Persistent Database
# 1. Local State
local state adalah state yang hanya dibutuhkan oleh suatu komponen maupun halaman misal pada projek ini adalah isi "TextInput" pada judul dan isi diary di halaman tambah dan edit, selain itu ada juga mood dan filter mood. Local state akan hilang ketika komponen di unmount karena disimpan di komponen itu.

# 2. Global Redux State
kebalikannya dengan local state, global redux state adalah state yang digunakan oleh banyak halaman, global redux state dismpan di lewat redux store dan diubah di dispatch yang diproses oleh reducer. Pada implementasi projek ini dipakai pada daftar diary dan status favorit setiap diary. karena redux store berada di memori aplikasi maka ketika aplikasi di reload atau ditutup memori akan kembali ke initialState.

# 3. Persistent Database
persistent database adalah penyimpanan permanen yang digunakan diluar memori aplikasi misal MySQL jadi ketika aplikasi di reload atau ditutup memori atau seperti card yang sudah dibuat tidak akan hilang.

Maka dari itu kita dapat menyimpulkan bahwa perbedaan antara local state, global redux state, dan persistent database adalah tempat penyimpanannya yang berbeda.