/* Evaluarium boundary line.
 *
 * The claims-and-limitations statement, kept as ONE string and mounted on
 * every results surface (explorer, compare, viewer). It exists because
 * compare and viewer links get forwarded on their own, and a curve with no
 * boundary next to it reads as a claim about real markets. One string, one
 * file, so the wording cannot drift between pages.
 *
 * Pages opt in with any element carrying a data-boundary attribute; the
 * script fills it once the DOM is parsed. This is a plain script, not a
 * module, so the line renders even when the page's run data fails to load.
 */
(function () {
  // Stated in the positive: where the findings hold, and what kind of claim
  // they are. The scope clause is the one the limits section uses.
  var TEXT =
    "These findings hold under the stylized simulation model presented here, " +
    "in settings where benchmark and leaderboard results steer what providers " +
    "build and what buyers, coverage, and capital reward, and where consumer " +
    "needs are heterogeneous. The direction and mechanism of an effect are the claim; " +
    "the numbers belong to this parameterization.";
  var SHORT = "Stylized simulation model";
  var LINK = { href: "simulation.html#limits", label: "See Claims and limitations for details →" };

  function mount(el) {
    if (el.dataset.boundaryMounted) return;
    el.dataset.boundaryMounted = "1";
    el.classList.add("rd-boundary");
    var s = document.createElement("span");
    s.textContent = TEXT;
    var a = document.createElement("a");
    a.href = LINK.href;
    a.textContent = LINK.label;
    el.appendChild(s);
    el.appendChild(a);
  }

  function mountAll() {
    document.querySelectorAll("[data-boundary]").forEach(mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll);
  } else {
    mountAll();
  }

  // SHORT is for captions drawn inside chart SVGs, where the full sentence
  // would not fit; it must travel with a screenshot of the panel.
  window.EvaluariumBoundary = { text: TEXT, short: SHORT, link: LINK };
})();
