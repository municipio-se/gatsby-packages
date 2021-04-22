export default {
  base: {
    lineHeight: {
      min: "1.25rem",
      prefered: "calc(2vw)",
      max: "1.75rem",
    },
    letterSpacing: "-0.5%",
    font: {
      family: "'IBM Plex Sans', sans-serif",
      min: "0.875rem",
      max: "1.25rem",
      prefered: "calc(0.5rem + 1vw)",
    },
  },
  displayFontFamily: "'IBM Plex Sans', sans-serif",
  color: {
    divider: "#e3ebf1",
    background: "#fff",
    foreground: {
      default: "#282a30",
      inverse: "#fff",
    },
    active: {
      default: "#0070c9",
      foreground: "#fff",
    },
    inactive: "#565656",
    interactive: "var(--color-active)",
    transparent: "transparent",
    surface: "#525c63",
    success: "#36b37e",
    warning: "#ffab00",
    info: "#0065ff",
    error: "#de350b",
    danger: "#de350b",
    blue: {
      default: 204,
      tint: {
        5: "hsla(var(--color-blue), 84%, 31%, 10%)",
        4: "hsla(var(--color-blue), 84%, 31%, 20%)",
        1: "hsla(var(--color-blue), 84%, 31%, 80%)",
      },
      normal: "hsla(var(--color-blue), 84%, 31%, 100%)",
      shade: {
        1: "hsla(var(--color-blue), 84%, 25%, 100%)",
        4: "hsla(var(--color-blue), 81%, 6%, 100%)",
        5: "hsla(var(--color-blue), 81%, 3%, 100%)",
      },
    },
    green: {
      default: 90,
      tint: {
        5: "hsla(var(--color-green), 57%, 37%, 10%)",
        4: "hsla(var(--color-green), 57%, 37%, 20%)",
        1: "hsla(var(--color-green), 57%, 37%, 80%)",
      },
      normal: "hsla(var(--color-green), 57%, 37%, 100%)",
      shade: {
        1: "hsla(var(--color-green), 57%, 30%, 100%)",
        4: "hsla(var(--color-green), 58%, 7%, 100%)",
        5: "hsla(var(--color-green), 58%, 4%, 100%)",
      },
    },
    yellow: {
      default: 46,
      tint: {
        5: "hsla(var(--color-yellow), 100%, 47%, 10%)",
        4: "hsla(var(--color-yellow), 100%, 47%, 20%)",
        1: "hsla(var(--color-yellow), 100%, 47%, 80%)",
      },
      normal: "hsla(var(--color-yellow), 100%, 47%, 100%)",
      shade: {
        1: "hsla(var(--color-yellow), 100%, 38%, 100%)",
        4: "hsla(var(--color-yellow), 100%, 9%, 100%)",
        5: "hsla(var(--color-yellow), 100%, 5%, 100%)",
      },
    },
    orange: {
      default: 27,
      tint: {
        5: "hsla(var(--color-orange), 97%, 42%, 10%)",
        4: "hsla(var(--color-orange), 97%, 42%, 20%)",
        1: "hsla(var(--color-orange), 97%, 42%, 80%)",
      },
      normal: "hsla(var(--color-orange), 97%, 42%, 100%)",
      shade: {
        1: "hsla(var(--color-orange), 98%, 33%, 100%)",
        4: "hsla(var(--color-orange), 95%, 8%, 100%)",
        5: "hsla(var(--color-orange), 95%, 4%, 100%)",
      },
    },
    pink: {
      default: 340,
      tint: {
        5: "hsla(var(--color-pink), 97%, 35%, 10%)",
        4: "hsla(var(--color-pink), 97%, 35%, 20%)",
        1: "hsla(var(--color-pink), 97%, 35%, 80%)",
      },
      normal: "hsla(var(--color-pink), 97%, 35%, 100%)",
      shade: {
        1: "hsla(var(--color-pink), 97%, 27%, 100%)",
        4: "hsla(var(--color-pink), 94%, 7%, 100%)",
        5: "hsla(var(--color-pink), 94%, 3%, 100%)",
      },
    },
    neutral: {
      default: 204,
      tint: {
        5: "hsla(var(--color-neutral), 35%, 35%, 10%)",
        4: "hsla(var(--color-neutral), 35%, 35%, 20%)",
        2: "hsla(var(--color-neutral), 35%, 35%, 60%)",
        1: "hsla(var(--color-neutral), 35%, 35%, 80%)",
      },
      normal: "hsla(var(--color-neutral), 35%, 34%, 100%)",
      shade: {
        1: "hsla(var(--color-neutral), 35%, 28%, 100%)",
        2: "hsla(var(--color-neutral), 35%, 21%, 100%)",
        4: "hsla(var(--color-neutral), 37%, 7%, 100%)",
        5: "hsla(var(--color-neutral), 33%, 4%, 100%)",
      },
    },
  },
  sidebar: {
    background: "#fff",
    link: "#282a30",
    hover: "#e3e6eb",
    icon: "#404450",
    z: {
      default: 101,
      overlay: 100,
    },
    headerHeight: "56px",
  },
  menuIcon: "#4a4d59",
  toolbar: {
    background: "rgba(255, 255, 255, 0.8)",
    height: "56px",
  },
  form: {
    search: {
      background: "#f1f3f5",
      surface: "#313741",
      border: "transparent",
    },
  },
  logo: {
    foreground: "#b0bfc9",
    background: "#ebeff1",
  },
  mainMaxWidth: "64rem",
  gap: {
    min: "1rem",
    medium: "1.5rem",
    max: "2rem",
    default: "1.25rem",
  },
  space: {
    4: "0.25rem",
    8: "0.5rem",
    12: "0.75rem",
    14: "0.875rem",
    16: "1rem",
    24: "1.5rem",
    32: "2rem",
    40: "2.5rem",
    48: "3rem",
    56: "3.5rem",
    64: "4rem",
  },
  box: {
    background: "gainsboro",
    // border: "",
    // borderRadius: "",
    // color: "",
    // fontSize: "",
    padding: "1rem",
  },
};
