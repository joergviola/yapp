import Vue from 'vue'


Vue.filter('duration', duration => {
  if (duration==0) return false
  let m = Math.round(duration/60)
  let h = Math.round(m/60)
  m = m % 60;
  return f(h) + ":" + f(m)

  function f(t) {
    return (t<10 ? "0" : "") + t
  }

})