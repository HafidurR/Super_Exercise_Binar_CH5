# `Microservices Exercise`

## `Directions`
- Diketahui perusahaan bernama `Feugeseot` memiliki 2 lini bisnis utama, yaitu produksi `cars` dan `trucks`.
***
- Pada produksi `cars`, setiap `car` pasti memiliki 1 `car_type`, sementara sebaliknya, `car_type` bisa ada di banyak `car`.
- Sedangkan pada produksi `trucks` tidak memiliki `truck_type`, semuanya sama saja.
***
- Buatlah microservices untuk masing-masing lini produksi. Perhatikan bahwa baik di `cars` maupun `trucks` wajib memiliki attribute seperti `name` berupa string, `code` berupa string yang unik, `number_of_gears` berupa integer, dan `number_of_tires` berupa integer.
***
- Buatlah simple CRUD server application untuk `cars` dan `trucks` dan koneksikan dengan 1 orchestrator.
***
- Pada orchestrator tersebut, buatlah beberapa unique API yang `endpoint` nya didahulukan dengan `/feugeseot/{nama_service}`, yang wajib memiliki beberapa API seperti:
    - Data semua `cars` dan `trucks` pada 1 panggilan API, implementasikan juga fitur `search` yang mencari atau melakukan filterisasi tampilan data `cars` dan `trucks` sesuai kolom `name` masing-masing dan fitur `pagination`.
    - Data semua `cars` dan wajib memiliki fitur `pagination`.
    - Data semua `trucks` dan wajib memiliki fitur `pagination`.
    - Membuat `car`.
    - Mengupdate `truck`.
    - Melakukan penghapusan `car` dan `truck`.
***
## `Restrictions`
- Wajib menggunakan Sequelize pada masing-masing service.