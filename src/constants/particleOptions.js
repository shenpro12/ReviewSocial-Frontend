const particlesOptions = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onDiv: {
        elementId: "repulse-div",
        enable: false,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "connect",
        parallax: {
          enable: false,
          force: 60,
          smooth: 20,
        },
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 1,
        size: 40,
        speed: 1,
      },
      connect: {
        distance: 80,
        lineLinked: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        lineLinked: {
          opacity: 1,
        },
      },
      push: {
        quantity: 3,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#fc8803",
    },
    lineLinked: {
      blink: false,
      color: "#ffffff",
      consent: false,
      distance: 150,
      enable: false,
      opacity: 1,
      width: 1,
    },
    move: {
      attract: {
        enable: false,
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      bounce: false,
      direction: "none",
      enable: true,
      outMode: "out",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 600,
      },
      limit: 200,
      value: 50,
    },
    opacity: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 1,
        sync: false,
      },
      random: false,
      value: 0.7,
    },
    shape: {
      type: "circle",
    },
    size: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 20,
        sync: false,
      },
      random: true,
      value: 5,
    },
  },
  polygon: {
    draw: {
      enable: false,
      lineColor: "#ffffff",
      lineWidth: 0.5,
    },
    move: {
      radius: 10,
    },
    scale: 1,
    type: "none",
    url: "",
  },
  background: {
    color: "#ffffff",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};
export default particlesOptions;
