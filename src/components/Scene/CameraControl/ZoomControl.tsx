import * as THREE from 'three'
import CameraControls from 'camera-controls'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import useStore from '../../../store'
import { cameraProps, orbitControlProps } from '../../../constants/scene'

CameraControls.install({ THREE })

export const ZoomControl = ({ pos = new THREE.Vector3(), look = new THREE.Vector3() }: any) => {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])

    const focusInfo = useStore((state: any) => state.focusInfo)

    const [enable, setEnable] = useState(false)

    const [timeOutObject, setTimeOutObject] = useState() as any

    useEffect(() => {
        setEnable(true)

        clearTimeout( timeOutObject )
        const timeOut = setTimeout(() => {
            setEnable(false)
        }, 2000)

        setTimeOutObject( timeOut )
    }, [focusInfo])

    return useFrame((state: any, delta: any) => {
        if( !enable ) return

        focusInfo.isFocus ? pos.set(focusInfo.position[0], focusInfo.position[1], focusInfo.position[2] + 0.12) : pos.set(cameraProps.position.x, cameraProps.position.y, cameraProps.position.z)

        focusInfo.isFocus ? look.set(focusInfo.position[0], focusInfo.position[1], focusInfo.position[2]) : look.set(orbitControlProps.target[0], orbitControlProps.target[1], orbitControlProps.target[2])

        state.camera.position.lerp(pos, 1)
        state.camera.updateProjectionMatrix()

        controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)

        return controls.update(delta)
    })
}