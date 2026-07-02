<script setup>
import { ref, nextTick, watch } from 'vue'
import { useBookstoreAI } from '../services/gemini'

const { messages, isLoading, sendMessage } = useBookstoreAI()
const userInput = ref('')
const showChips = ref(true)

const suggestedChips = ref([
  { label: 'Recommend a Sci-Fi', prompt: 'Can you recommend a great sci-fi book from your store?', icon: 'mdi-rocket-launch' },
  { label: 'Beat Reading Slump', prompt: 'I have a bad reading slump. What are your best reading tips to fix it?', icon: 'mdi-emoticon-sad' },
  { label: 'Quick Short Reads', prompt: 'Show me fast or short book recommendations for a busy week.', icon: 'mdi-clock-fast' },
  { label: 'Building Habits', prompt: 'How can I build a consistent daily reading habit?', icon: 'mdi-calendar-check' }
])
async function handleChipClick(promptText) {
  if (isLoading.value) return
  userInput.value = promptText
  showChips.value = false
  await handleSend()
}

async function handleSend() {
  if (!userInput.value.trim()) return
  const text = userInput.value
  userInput.value = '' 
  showChips.value = false
  await sendMessage(text)
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    const element = document.querySelector('.chat-window')
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  })
}

watch(messages, () => scrollToBottom(), { deep: true })

</script>

<template>
  <v-container class="chat-container">
    <v-card class="mx-auto" max-width="400" elevation="4">
        <v-card-title class="bg-primary align-center">
            <v-icon icon="mdi-book-open-page-variant"></v-icon>
            Soma Online Literary Guide
        </v-card-title>

        <v-card-text class="chat-window overflow-y-auto pa-4" style="height: 420px;">
            <div v-for="(msg, index) in messages" :key="index" :class="['d-flex mb-4', msg.role === 'user' ? 'justify-end' : 'justify-start']" >
                <v-chip
                    :color="msg.role === 'user' ? 'primary' : 'secondary'"
                    :text-color="msg.role === 'user' ? 'white' : 'black'"
                    class="pa-3 chat-bubble"
                    style="height: auto; max-width: 85%; white-space: pre-wrap;"
                >
                    {{ msg.parts[0].text }}
                </v-chip>
            </div>
            <div v-if="isLoading" class="d-flex justify-start mb-4">
                <v-progress-circular indeterminate color="brown" size="24"></v-progress-circular>
            </div>
        </v-card-text>

        <v-divider></v-divider>
        <div v-if="showChips" class="px-4 pt-3 bg-grey-lighten-4">
            <div class="text-caption mb-1">Suggested Topics:</div>
            <div class="d-flex flex-wrap ga-2 pb-1">
                <v-chip
                    v-for="(chip, index) in suggestedChips"
                    :key="index" :disabled="isLoading" color="primary" variant="outlined" size="small" class="action-chip"
                    @click="handleChipClick(chip.prompt)"
                >
                    <v-icon :icon="chip.icon" size="14"></v-icon>
                    {{ chip.label }}
                </v-chip>
            </div>
        </div>

      <v-card-actions class="pa-3">
        <v-text-field
          v-model="userInput"
          label="Ask for sci-fi lists, reading tips..."
          variant="outlined"
          density="compact"
          hide-details
          append-inner-icon="mdi-send"
          @click:append-inner="handleSend"
          @keyup.enter="handleSend"
          :disabled="isLoading"
        ></v-text-field>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
    .chat-window {
    background-color: #fbf9f6; /* Warm page-like background */
    display: flex;
    flex-direction: column;
    }
    .chat-bubble {
    border-radius: 16px !important;
    font-size: 0.95rem;
    line-height: 1.4;
    }
</style>