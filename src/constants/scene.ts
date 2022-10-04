import { ang2Rad } from "../helper/math"

export const cameraProps = {
    fov: 70,
    aspect: 16 / 9,
    near: 0.01,
    far: 1000,
    position: {
        x: 0,
        y: 0.08,
        z: 0.3,
    }
}

export const backgroundColor = 0xfcfcfc

export const orbitControlProps = {
    target: [0, 0.08, 0],
    minPolarAngle: ang2Rad(80),
    maxPolarAngle: ang2Rad(100),
    minAzimuthAngle: ang2Rad(-15),
    maxAzimuthAngle: ang2Rad(15),
    maxDistance: 0.3,
    minDistance: 0.12,
}

export const rendererProps = {
    color: 0xffffff
}

export const ambientLightProps = {
    color: 0xeeeeee
}

export const directionalLightProps = {
    color: 0xffffff,
    intensity: 1.5,
    position: {
        x: 0,
        y: 5,
        z: 10,
    }
}

export const spotLightProps = {
    color: 0xcccccc,
    intensity: 1,
    position: {
        x: -15,
        y: 0,
        z: 15,
    },
    castShadow: false,
    shadow: {
        bias: -0.0001,
        mapSize: {
            width: 1024 * 4,
            height: 1024 * 4,
        }
    }
}

export const spotLightProps2 = {
    color: 0xcccccc,
    intensity: 1,
    position: {
        x: 15,
        y: 0,
        z: -15,
    },
    castShadow: false,
    shadow: {
        bias: -0.0001,
        mapSize: {
            width: 1024 * 4,
            height: 1024 * 4,
        }
    }
}

export const modelScaleValue = 2