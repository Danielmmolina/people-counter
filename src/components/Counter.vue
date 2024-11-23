<template>
  <div>
    <!-- Titulo -->
    <div class="d-flex text-light fs-1 mt-5 justify-content-between">
      <p>Contador manual <br />de personas</p>
      <span class="d-none d-md-block"><br />________________________________________________</span>
    </div>

    <div class="container mt-5">
      <div class="row justify-content-center">
            <div class="card custom-card">
              <div class="card-body text-center mt-3 text-light">
                <h2 class="fs-2 fw-light">Personas que han ingresado</h2>
                <div class="position-absolute top-50 start-50 translate-middle">
                  <h1 class="display-1 fw-semibold txt-number">
                    {{ counterStore.count }}
                  </h1>
                </div>
              </div>
              <div class="position-absolute top-100 start-50 translate-middle d-flex w-75 justify-content-between">
                <button class="btn rounded-circle custom-btn btn-lg text-light" style="width: 60px; height: 60px;"
                  @click="addCount(1)">
                  +1
                </button>
                <button class="btn rounded-circle custom-btn btn-lg text-light" style="width: 60px; height: 60px;"
                  @click="subCount(1)">
                  -1
                </button>
              </div>
          </div>
            <div class="card custom-card">
              <div class="card-body text-center mt-3 text-light">
                <h2 class="fs-2 fw-light">Personas que han ingresado</h2>
                <div class="position-absolute top-50 start-50 translate-middle">
                  <h1 class="display-1 fw-semibold txt-number">
                    {{ counterStore.count_in }}
                  </h1>
                </div>
              </div>
          </div>
            <div class="card custom-card">
              <div class="card-body text-center mt-3 text-light">
                <h2 class="fs-2 fw-light">Personas que han salido</h2>
                <div class="position-absolute top-50 start-50 translate-middle">
                  <h1 class="display-1 fw-semibold txt-number">
                    {{ counterStore.count_out }}
                  </h1>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";

import { useCounterStore } from "../stores/counter.js";
import { socket } from "../services/socket.js";

const counterStore = useCounterStore();
const counter = computed(() => counterStore.count);

const addCount = (quantity) => counterStore.fetchCount("manual-add", quantity);
const subCount = (quantity) => counterStore.fetchCount("manual-sub", quantity);

onMounted(() => {
  socket.on("welcome", (data) => {
    counterStore.count = data.current_aforo;
    counterStore.count_in = data.counting_in;
    counterStore.count_out = data.counting_out;
    console.log("Conexión realizada");
  });

  socket.on("raw", (data) => {
    console.log("Contador actualizado");
  });

  socket.on("summary", (data) => {
    console.log("'summary' ejecutado");
  });

  socket.on("heartbeat", (data) => {
    console.log("Conexión activa");
  });
});

onUnmounted(() => {
  socket.off("disconnect");
  console.log("Eventos de socket desmontados");
});
</script>

<style scoped>
.custom-div {
  margin-top: 5rem;
}

.custom-card {
  height: 25rem;
  width: 20rem;
  margin: 10px;
  border-radius: 30px;
  background-color: #203364;
}

.custom-btn {
  background-color: #0d162e;
  margin-bottom: 5rem;
}
</style>