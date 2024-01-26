import '../styles/styles.css'
import 'lazysizes'

import SVG from './modules/SVG'
import SVGm from './modules/SVGm'
import Animation from './modules/Animation'

new SVG()
new SVGm()
new Animation()
if (module.hot) {
	module.hot.accept()
}
