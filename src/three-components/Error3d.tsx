import { Text } from "@react-three/drei"
import type { CadComponent } from "circuit-json"

export const Error3d = ({
  error,
  cad_component,
}: { error: any; cad_component?: CadComponent }) => {
  let position = [0, 0, 0]
  if (cad_component?.position) {
    position = [
      cad_component.position.x,
      cad_component.position.y,
      cad_component.position.z,
    ]
    // make sure the position doesn't have any NaN values
    position = position.map((p) => (Number.isNaN(p) ? 0 : p))
  }
  return (
    <group
      // @ts-expect-error
      position={position}
    >
      <mesh
        renderOrder={-99999}
        rotation={[Math.PI / 4, Math.PI / 4, 0]}
        ref={(mesh) => {
          if (mesh) {
            mesh.renderOrder = 999999
          }
        }}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          depthTest={false}
          transparent
          color="red"
          opacity={0.5}
        />
      </mesh>
      <Text
        scale={[0.1, 0.1, 0.1]}
        color="red" // default
        anchorX="center" // default
        anchorY="middle" // default
        depthOffset={-99999}
      >
        {error.toString().slice(0, 50)}...
      </Text>
    </group>
  ) as any
}
