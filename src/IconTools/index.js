// @flow

import React, { useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowsAlt,
  faMousePointer,
  faExpandArrowsAlt,
  faTag,
  faPaintBrush,
  faDrawPolygon,
  faVectorSquare,
  faHandPaper,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import SmallToolButton, { SelectedTool } from "../SmallToolButton"
import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  iconTools: {
    display: "flex",
    padding: 4,
    flexDirection: "column",
    zIndex: 9,
    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
    borderRight: `1px solid ${grey[300]}`,
    backgroundColor: grey[100]
  }
})

type Props = {
  showTags?: boolean,
  enabledTools?: Array<string>,
  selectedTool: string,
  onClickTool: string => any
}

const defaultTools = ["select", "create-point", "create-box", "create-polygon"]

export const IconTools = ({
  showTags,
  selectedTool,
  onClickTool,
  enabledTools = defaultTools
}: Props) => {
  const classes = useStyles()
  const selectedToolContextValue = useMemo(
    () => ({ enabledTools, selectedTool, onClickTool }),
    [enabledTools, selectedTool]
  )
  return (
    <div className={classes.iconTools}>
      <SelectedTool.Provider value={selectedToolContextValue}>
        <SmallToolButton
          id="select"
          name="Select Region"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faMousePointer} />}
        />
        <SmallToolButton
          alwaysShowing
          id="pan"
          name="Drag/Pan"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faHandPaper} />}
        />
        <SmallToolButton
          alwaysShowing
          id="zoom"
          name="Zoom In/Out"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faSearch} />}
        />
        {/* <SmallToolButton
          name="Move Region"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faArrowsAlt} />}
        />
        <SmallToolButton
          name="Resize Region"
          icon={
            <FontAwesomeIcon size="xs" fixedWidth icon={faExpandArrowsAlt} />
          }
        /> */}
        <SmallToolButton
          alwaysShowing
          togglable
          id="show-tags"
          selected={showTags}
          name="Show Tags"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faTag} />}
        />
        <SmallToolButton
          id="create-box"
          name="Add Bounding Box"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faVectorSquare} />}
        />
        <SmallToolButton
          id="create-polygon"
          name="Add Polygon"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faDrawPolygon} />}
        />
        {/* <SmallToolButton
          id="create-pixel"
          name="Add Pixel Region"
          icon={<FontAwesomeIcon size="xs" fixedWidth icon={faPaintBrush} />}
        /> */}
      </SelectedTool.Provider>
    </div>
  )
}

export default IconTools
