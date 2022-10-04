import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

export const ChainModel = ({ url, position, scale, }: any) => {
    const model = useLoader(GLTFLoader, url) as any

    return (
        <mesh
            position={position}
            scale={scale}
        >
            <primitive object={model.scene} />
        </mesh>
    )
}

export default ChainModel