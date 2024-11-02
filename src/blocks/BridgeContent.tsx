import { Box } from "@react-three/drei";
import { height as dominoHeight, width } from "./FollowDomino";

export function BridgeContent({ length }: Props) {
  const gap = length - stepDepth * 3 * 2 - 5 * 2;

  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        const stepHeight = bridgeHeight * ((index + 1) / 4);

        return (
          <Box
            key={index}
            args={[width, stepHeight, stepDepth]}
            position={[
              0,
              stepHeight / 2,
              -(gap / 2 + 5 + (3 - index - 0.5) * stepDepth),
            ]}
          >
            <meshPhongMaterial color={0xffafcc} flatShading={true} />
          </Box>
        );
      })}

      <Box
        args={[width, bridgeHeight, 5]}
        position={[0, bridgeHeight / 2, -(gap / 2 + 2.5)]}
      >
        <meshPhongMaterial color={0xffafcc} flatShading={true} />
      </Box>

      <Box args={[width, 5, gap]} position={[0, bridgeHeight - 2.5, 0]}>
        <meshPhongMaterial color={0xffafcc} flatShading={true} />
      </Box>

      <Box
        args={[width, bridgeHeight, 5]}
        position={[0, bridgeHeight / 2, gap / 2 + 2.5]}
      >
        <meshPhongMaterial color={0xffafcc} flatShading={true} />
      </Box>

      {Array.from({ length: 3 }).map((_, index) => {
        const stepHeight = bridgeHeight * ((index + 1) / 4);

        return (
          <Box
            key={index}
            args={[width, stepHeight, stepDepth]}
            position={[
              0,
              stepHeight / 2,
              gap / 2 + 5 + (3 - index - 0.5) * stepDepth,
            ]}
          >
            <meshPhongMaterial color={0xffafcc} flatShading={true} />
          </Box>
        );
      })}
    </>
  );
}

interface Props {
  length: number;
}

export const stepDepth = 10;
export const bridgeHeight = dominoHeight + 10;
