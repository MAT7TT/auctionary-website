<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        
        <h3 class="text-lg font-semibold">
            Questions
        </h3>

        <!-- Ask question -->
        <div v-if="!isOwner" class="space-y-2">
            <textarea
                v-model="newQuestion"
                :disabled="!isLoggedIn || isOwner || isEnded"
                placeholder="Ask a question about this item..."
                class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                rows="3"
            ></textarea>

            <button 
                @click="ask"
                :disabled="!isLoggedIn || isOwner || isEnded"
                class="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-pink-500 transition disabled:opacity-70"
            >
                Ask question
            </button>

            <p v-if="!isLoggedIn && !isEnded" class="text-sm text-red-500">
                Log in to ask a question.
            </p>

            <p v-if="isEnded" class="text-sm text-red-500">
                This auction has ended.
            </p>

            <p v-if="q_error" class="text-sm text-red-600">
                {{ q_error }}
            </p>
        </div>

        <!-- Questions list -->
        <div v-if="questions.length" class="space-y-4">
            <div 
                v-for="q in questions" 
                :key="q.question_id" 
                class="border rounded-lg p-4 space-y-2"
            >
            <p class="text-sm">
                    <strong>Q:</strong> {{ q.question_text }}
            </p>

            <p
                    v-if="q.answer_text"
                    class="text-sm text-gray-700"
                >
                    <strong>A:</strong> {{ q.answer_text }}
                </p>

                <!-- Owner answer -->
                <div 
                    v-if="isOwner && !q.answer_text"
                    class="space-y-2"
                >
                    <textarea
                        v-model="answers[q.question_id]"
                        placeholder="Write an answer..."
                        class="w-full border rounded-md px-3 py-2 text-sm"
                        rows="2"
                    ></textarea>

                    <button
                        @click="answer(q.question_id)"
                        class="text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-pink-500 transition"
                    >
                        Submit answer
                    </button>

                    <p v-if="a_error && activeQuestion === q.question_id" class="text-sm text-red-600">
                        {{ a_error }}
                    </p>
                </div>
            </div>
        </div>

        <p 
            v-else
            class="text-sm text-gray-500"
        >
            No questions yet.
        </p>
    </div>
</template>

<script>
import { questionService } from '../../../services/question.service'

export default {
    props: {
        item: Object,
        questions: Array,
        isOwner: Boolean
    },
    data() {
        return {
            newQuestion: "",
            answers: {},
            a_error: "",
            q_error: "",
            activeQuestion: null
        }
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem("session_token")
        },
        isEnded() {
            const now = Math.floor(Date.now() / 1000)
            return this.item.end_date <= now
        }
    },
    methods: {
        ask() {
            if (!this.newQuestion.trim()) return

            this.q_error = ""

            questionService.askQuestion(this.item.item_id, this.newQuestion)
                .then(() => {
                    this.newQuestion = ""
                    this.q_error = ""
                    this.$emit("refresh")
                })
                .catch(err => {
                    this.q_error = err.message || "Failed to submit question"
                })
        },
        answer(id) {
            const text = this.answers[id]
            if (!text) return

            this.a_error = ""
            this.activeQuestion = id

            questionService.answerQuestion(id, text)
                .then(() => {
                    this.answers[id] = ""
                    this.a_error = ""
                    this.activeQuestion = null
                    this.$emit("refresh")
                })
                .catch(err => {
                    this.a_error = err.message || "Failed to submit answer"
                })
        }
    }
}
</script>