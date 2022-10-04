import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import useStore from "../../store";
import { isPointInSquare } from "../../helper/math";
import { useEffect, useRef, useState } from "react";
import { productExperienceUrl } from "../../constants";

export const Model = ({
    url, scale, drawable,
    page, index: posIndex,
    small, meshPosition, meshSize,
    id, modelInfo, handleChange,
    getPosition, getUpdateId
}: any) => {

    const model = useLoader(GLTFLoader, url) as any

    const meshRef = useRef() as any

    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)   // x-y plane

    const dragInfo = useStore((state: any) => state.dragInfo)
    const setDragInfo = useStore((state: any) => state.setDragInfo)

    const currentPage = useStore((state: any) => state.currentPage)

    const focusInfo = useStore((state: any) => state.focusInfo)

    const [latestTap, setLatestTap] = useState(0)

    const getCurrentPosition = () => {
        const diffPageCount = page - currentPage

        const diffOffset = diffPageCount * 0.06 * 3

        const curPosition = [
            0.06 * (-1 + posIndex) + diffOffset,
            small ? -0.05 : 0,
            0
        ]

        return curPosition
    }

    const originPosition = getCurrentPosition()

    useEffect(() => {
        if (!page) return

        api.start({
            position: [
                ...getCurrentPosition()
            ]
        })
    }, [currentPage])

    useEffect(() => {
        if (getPosition.x || getPosition.y || getPosition.z) {
            api.start({
                position: [
                    getPosition.x,
                    getPosition.y,
                    getPosition.z,
                ],
            })
        }
    }, [getPosition])

    const [spring, api] = useSpring(() => ({
        position: originPosition,
        config: { friction: 20, duration: 100 }
    }));

    const bind = useGesture({
        onDrag: ({ active, timeStamp, event }: any) => {
            if (!drawable || focusInfo.isFocus) return

            event.stopPropagation()

            if (active && dragInfo.isDragging) {
                document.body.style.cursor = 'grabbing'

                let planeIntersectPoint = new THREE.Vector3()
                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const newPos = {
                    x: planeIntersectPoint.x,
                    y: planeIntersectPoint.y,
                    z: 0
                }

                handleChange({ id: id, position: newPos })

                api.start({
                    position: [
                        newPos.x,
                        newPos.y,
                        newPos.z,
                    ],
                })
            } else {
                document.body.style.cursor = 'grab'
            }

            setDragInfo({
                isDragging: active,
            })

            return timeStamp
        },
        onDragEnd: ({ event }: any) => {
            if (!drawable) return

            event.stopPropagation()

            let planeIntersectPoint = new THREE.Vector3()
            event.ray.intersectPlane(floorPlane, planeIntersectPoint)

            const newPos = {
                x: planeIntersectPoint.x,
                y: planeIntersectPoint.y,
                z: 0
            }


            const centerPos = {
                x: 0,
                y: 0.07
            }

            const len = 0.02

            if (isPointInSquare(newPos, centerPos, len)) {
                api.start({
                    position: [0, 0.05, 0],
                })
                handleChange({ id: id, position: { x: 0, y: 0.05, z: 0 } })
            } else {
                api.start({
                    position: [
                        ...originPosition
                    ],
                })
                handleChange({ id: id, position: { x: originPosition[0], y: originPosition[1], z: originPosition[2] } })
            }
        }
    })

    const onPointerOverHandler = (e: any) => {
        if (!drawable) return

        e.stopPropagation()
        document.body.style.cursor = 'grab'
    }

    const onPointerOutHandler = () => {
        if (!drawable) return

        document.body.style.cursor = ''
    }

    const focusObject = (event: any) => {
        event.stopPropagation()

        const now = new Date().getTime()
        const timeSince = now - latestTap
        if ((timeSince < 600) && (timeSince > 0)) {
            // double click action
            window.location.replace(`${productExperienceUrl}/${modelInfo.id}`)
        }

        setLatestTap(new Date().getTime())
    }
    // || focusInfo.focusId === (getUpdateId === 0 ? null : getUpdateId)
    return (
        currentPage === page && (!focusInfo.isFocus || focusInfo.focusId === id) ? (
            <animated.mesh
                {...spring}
                {...bind() as any}
                scale={scale}
                onPointerOver={onPointerOverHandler}
                onPointerOut={onPointerOutHandler}
                ref={meshRef}
                // rotation={[ 0, ang2Rad(90), 0 ]}
                onClick={modelInfo.feather ? focusObject : null}
            >
                <mesh position={meshPosition} onClick={focusObject}>
                    <boxGeometry args={meshSize} />
                    <meshBasicMaterial color={'red'} transparent opacity={0.0} />
                </mesh>
                <primitive object={model.scene} />
            </animated.mesh>
        ) : null
    )
}

export default Model