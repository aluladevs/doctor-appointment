module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F2F8FF",
          300: "#5BA5FF",
          DEFAULT: "#0071FF"
        },
        success: {
          light: "#CDF5EA",
          DEFAULT: "#26C095"
        },
        warning: {
          light: "#FCEDCB",
          DEFAULT: "#F4C146"
        },
        error: {
          light: "#FFEAEA",
          DEFAULT: "#D00000"
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
