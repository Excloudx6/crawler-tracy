const driver = (() => {
  const c = [];
  const strategies = {
    random: 1
  };
  const addClickables = clickables => {
    c.push.apply(c, clickables);
  };

  const randomStrategy = clickables =>
    clickables[Math.floor(Math.random() * clickables.length)];

  const pickStrategy = (strat = strategies.random) => {
    switch (strat) {
      case strategies.random:
        return randomStrategy;
      default:
        return randomStrategy;
    }
  };

  const clean = clickables =>
    [...new Set(clickables)]
      .filter(Boolean)
      .filter(cl =>
        window.document.body.contains(window.document.querySelector(cl))
      );

  let stop = () => console.log("no timer");
  const start = (strat = strategies.random, interval = 2000) => {
    const timer = setInterval(() => {
      if (c.length === 0) return;
      const randomNode = window.document.querySelector(
        pickStrategy(strat)(clean(c))
      );

      console.log(
        "[RANDOM NODE] selected this random node: ",
        randomNode,
        clean(c)
      );
      randomNode.style.border = "red solid";
      randomNode.click();
    }, interval);
    stop = () => clearInterval(timer);
  };

  const listenForPageClickables = () => {
    window.addEventListener("message", e => {
      if (!e.data) {
        return;
      }
      try {
        const c = JSON.parse(e.data);
        if (!c.clickables) {
          return;
        }
        addClickables(c.clickables);
      } catch (e) {
        return;
      }
    });
  };
  start(strategies.random, 500);
  listenForPageClickables();
  return {
    addClickables: addClickables,
    start: start,
    stop: stop
  };
})();
