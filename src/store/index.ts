import create from "zustand"
import produce from "immer"
import { cameraProps } from "../constants/scene"

const useStore = create((set) => ({
	dragInfo: {
		isDragging: false,
		type: null
	},
	setDragInfo: (payload: any) => set(produce((state: any) => {
		state.dragInfo = payload
	})),

	currentPage: 1,
	setCurrentPage: (payload: any) => set(produce((state: any) => {
		state.currentPage = payload.page
	})),
	moveToNextPage: () => set(produce((state: any) => {
		state.currentPage += 1
	})),
	moveToPrevPage: () => set(produce((state: any) => {
		state.currentPage -= 1
	})),

	focusInfo: {
		isFocus: false,
		position: [0, 0, 0],
		prevCamPosition: [cameraProps.position.x, cameraProps.position.y, cameraProps.position.z],
		focusId: -1,
	},
	setFocusInfo: (payload: any) => set(produce((state: any) => {
		state.focusInfo = payload
	}))
}))

export default useStore
