import {
  AxesHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BufferGeometry,
  Points,
  PointsMaterial,
  Float32BufferAttribute,
  MathUtils
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const scene = new Scene()
const count = 100
const distance = 2

scene.add(new AxesHelper())

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1_000
)

camera.position.z = 2
camera.position.y = .5
camera.position.x = .5

scene.add(camera)

const points = new Float32Array(count * 3)

for (let i = 0; i < points.length; i++) {
  points[i] = MathUtils.randFloatSpread(distance * 2)
}

const geometry = new BufferGeometry()

geometry.setAttribute('position', new Float32BufferAttribute(points, 3))

const pointMaterial = new PointsMaterial({
  color: 0xff0000,
  size: 0.1
})
const pointsObject = new Points(geometry, pointMaterial)

scene.add(pointsObject)

const renderer = new WebGLRenderer({
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

function tick() {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})