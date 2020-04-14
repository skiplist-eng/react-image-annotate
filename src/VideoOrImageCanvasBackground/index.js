// @flow weak

import React, { useRef, useEffect, useMemo } from "react"
import { styled } from "@material-ui/core/styles"
import useEventCallback from "use-event-callback"

const Video = styled("video")({
  zIndex: 0,
  position: "absolute"
})

const StyledImage = styled("img")({
  zIndex: 0,
  position: "absolute"
})

export default ({
  imagePosition,
  mouseEvents,
  videoTime,
  videoSrc,
  imageSrc,
  onLoad,
  videoPlaying,
  onChangeVideoTime,
  onChangeVideoPlaying
}) => {
  const imageRef = useRef()

  const onImageLoaded = useEventCallback(event => {
    const imageElm = event.currentTarget
    if (onLoad)
      onLoad({
        naturalWidth: imageElm.naturalWidth,
        naturalHeight: imageElm.naturalHeight,
        imageElm
      })
  })

  const stylePosition = useMemo(() => {
    let width = imagePosition.bottomRight.x - imagePosition.topLeft.x
    let height = imagePosition.bottomRight.y - imagePosition.topLeft.y
    return {
      left: imagePosition.topLeft.x,
      top: imagePosition.topLeft.y,
      width: isNaN(width) ? 0 : width,
      height: isNaN(height) ? 0 : height
    }
  }, [
    imagePosition.topLeft.x,
    imagePosition.topLeft.y,
    imagePosition.bottomRight.x,
    imagePosition.bottomRight.y
  ])

  if (!videoSrc && !imageSrc) return "No imageSrc or videoSrc provided"

  return (
    <StyledImage
      {...mouseEvents}
      src={imageSrc}
      ref={imageRef}
      style={stylePosition}
      onLoad={onImageLoaded}
    />
  )
}
