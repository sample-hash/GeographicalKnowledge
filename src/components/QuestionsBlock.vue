<template>
  <div v-if="starter">
    <div>
      <h3>Podaj ilość pytań</h3>
      <input type="number" min="0" :max="datas.length" v-model="questionCount">
      <button @click="start">Rozpocznij test</button>
    </div>
    <p class="error" v-show="!(questionCount > 0 && questionCount <= datas.length)">Wprowadź wartość od 1 do {{datas.length}}</p>
  </div>
  <div v-else-if="question">
    <h3>{{questionIndex+1}}/{{questionCount}} {{question.question}}</h3>
    <ul>
      <li v-for="answer in question.answers" :key="answer.answer">
        <div class="answer-block">
          <label>
            <input type="radio" :value="answer" v-model="answer[questionIndex]">
            {{answer.answer}}
          </label>
        </div>
      </li>
    </ul>
    <div>
      <button @click="previous" :disabled="questionIndex == 0">Poprzednie pytanie</button>
      <button @click="next" v-show="!checkLast">Kolejne pytanie</button>
      <button @click="showResult" v-show="checkLast">Zakończ i zobacz wynik</button>
    </div>
  </div>
  <div v-else-if="result">
    <h3>Poprawnych odpowiedzi: {{countCorrectAnswer}}/{{questionCount}}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      datas: [],
      questionIndex: 0,
      answer: [],
      questionCount: 0,
      countCorrectAnswer: 0,
      starter: true, 
      result: false,
    };
  },
  computed: {
    question() {
      if (this.questionIndex < this.questionCount) {
        return this.datas[this.questionIndex];
      }
      return false;
    },
    checkLast() {
      if (this.questionIndex === this.questionCount - 1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    start: function() {
      if (
        !(this.questionCount <= 0) &&
        !(this.questionCount > this.datas.length)
      ) {
        this.starter = false;
      }
    },
    next: function() {
      if (this.questionIndex < this.questionCount) {
        this.questionIndex++;
      }
    },
    previous: function() {
      this.questionIndex--;
    },
    showResult: function() {
      for (var index = 0; index < this.answer.length; index++) {
        if (
          !(this.answer[index] == null) &&
          this.answer[index].status === true
        ) {
          this.countCorrectAnswer++;
        }
      }
      this.result = true;
      this.next();
    },
    mixArray: function () {
      this.datas.sort(function (el) {
        el.answers.sort(function () {
          return Math.random() - 0.5;
        });
        return Math.random() - 0.5;
      });
    },
  },
  mounted() {
    axios.get('data.json').then((response) => {
      this.datas = response.data.use;
      this.mixArray();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: center;
  margin: 0 10px;
}
.error{
  color: rgb(211, 15, 15);
  font-size: 9px;
  font-weight: 900;
}
button{
  margin: 0 10px;
}
</style>
