import styled from 'styled-components'
import { useDoubleTap } from 'use-double-tap'
import Scene from '../../components/Scene'
import { pendantShowCount, pendantsModelProps } from '../../constants'
import useStore from '../../store'
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import { useBatch, useHistory, useOthers, useMap, useMyPresence } from '../../liveblocks.config'
import { LiveObject } from "@liveblocks/client";
import { Shape } from 'three'
import Avatar from '../../components/Avatar/Avatar'
import { COLORS_PRESENCE } from '../../constants';

Modal.setAppElement('#root');

const CanvasWrapper = styled.div`
    // height: calc(90% - 40px);

    .sceneWrapper {
        width: 100%;
        height: 100%;
    }

    &.active {
        height: 60%;
        margin-bottom: 5vh;
        
        .sceneWrapper {
            width: 50%;
        }
    }
`

const Area = styled.div`
    position: absolute;
    // top: 0;
    // background-color: white;
    // width: 25vw;
    // height: 25vw;
    cursor: pointer;
    opacity: 1;
`

const PrevArea = styled(Area)`
    // display: block;
    // left: 0;
    // top:40%;

`

const NextArea = styled(Area)`
    // right: 0;
    // top:40%;
`

const LogoWrapper = styled.div`
    position: relative;
    max-height: 10%;
    padding: 5px 0;

    img {
        max-width: 80%;
        max-height: 100%;
    }
`

const ActionWrapper = styled.div`
    position: fixed;
    bottom: 1%;

    img {
        width: 50%;
    }
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '25%',
    },

}

const customStylescopy = {
    content: {
        padding: '10px',
        transform: ' translateX( -50%)',
        width: '80%',
        bottom: '20px',
        left: ' 50%',
        background: 'rgb(255, 255, 255)',
        borderRadius: '4px',
    },
}

export const Editor = ({ shareUrl }: any) => {
    const currentPage = useStore((state: any) => state.currentPage)
    const moveToNextPage = useStore((state: any) => state.moveToNextPage)
    const moveToPrevPage = useStore((state: any) => state.moveToPrevPage)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [copyModelOpen, setCopyModelOpen] = useState(false)

    const others = useOthers();

    const moveToPrev = useDoubleTap((event: any) => {
        if (currentPage > 1)
            moveToPrevPage()
    })

    const moveToNext = useDoubleTap((event: any) => {
        if (currentPage < Math.ceil(pendantsModelProps.length / pendantShowCount))
            moveToNextPage()
    })


    const handleModal = (active: any) => {
        setIsOpen(active);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopyModelOpen(true)
        setTimeout(() => {
            setCopyModelOpen(false)
            handleModal(false)
        }, 2000)
    }

    return (
        <div className='h-[100%]'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => handleModal(false)}
                // style={customStyles}
                className="md:w-1/2 w-9/12 h-[20%]  translate-x-1/2 translate-y-1/2 bg-white inset-auto 2xl:mt-[10%] lg:mt-[15%] md:mt-[20%] sm:mt-[15%] mt-[40%]  md:ml-[0px] ml-[-25%] mr-[50%] p-5"
                contentLabel="Example Modal"
            >
                <div className='flex flex-col h-full'>
                    <div className='flex'>
                        <div>Share</div>
                        <img onClick={() => handleModal(false)} src='assets/close.png' alt='close' className='w-6 ml-auto cursor-pointer'></img>
                    </div>
                    {/* <div className='flex h-full justify-center items-center'>Link Copied to clipboard</div> */}
                    <div className='flex h-full justify-center items-center'>
                        <div className='w-full [#f9f9f9] 2xl:h-[50px] md:h-[35px] h-[30px]  border-[1px] border-solid border-black p-[5px] items-center rounded-sm flex justify-between'>
                            <span className="text-sm truncate">{shareUrl}</span>
                            <div onClick={handleCopy} className='text-[#065fd4] text-sm cursor-pointer'>COPY</div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={copyModelOpen}
                style={customStylescopy}
                contentLabel="Example Modal"
                className='fixed'
            >
                <div className='flex flex-col'>
                    <div className='flex justify-center items-center'>Link Copied to clipboard</div>
                </div>
            </Modal>


            <div className='overflow-hidden w-full sm:h-full h-[95%] flex flex-col '>
                <LogoWrapper className='flex justify-center items-center h-[30%] mt-[10]'>
                    <img src={'/assets/BrandLogo_Template.png'} alt='pic'></img>
                </LogoWrapper>
                <div className='flex ml-1.5 sm:mt-[-2%] mt-[5%] mb-2 justify-end items-center'>
                    <div className='flex'>
                        {others.map(({ connectionId, presence }) => {
                            if (!connectionId) {
                                return null;
                            }

                            return (
                                <Avatar
                                    key={connectionId}
                                    color={COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]}
                                />
                            );
                        })}
                    </div>
                    <div className='mx-2'>
                        <div className="who_is_here"> {others.length} Live </div>
                    </div>
                </div>

                <CanvasWrapper
                    className={`w-full h-full relative flex justify-center items-center `}
                >
                    <div
                        className={`sceneWrapper`}
                    >
                        <Scene />
                    </div>
                </CanvasWrapper>

                {shareUrl &&
                    <ActionWrapper className={`right-2 md:right-4 lg:right-4 w-[46%]  sm:w-[8%] md:w-[7%] `}>
                        <button onClick={() => handleModal(true)} className='flex flex-col justify-center items-center text-sm text-xs font-bold'>
                            <img src='/assets/ShareIcon.png' alt='pic' className={'sm:w-[50%] w-45%'}></img>
                            Share
                        </button>
                    </ActionWrapper>

                }
                <>
                    <div className={`top-0 w-11/12 h-11/12`}>
                        <PrevArea
                            className={`block left-0 xl:w-80 xl:h-80 lg:w-80 lg:h-72 md:w-56 md:h-56  sm:w-44 sm:h-44 top-[70%] xl:top-[40%] md:top-[50%] w-24 h-24  `}
                            {...moveToPrev} />
                        <NextArea
                            className={`right-0 top-[70%] xl:top-[40%] md:top-[50%] xl:w-80 xl:h-80 lg:w-80 lg:h-72 2 md:w-56 md:h-56 sm:w-44 sm:h-44 w-24 h-24 `}
                            {...moveToNext} />
                    </div>


                </>
            </div>
        </div>
    )
}

export default Editor