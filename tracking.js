/* Demo-Tracking für Consent-Demos: setzt bewusst nicht-essenzielle Cookies OHNE Einwilligung.
   Genau dieses Verhalten soll der Consent-Scanner finden und das Auto-Blocking spaeter unterbinden.
   Es werden keine Daten an Dritte gesendet - die Cookies imitieren nur gaengige Analytics-/
   Marketing-Signaturen (Namensschema wie _ga/_fbp), damit die Cookie-Klassifizierung anspringt. */
(function () {
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function rand() {
    return Math.random().toString(36).slice(2, 12);
  }

  /* "Analytics"-Cookies (nicht essenziell) */
  setCookie("_ga", "GA1.1." + rand() + "." + Date.now(), 365);
  setCookie("_gid", "GA1.1." + rand(), 1);
  setCookie("bw_analytics_id", rand(), 180);

  /* "Marketing"-Cookies (nicht essenziell) */
  setCookie("_fbp", "fb.1." + Date.now() + "." + rand(), 90);
  setCookie("bw_campaign", "spring-launch-26", 30);

  /* Essenziell: Session-Cookie (darf auch ohne Consent gesetzt werden) */
  if (!document.cookie.includes("bw_session=")) {
    document.cookie = "bw_session=" + rand() + ";path=/;SameSite=Lax";
  }

  /* Simuliertes Seitenaufruf-Tracking (nur Konsole, kein Versand) */
  if (window.console && console.debug) {
    console.debug("[gl-demo-tracking] pageview erfasst:", location.pathname);
  }
})();
