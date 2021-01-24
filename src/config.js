const isDev = process.env.NODE_ENV !== "production"
export default {
    API_ENDPOINT:  isDev  ? 'http://localhost:8000/api': "https://sleepy-stream-22621.herokuapp.com/api",
    API_KEY: '$2a$10$5a.oG5wjGK0C5doPBbKixuEEY6K.VfCMHmr3Dnc8aA9vf0Ws4oxHG'
  }