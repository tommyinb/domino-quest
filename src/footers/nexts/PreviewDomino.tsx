import { Box } from "@react-three/drei";

export function PreviewDomino() {
  return (
    <Box args={[15, 30, 10]} rotation={[0, Math.PI * 0.15, 0]}>
      <meshPhongMaterial color={0x3ebdb4} flatShading={true} />
    </Box>
  );
}
