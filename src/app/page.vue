<script setup lang="ts">
import L, { Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css';

const marker = ref<Marker>()

onMounted(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker.value = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('Lokasi anda saat ini.')
      .openPopup()


    map.on('click', function (e) {
      if (marker.value) {
        map.removeLayer(marker.value)
      }

      marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
    })

  }, function (error) {
    var map = L.map('map').setView([
      -6.200000,
      0.300000
    ], 13);

    map.on('click', function (e) {
      if (marker.value) {
        map.removeLayer(marker.value)
      }

      marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
    })
  })


})
</script>

<template>
  <nav>
    <div class="max-w-screen-xl w-full mx-auto flex justify-between h-16 items-center px-3">
      <div class="text-primary font-bold text-2xl">
        SIGAP
      </div>
      <div>
        <ul class="flex gap-4 items-center">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/data">Data</router-link>
          </li>
          <li>
            <router-link to="/service">Layanan</router-link>
          </li>
          <li>
            <n-button type="primary">Masuk</n-button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="flex flex-col-reverse md:flex-row max-w-screen-xl mx-auto py-10 px-3">
    <div class="py-20 space-y-5">
      <div class="text-3xl font-semibold">
        Sistem Informasi
        Tanggap Peristiwa
      </div>
      <div>
        Sigap merupakan sistem informasi untuk melaporkan kejadian di lingkungan uns, baik kejadian alam maupun non alam.
      </div>
      <div>
        <n-button type="primary">
          Laporkan Peristiwa
        </n-button>
      </div>
    </div>
    <div class="h-full">
      <img class="min-h-[40rem] object-contain" src="@/assets/images/hero.png" alt="">
    </div>
  </div>
  <section class=" bg-primary text-white relative px-3">
    <div class="max-w-screen-xl mx-auto py-10 flex flex-col md:flex-row justify-between gap-10 ">
      <div class="md:w-1/2">
        <div class="text-2xl font-semibold mb-5">
          Bagaimana Sigap
          Membantu Menyelesaikan Laporan Anda ?
        </div>
        <div>
          <n-steps vertical :current="1" status="process" class="!text-white">
            <n-step>
              <template #title>
                <div class="text-white">
                  Tulis Laporan
                </div>
              </template>
            </n-step>
            <n-step title="Verifikasi" />
            <n-step title="Proses Tindak Lanjut" />
            <n-step title="Selesai" />
          </n-steps>
        </div>
      </div>
      <div class="md:w-1/2 md:absolute right-0">
        <div class="text-xl font-semibold mb-5">
          Sampaikan Laporan Anda
        </div>
        <n-card class="absolute max-w-2xl">
          <form action="">
            <n-form-item label="Nama">
              <n-input />
            </n-form-item>
            <n-form-item label="Email">
              <n-input />
            </n-form-item>
            <n-form-item label="No. Handphone">
              <n-input />
            </n-form-item>
            <n-form-item label="Fakultas">
              <n-input />
            </n-form-item>
            <n-form-item label="Jenis Laporan">
              <n-input />
            </n-form-item>
            <n-form-item label="Tanggal">
              <n-date-picker class="w-full" />
            </n-form-item>
            <n-form-item label="Lokasi">
              <div id="map" class="w-full h-96"></div>
            </n-form-item>
            <n-form-item label="Deskripsi Laporan">
              <n-input type="textarea" />
            </n-form-item>
            <n-form-item label="Foto ">
              <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5">
                <n-upload-dragger>
                  <n-text style="font-size: 16px">
                    Click or drag a file to this area to upload
                  </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0">
                    Strictly prohibit from uploading sensitive information. For example,
                    your bank card PIN or your credit card expiry date.
                  </n-p>
                </n-upload-dragger>
              </n-upload>
            </n-form-item>
            <div class="mb-5">
              <n-checkbox>
                Laporan ini saya buat sesuai dengan kondisi kejadian yang sesungguhnya
              </n-checkbox>
            </div>
            <n-button type="primary" block>
              Kirim Laporan
            </n-button>
          </form>
        </n-card>
      </div>
    </div>
  </section>
  <div class="max-w-screen-xl mx-auto pb-20 px-3">
    <div class="font-semibold py-5 ">
      Foto Dokumentasi
    </div>
    <div class="grid grid-cols-3 md:w-1/2 gap-5 pr-5">
      <n-image v-for="i in 9" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    </div>
  </div>
  <div class="bg-primary text-white py-10 sticky mt-96">
    <div class="max-w-screen-xl mx-auto grid gap-4 md:grid-cols-3 px-3">
      <div>
        <div class="flex gap-5">
          <img src="@/assets/images/uns.png" alt="">
          <img src="@/assets/images/sv.png" alt="">
          <img src="@/assets/images/d3ti.png" alt="">
        </div>
        <div class="text-3xl font-bold">
          SIGAP
        </div>
        <div>
          Sistem Informasi Tanggap Peristiwa
        </div>
      </div>
      <div>
        <div class="text-xl">
          Kontak
        </div>
        <ul>
          <li>
            (+62)89 xxxx xxxx xxx
          </li>
          <li>
            (+62)89 xxxx xxxx xxx
          </li>
        </ul>
      </div>
      <div>
        <div class="text-xl">
          Alamat
        </div>
        <div>
          Jl. Jend. Urip Sumoharjo No.112, Purwodiningratan, Kec. Jebres, Kota Surakarta, Jawa Tengah 57129
        </div>
      </div>
    </div>
  </div>
</template>
