<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
    <v-card min-width="300">

      <v-snackbar
              v-model="snackbar"
              :timeout="5000"
              top
      >
        {{ message }}
        <v-btn
                color="pink"
                flat
                @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>

      <v-card-title>
        <h1>X-chat</h1>
      </v-card-title>
      <v-card-text>

        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
          <v-text-field
                  v-model="name"
                  :counter="16"
                  :rules="nameRules"
                  label="You name"
                  required
          ></v-text-field>

          <v-text-field
                  v-model="room"
                  :rules="roomRules"
                  label="Enter room"
                  required
          ></v-text-field>

          <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="submit"
          >
            To come in
          </v-btn>

        </v-form>
      </v-card-text>


    </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex'
  export default {
    layout: "empty",
    head: {
      title: 'X-chat'
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
      }
    },
    data: () => ({
      valid: true,
      snackbar: false,
      message: '',
      name: '',
      nameRules: [
        v => !!v || 'Enter name',
        v => (v && v.length <= 16) || 'Name must be less than 16 characters'
      ],
      room: '',
      roomRules: [v => !!v || 'Enter room']
    }),

    mounted() {
      const {message} = this.$route.query
      if (message === 'noUsers') {
          this.message = 'Enter data'
      } else if (message === 'youExitChat') {
        this.message = 'You left the chat'
      }

      this.snackbar = !!this.message;
    },

    methods: {
      ...mapMutations(["setUser"]),
      submit () {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.$socket.emit('addUser', user, data => {
            if (typeof data === 'string') {
              console.error(data)
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat')
            }
          })
        }
      }
    }
  }
</script>