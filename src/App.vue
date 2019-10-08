<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Simple Speech Recognizer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/odanado/simple-speech-recognizer"
        target="_blank"
      >
        <span class="mr-2">GitHub</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-layout text-center wrap>
          <v-flex xs12>
            <v-btn @click="onClick">start</v-btn>
          </v-flex>
          <v-flex xs12>
            <p v-for="(result, index) in state.results" :key="index">
              {{ result.transcript }}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";

import HelloWorld from "./components/HelloWorld.vue";
import {
  SpeechRecognizer,
  RecognizeResult
} from "@/services/speech-recognizer";

export default createComponent({
  components: {
    HelloWorld
  },
  setup() {
    const speechRecognizer = new SpeechRecognizer({
      language: "ja"
    });
    function onClick() {
      speechRecognizer.start();
    }

    type State = { results: RecognizeResult[] };
    const state = reactive<State>({
      results: []
    });

    const text = computed<string>(() =>
      state.results.map(result => result.transcript).join(" ")
    );

    speechRecognizer.onRecognize(results => {
      state.results = results;
    });

    return {
      onClick,
      state,
      text
    };
  }
});
</script>
