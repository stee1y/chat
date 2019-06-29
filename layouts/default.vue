<template>
  <v-app app dark>
    <v-navigation-drawer stateless app v-model="drawer" width="250" mobile-break-point="500">
      <v-list subheader>
        <v-subheader>
          <h2>Users:</h2>
        </v-subheader>

        <v-list-tile v-for="u in users" :key="u.id">
<!--&lt;!&ndash;          <v-list-tile-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;            <img :src="item.avatar">&ndash;&gt;-->
<!--&lt;!&ndash;          </v-list-tile-avatar>&ndash;&gt;-->

          <v-list-tile-content>
            <v-list-tile-title>
                <h3>{{u.name}}</h3>
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Room: {{user.room}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
export default {
    data: () => ({
      drawer: false
    }),
    computed: mapState(['user', 'users']),
  methods: {
      ...mapMutations(['clearData']),
      exit() {
          this.$socket.emit('userExit', this.user.id, () => {
              this.$router.push('/?message=youExitChat')
              this.clearData()
          })
      }
  }
};
</script>
