export function Lighting() {
  return (
    <>
      <ambientLight color={0xdc8874} intensity={2} />

      <hemisphereLight color={0xaaaaaa} groundColor={0x000000} intensity={4} />

      <directionalLight
        color={0xffffff}
        position={[-150, 350, 350]}
        castShadow
        intensity={5}
      />
    </>
  );
}
