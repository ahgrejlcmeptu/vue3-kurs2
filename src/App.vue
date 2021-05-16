<template>
  <div class="container column">
    <form class="card card-w30" @submit.prevent="createSummary">
      <app-select
        label="Тип блока"
        v-model:value="name"
        :options="selectOptions"
      ></app-select>
      <app-textarea
        label="Значение"
        v-model:value="text"
      ></app-textarea>
      <app-button
        :disabled="isDisabled"
        color="primary"
      >Добавить</app-button>
    </form>

    <div class="card card-w70">
      <app-loader v-if="loaderSummary" color="_dark"></app-loader>
      <h3 v-else-if="!components.length">Добавьте первый блок, чтобы увидеть результат</h3>
      <div v-else>
        <component
          v-for="item in components"
          :data-text="item.data"
          :is="item.name"
          :data="item.data"
        ></component>
      </div>
    </div>
  </div>
  <div class="container">
    <p v-if="!loader && !commentsList.length && !alert">
      <app-button
        color="primary"
        @action="loadComments"
      >Загрузить комментарии</app-button>
    </p>
    <app-loader v-if="loader"></app-loader>
    <app-comment-list
      :comments="commentsList"
      v-if="commentsList.length || alert"
      :alert="alert"
    ></app-comment-list>
  </div>
</template>

<script>
import AppCommentList from "./AppCommentList";
import AppLoader from "./AppLoader";
import AppButton from "./AppButton";
import AppTextarea from "./AppTextarea";
import AppSelect from "./AppSelect";

export default {
  data () {
    return {
      loaderSummary: false,
      loader: false,
      name: 'title',
      text: '',
      commentsList: [],
      alert: null,
      components: [],
      selectOptions: [
        {
          value: 'title',
          title: 'Заголовок'
        },
        {
          value: 'subtitle',
          title: 'Подзаголовок'
        },
        {
          value: 'avatar',
          title: 'Аватар'
        },
        {
          value: 'text',
          title: 'Текст'
        }
      ],
      url: 'https://summatydata-default-rtdb.firebaseio.com/summary.json'
    }
  },
  mounted() {
    this.loadSummary()
  },
  methods: {
    loadComments () {
      let url = 'https://jsonplaceholder.typicode.com/comments?_limit=42'
      this.loader = true
      setTimeout(async ()=> {
        try {
          const response = await fetch(url, {
            method: 'GET',
          })

          let result = await response.json()
          if (!result.length) {
            throw new Error("Комментарий нет")
          }
          this.commentsList = result

        } catch (e) {
          this.alert = e.name === 'SyntaxError' ? 'что то пошло не так' : e.message
          console.log(e.name)
        }
        this.loader = false
      }, 1500)
    },
    async createSummary () {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'summary-' + this.name,
          data: this.text
        })
      })

      const firebaseData = await response.json()

      this.components.push({
        name: 'summary-' + this.name,
        data: this.text,
        id: firebaseData.name
      })

      this.name = 'title'
      this.text = ''

    },
    async loadSummary () {
      this.loaderSummary = true
      try {
        const response = await fetch(this.url, {
          method: 'GET',
        })
        let result = await response.json()

        if (!result) {
          throw new Error("Резюму пустое")
        }

        this.components = Object.keys(result).map(key => {
          return {
            id: key,
            ...result[key]
          }
        })


      } catch (e) {
        console.log(e.message)
      }
      this.loaderSummary = false
    }
  },
  computed: {
    isDisabled () {
      return this.text.length < 4
    }
  },
  components: {
    AppCommentList,
    AppLoader,
    AppButton,
    AppTextarea,
    AppSelect
  }
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
