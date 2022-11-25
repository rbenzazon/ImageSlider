(function () {
  const c = document.createElement("link").relList;
  if (c && c.supports && c.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) d(t);
  new MutationObserver((t) => {
    for (const r of t)
      if (r.type === "childList")
        for (const i of r.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && d(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(t) {
    const r = {};
    return (
      t.integrity && (r.integrity = t.integrity),
      t.referrerpolicy && (r.referrerPolicy = t.referrerpolicy),
      t.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : t.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function d(t) {
    if (t.ep) return;
    t.ep = !0;
    const r = e(t);
    fetch(t.href, r);
  }
})();
const X = (n, c, e, d) => (
  (n /= d / 2),
  n < 1 ? (e / 2) * n * n + c : (n--, (-e / 2) * (n * (n - 2) - 1) + c)
);
async function z(n, c) {
  if (!n) return () => console.log("no element");
  let e,
    d,
    t = n.clientWidth,
    r = n.clientHeight,
    i = 0,
    h = !1,
    y = 0,
    f = 0,
    E = 0,
    s = 0,
    M = 0,
    b = 0;
  const D = () => {
      (e = document.createElement("canvas")),
        (e.id = "slider-canvas"),
        (e.width = t),
        (e.height = r),
        e.addEventListener("mousedown", N),
        e.addEventListener("mouseleave", v),
        e.addEventListener("mouseup", v),
        n == null || n.appendChild(e);
      const o = e.getContext("2d");
      if (!o) throw new Error("No context");
      d = o;
    },
    O = async () =>
      (
        await Promise.allSettled(
          Array.from({ length: w }, (o, l) => {
            const a = new Image();
            return new Promise((u, L) => {
              (a.src = P(l + 1)),
                (a.onload = () => u(a)),
                (a.onerror = () => L(new Error("Image not loaded")));
            });
          })
        )
      )
        .filter(({ status: o }) => o === "fulfilled")
        .map((o) => o.value),
    m = (o, l) => {
      const a = p[o],
        u = Math.min(t / a.width, r / a.height),
        L = l + (t - a.width * u) / 2,
        S = (r - a.height * u) / 2;
      d.drawImage(a, 0, 0, a.width, a.height, L, S, a.width * u, a.height * u);
    },
    g = () => {
      A(),
        i > 0 && m(i - 1, s - t),
        m(i, s),
        i < p.length - 1 && m(i + 1, s + t);
    },
    q = () => {
      (M = s), (b = t * -1 * f - s), (y = Date.now()), requestAnimationFrame(I);
    },
    I = () => {
      const l = Date.now() - y;
      (s = X(l, M, b, 300)),
        g(),
        l < 300
          ? requestAnimationFrame(I)
          : ((i = (i + f + w) % w), (s = 0), g());
    },
    N = (o) => {
      h ||
        ((h = !0),
        (E = o.pageX),
        e.addEventListener("mousemove", x),
        n.classList.add("grabbing"));
    },
    x = (o) => {
      !h ||
        (o.preventDefault(),
        (s = o.pageX - E),
        (f = (s / Math.abs(s)) * -1),
        ((i === 0 && f === -1) || (i === p.length - 1 && f === 1)) && (s = 0),
        g());
    },
    v = () => {
      if (!!h) {
        if (((h = !1), Math.abs(s) < 10)) {
          (s = 0), g();
          return;
        }
        q(),
          e.removeEventListener("mousemove", x),
          n.classList.remove("grabbing");
      }
    },
    C = () => {
      (t = e.width = n.clientWidth), (r = e.height = n.clientHeight), g();
    },
    A = () => {
      d.clearRect(0, 0, e.width, e.height);
    };
  function F() {
    e.removeEventListener("mousedown", N),
      e.removeEventListener("mouseleave", v),
      e.removeEventListener("mouseup", v),
      window.removeEventListener("resize", C);
  }
  const { imageNb: w, imageUrl: P } = c;
  D();
  const p = await O();
  return m(i, 0), window.addEventListener("resize", C), F;
}
z(document.querySelector("#app"), {
  imageNb: 5,
  imageUrl: (n) => {
    const c = 1600 + Math.round(Math.random() * 500 - 250),
      e = 1100 + Math.round(Math.random() * 500 - 250);
    return `https://picsum.photos/id/${n}/${c}/${e}`;
  },
});
