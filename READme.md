# bookShelfProject

Halo semuanya! ini adalah proyek Bookshelf API yaitu proyek mengenai pembuatan web server beserta API yang terkait dengan basic operasi dalam CRUD (Create, Read, Update, Delete)
dari suatu rak buku. Beberapa kriteria dari proyek adalah sebagai berikut

## Kriteria 1 : API dapat menyimpan buku
  1. API yang dibuat harus dapat menyimpan buku melalui route
      Method : POST
      URL : /books
      Body Request:
                     
              {
                  "name": string,
                  "year": number,
                  "author": string,
                  "summary": string,
                  "publisher": string,
                  "pageCount": number,
                  "readPage": number,
                  "reading": boolean
              }            
   2. Objek buku yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:
        
            "id": "Qbax5Oy7L8WKf74l",
            "name": "Buku A",
            "year": 2010,
            "author": "John Doe",
            "summary": "Lorem ipsum dolor sit amet",
            "publisher": "Dicoding Indonesia",
            "pageCount": 100,
            "readPage": 25,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-04T09:11:44.598Z",
            "updatedAt": "2021-03-04T09:11:44.598Z"
        
     Properti "id", "finished" dan "updatedAt" didapatkan di sisi server. Berikut penjelasannya:
     - id : nilai id haruslah unik.
     - finished : merupakan properti boolean yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi pageCount === readPage.
     - insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku.
     - updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.
     
   3. Server harus merespons gagal bila: 
     a. Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 400
        Response Body:
        
                 {
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
                 }
                 
     b. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 400
        Response Body:
        
                {
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
                }
                
     c. Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan:
        Status Code : 500
        Response Body:
        
          {
              "status": "error",
              "message": "Buku gagal ditambahkan"
          }
                
   4. Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan: 
       Status Code : 201
       Response Body:
       
            {
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                "data": {
                    "bookId": "1L7ZtDUFeGs7VlEt"
                }
          }
   
## Kriteria 2 : API dapat menampilkan seluruh buku
   1. API yang dibuat harus dapat menampilkan seluruh buku yang disimpan melalui route.
      Method : GET
      URL: /books
      
   2. Server harus mengembalikan respons dengan: 
      Status Code : 200
      Response Body:   
      
          {
                  "status": "success",
                  "data": {
                      "books": [
                          {
                              "id": "Qbax5Oy7L8WKf74l",
                              "name": "Buku A",
                              "publisher": "Dicoding Indonesia"
                          },
                          {
                              "id": "1L7ZtDUFeGs7VlEt",
                              "name": "Buku B",
                              "publisher": "Dicoding Indonesia"
                          },
                          {
                              "id": "K8DZbfI-t3LrY7lD",
                              "name": "Buku C",
                              "publisher": "Dicoding Indonesia"
                          }
                      ]
                  }
              } 
      
    3. Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.
        {
            "status": "success",
            "data": {
                "books": []
            }
        }    
      
 ## Kriteria 3 : API dapat menampilkan detail buku      
    1. API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:
        Method : GET
        URL: /books/{bookId}
        
    2. Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server harus mengembalikan respons dengan:
        Status Code : 404
        Response Body:

        {
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }
        
    3. Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan:
        Status Code : 200
        Response Body:

        {
            "status": "success",
            "data": {
                "book": {
                    "id": "aWZBUW3JN_VBE-9I",
                    "name": "Buku A Revisi",
                    "year": 2011,
                    "author": "Jane Doe",
                    "summary": "Lorem Dolor sit Amet",
                    "publisher": "Dicoding",
                    "pageCount": 200,
                    "readPage": 26,
                    "finished": false,
                    "reading": false,
                    "insertedAt": "2021-03-05T06:14:28.930Z",
                    "updatedAt": "2021-03-05T06:14:30.718Z"
                }
              }
          }    
          
 ## Kriteria 4 : API dapat mengubah data buku
    1. API yang dibuat harus dapat mengubah data buku berdasarkan "id" melalui route: 
        Method : PUT
        URL : /books/{bookId}
        Body Request:

              {
                  "name": string,
                  "year": number,
                  "author": string,
                  "summary": string,
                  "publisher": string,
                  "pageCount": number,
                  "readPage": number,
                  "reading": boolean
              }
    2. Server harus merespons gagal bila:

      a. Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
          Status Code : 400
          Response Body:

                  {
                      "status": "fail",
                      "message": "Gagal memperbarui buku. Mohon isi nama buku"
                  }
                  
      b. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
          Status Code : 400
          Response Body:

                  {
                      "status": "fail",
                      "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
                  }
      c. Id yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan:
          Status Code : 404
          Response Body:

                  {
                      "status": "fail",
                      "message": "Gagal memperbarui buku. Id tidak ditemukan"
                  }
    3. Bila buku berhasil diperbarui, server harus mengembalikan respons dengan:

        Status Code : 200
        Response Body:

                {
                    "status": "success",
                    "message": "Buku berhasil diperbarui"
                }
                
 ## Kriteria 5 : API dapat menghapus buku
    1. API yang Anda buat harus dapat menghapus buku berdasarkan id melalui route berikut:

        Method : DELETE
        URL: /books/{bookId}
      
    2. Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut:

        Status Code : 404
        Response Body:

                {
                    "status": "fail",
                    "message": "Buku gagal dihapus. Id tidak ditemukan"
                }
    3. Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut:

        Status Code : 200
        Response Body:

                {
                    "status": "success",
                    "message": "Buku berhasil dihapus"
                }
              
 ## Kriteria 6 :  melalui fitur query parameter pada route GET /books 
    1. melalui fitur query parameters ini, maka pada route GET /books dapat menampilkan seluruh isi buku dengan ketentuan sebagai berikut.
        ?name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. Contoh /books?name=”dicoding”, 
                maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive  (tidak peduli besar dan kecil 
                huruf).
        ?reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang 
                   sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.
        ?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan 
                    buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.           