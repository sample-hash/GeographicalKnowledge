<template>
  <div id="app">
    <div class="quesBlock">
      <h2>{{ headline }}</h2>
      <QuestionsBlock />
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      headline: 'Sprawdź swoją wedzę na temat stolic!',
    }
  }
}
</script>

<style>
body{
  background: #f5f5f5;
}
#app {
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222222;
  margin-top: 50px;
}
.quesBlock{
  box-shadow: 0 5px 15px rgba(0,0,0,.5);
  padding: 35px 25px;
  border-radius: .6em;
  background: #f9f9f9;
  width: 50%;
  display: flex;
  flex-direction: column;
}
h2{
  text-transform: uppercase;
  margin: 10px 0px;
}
</style>
