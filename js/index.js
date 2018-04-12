import 'normalize.css'
import '../styles/index.scss'
import 'particles.js'
import 'Chart.js'
import app from './app.js'

particlesJS.load('particles-js', 'particles.json', function () {
  console.log('particles.js config loaded')
});

app.init();
