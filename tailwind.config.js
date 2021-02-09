module.exports = {
  purge: [],
  theme: {
    extend: {
      fontSize:{
        'pdf' : '10rem'
      },
      fontFamily:{
        "sans" : "Circular",
        "serif" : "Playfair Display"
      },
      height:{
        'svg' : "15rem",
        'metier' : "20rem",
        'cube' : "30rem",
        'img' : "15.625rem",
        'ressource' : "20rem"
      },
      width:{
        'home' : "20rem",
        'metiers' : "36rem",
        'cube' : "30rem",
        'coq-grand' : "30rem",
        'coq-petit' : "15rem",
      },
      colors:{
        'or': "#bc0f1a",
        'black' : "#3c3a3b"
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
}
