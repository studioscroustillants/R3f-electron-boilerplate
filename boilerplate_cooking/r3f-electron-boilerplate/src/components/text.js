import React, { useState, useMemo } from 'react'
import * as THREE from 'three'
import UnknownFont from '../../assets/Fonts/unknown'

const Text=({ children, size = 1.5, letterSpacing = 0, color = '#000000' }) => {
  const [font] = useState(() => new THREE.FontLoader().parse(UnknownFont))
  const [shapes, [x, y]] = useMemo(() => {
    let x = 0,
      y = 0
    let letters = [...children]
    let mat = new THREE.MeshBasicMaterial({ color, opacity: 1, transparent: true })
	// console.log(children);
    return [
      letters.map((letter, i) => {
        // generateShapes can in theory generate a string of letters in one go,
        // but it looks ugly due to wide letter spacing
        const geom = new THREE.ShapeGeometry(font.generateShapes(letter, size, 1))
        geom.computeBoundingBox()
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.x = x
        x += geom.boundingBox.max.x + letterSpacing
        y = Math.max(y, geom.boundingBox.max.y)
        return mesh
      }),
      [x, y]
    ]
  }, [children, color, font, letterSpacing, size])
  return (
    <group position={[-x / 2, 1/* -y / 2 */, 0]}>
      {shapes.map(shape => (
        <primitive key={shape.uuid} object={shape} />
      ))}
    </group>
  )
}

export default Text;