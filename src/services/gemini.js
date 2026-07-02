import { ref } from 'vue'
import { GoogleGenAI } from '@google/genai'
import { useBooksStore } from '../stores/books'

// Initialize client. Secure your VITE_GEMINI_API_KEY in your deployment platform console.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })


export function useBookstoreAI() {
  const messages = ref([
    { 
      role: 'model', 
      parts: [{ text: "Welcome to Soma Online! 📚 I'm your digital reading assistant. Ask me for book recommendations, reading tips, or insights on your favorite genres!" }] 
    }
  ])
  const isLoading = ref(false)

const books= useBooksStore().books
const catalog = Object.values(books).map(b => `"${b.name}" by ${b.author} (${b.genre})`).join(', ')

  // Guardrails to lock the model into a bookstore domain
  const systemInstruction = `
    You are an expert AI literary assistant for "Soma Online", an online bookstore. 
    Your primary goals are to:
    1. Recommend books based on user preferences (genres, mood, favorite authors, themes).
    2. Provide practical reading tips (e.g., how to build a reading habit, overcoming reading slumps, speed reading basics).
    3. Share brief, spoiler-free summaries and historical contexts of books and literary movements.
    
    Our actual store inventory is: [${catalog}].
    Prioritize recommending books from this list whenever a user asks for general recommendations.

    Strict Guidelines:
    - Keep answers highly engaging, concise, and bookish in tone.
    - If a user asks about anything unrelated to books, literature, writing, or reading habits, politely decline and redirect them to books.
    - Organize book lists clearly using formatting like title titles, authors, and brief reasons why they should read it.
  `

  async function sendMessage(userText) {
    if (!userText.trim()) return
    
    messages.value.push({ role: 'user', parts: [{ text: userText }] })
    isLoading.value = true

    try {
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction }
      })

      const response = await chatSession.sendMessage({ message: userText })
      
      messages.value.push({
        role: 'model',
        parts: [{ text: response.text }]
      })
    } catch (error) {
      console.error("Bookstore AI Error:", error)
      messages.value.push({
        role: 'model',
        parts: [{ text: "Oops! My pages got stuck. Please try sending your message again." }]
      })
    } finally {
      isLoading.value = false
    }
  }

  return { messages, isLoading, sendMessage }
}